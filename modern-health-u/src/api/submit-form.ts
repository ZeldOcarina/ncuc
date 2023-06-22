import type { AktifyLead } from "../backend/helpers/AktifyConnector";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Mongoose } from "mongoose";
import ILead from "../backend/models/lead-interface";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mongoose = require("mongoose") as Mongoose;

const { connect } = require("../backend/helpers/mongo-connect");

const axios = require("axios").default;

const Lead = require("../backend/models/lead");
const { sendEmail } = require("../backend/config/emailConfig");
const leadHtml = require(`../backend/views/leadEmail`);

const SalesJetConnector = require("../backend/helpers/SalesJetConnector");
const MudConnector = require("../backend/helpers/MudConnector");

const submitForm = async (req: VercelRequest, res: VercelResponse) => {
  try {
    let messages;
    let isDuplicatedAktifyLead = false;

    await connect();

    // Create lead and save it in the database
    const lead: ILead = await Lead.create(req.body);

    console.log(lead);
    if (!lead) throw new Error("No lead has been created");

    // Check if the email is a mailnator.com address
    const isMailnatorEmail = lead.email.endsWith("mailinator.com");
    if (isMailnatorEmail)
      console.log(
        "Mailnator email detected. Skipping sending email and connecting with MUD."
      );

    const servicePromises: Promise<any>[] = [];

    if (!isMailnatorEmail) {
      // // Send notification on the new lead to the sales team
      const sendEmailPromise = sendEmail({
        to: process.env.FRONT_OFFICE_EMAIL,
        cc: process.env.MONARCHY_RECIPIENT_EMAIL,
        subject: "We have a new appointment request from the website!",
        text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
        html: leadHtml({
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone_number: lead.phone_number,
          service: lead.service,
          message: lead.message,
          offer: false,
          business_name: process.env.BUSINESS_NAME,
        }),
      });
      servicePromises.push(sendEmailPromise);
    }

    // Connect lead with Sales Jet for marketing purposes and with Aktify
    let newAktifyLead: AktifyLead | Error;
    let isInAktify = false;

    const aktifyConnectorImport = await import(
      "../backend/helpers/AktifyConnector"
    );
    const AktifyConnector = aktifyConnectorImport.default;

    const aktifyConnector = new AktifyConnector(lead);

    try {
      newAktifyLead = await aktifyConnector.createNewLead();
      isInAktify = true;
    } catch (err) {
      if (err.response.data.status_code === 409) {
        isDuplicatedAktifyLead = true;
        console.warn(err.response.data.message);
      } else {
        console.error("AKTIFY ERROR");
        console.log(err);
        console.error(err.response.data.message);
      }
      newAktifyLead = new Error(err.response.data.message);
      messages = !messages
        ? err.response.data.message
        : messages + ", " + err.response.data.message;
      isInAktify = false;
    }

    console.log(newAktifyLead);

    const parsedLeadForSalesJet = {
      email: lead.email,
      first_name: lead.first_name,
      last_name: lead.last_name,
      phone_number: lead.phone_number,
      message: lead.message,
      form_conversion: lead.form_conversion,
      current_page: lead.current_page,
      utm_campaign: lead.utm_campaign,
      utm_content: lead.utm_content,
      utm_id: lead.utm_id,
      utm_medium: lead.utm_medium,
      utm_source: lead.utm_source,
      utm_term: lead.utm_term,
      isInAktify: isInAktify,
      isDuplicatedAktifyLead: isDuplicatedAktifyLead,
      aktifyId: "",
    };

    if (!(newAktifyLead instanceof Error) && newAktifyLead.externalLeadId) {
      parsedLeadForSalesJet.aktifyId = newAktifyLead.externalLeadId;
    }

    console.log(parsedLeadForSalesJet);

    // Connect lead with Sales Jet for marketing purposes
    const salesJetConnector = new SalesJetConnector({
      salesJetApiKey: process.env.SALESJET_API_KEY,
      eventName: process.env.SALESJET_EVENT_NAME,
      lead: parsedLeadForSalesJet,
    });

    const salesJetConnectorPromise =
      salesJetConnector.connectLeadWithSalesJet();
    servicePromises.push(salesJetConnectorPromise);

    if (!process.env.MUD_CLIENT_ID) {
      throw new Error(
        "MUD_CLIENT_ID is not defined in the environment variables"
      );
    }

    if (!process.env.DEFAULT_MUD_CAMPAIGN_ID) {
      throw new Error(
        "DEFAULT_MUD_CAMPAIGN_ID is not defined in the environment variables"
      );
    }

    if (!isMailnatorEmail) {
      // Connect lead with the MUD system
      const mudConnector = new MudConnector({
        handshakeKey: process.env.MUD_HANDSHAKE_KEY,
        clientId: +process.env.MUD_CLIENT_ID,
        clientName: process.env.MUD_CLIENT_NAME,
        CampaignID:
          lead?.mud_campaign_id || +process.env.DEFAULT_MUD_CAMPAIGN_ID,
        lead: lead,
      });

      const mudConnectorPromise = mudConnector.connectLeadWithMud();
      servicePromises.push(mudConnectorPromise);
    }

    // console.log({ "req.body": req.body });

    if (
      process.env.CUSTOM_BOTTOM_FORM_ENDPOINT &&
      process.env.CUSTOM_BOTTOM_FORM_ENDPOINT !== "undefined"
    ) {
      const connectWithZapier = axios.post(
        process.env.CUSTOM_BOTTOM_FORM_ENDPOINT,
        { ...lead, current_page: req.body.current_page }
      );
      servicePromises.push(connectWithZapier);
    }

    try {
      //await Promise.all(servicePromises);
      const responses = await Promise.all(servicePromises);
      // console.log(responses);
      // console.log("Email sent successfully");
      console.log("Lead connected with Sales Jet successfully");
      console.log("Lead connected with Mud successfully");
      if (process.env.CUSTOM_BOTTOM_FORM_ENDPOINT) {
        console.log("Lead connected with custom endpoint");
      }
      // Send successful response
      return res.status(201).send("Lead Successfully Created");
    } catch (err) {
      // Send Email to admin if unknown error occurs
      await sendEmail({
        to: "mattia@monarchy.io",
        subject: `One of the services for ${process.env.BUSINESS_NAME} failed`,
        text: `One of the services for ${
          process.env.BUSINESS_NAME
        } failed.\n\n${JSON.stringify(err)}`,
      });
      console.error(err);
      return res.status(201).send("Lead Successfully Created");
    } finally {
      // Close the connection
      await mongoose.disconnect();
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

export default submitForm;
