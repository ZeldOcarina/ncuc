import type { AktifyLead } from "../backend/helpers/AktifyConnector";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import ILead from "../backend/models/lead-interface";

require("dotenv").config();

const Lead = require("../backend/models/lead");
const { sendEmail } = require("../backend/config/emailConfig");
const leadHtml = require(`../backend/views/leadEmail.js`);

const { connect } = require("../backend/helpers/mongo-connect");

const SalesJetConnector = require("../backend/helpers/SalesJetConnector");
const MudConnector = require("../backend/helpers/MudConnector");

const dentalOfferHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    let messages;
    let isDuplicatedAktifyLead = false;

    await connect();

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
      // Send notification on the new lead to the sales team
      const sendEmailPromise = sendEmail({
        to: process.env.FRONT_OFFICE_EMAIL,
        cc: process.env.MONARCHY_RECIPIENT_EMAIL,
        subject: "We have a new dental offer request from the website!",
        text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
        html: leadHtml({
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone_number: lead.phone_number,
          service: lead.service,
          offer: true,
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
      dental_offer: lead.dental_offer,
      service: lead.service,
      isInAktify: isInAktify,
      isDuplicatedAktifyLead: isDuplicatedAktifyLead,
      aktifyId: "",
    };

    if (!(newAktifyLead instanceof Error) && newAktifyLead.externalLeadId) {
      parsedLeadForSalesJet.aktifyId = newAktifyLead.externalLeadId;
    }

    // // Connect lead with Sales Jet for marketing purposes
    const salesJetConnector = new SalesJetConnector({
      salesJetApiKey: process.env.SALESJET_API_KEY,
      eventName: "dental_offer",
      lead: parsedLeadForSalesJet,
    });

    const salesJetConnectorPromise =
      salesJetConnector.connectLeadWithSalesJet();
    servicePromises.push(salesJetConnectorPromise);

    // Connect lead with the MUD system
    if (process.env.MUD_CLIENT_ID && !isMailnatorEmail) {
      const mudConnector = new MudConnector({
        handshakeKey: process.env.MUD_HANDSHAKE_KEY,
        clientId: +process.env.MUD_CLIENT_ID,
        clientName: process.env.MUD_CLIENT_NAME,
        CampaignID: lead.mud_campaign_id,
        lead: lead,
      });
      const mudConnectorPromise = mudConnector.connectLeadWithMud();
      servicePromises.push(mudConnectorPromise);
    }

    try {
      await Promise.all(servicePromises);
      console.log("Email sent successfully");
      console.log("Lead connected with Sales Jet successfully");
      console.log("Lead connected with Mud successfully");
      console.log("Lead connected with Aktify successfully");
      // Send successful response
      return res.status(201).send("Lead Successfully Created");
    } catch (err) {
      // Send Email to admin if unknown error occurs
      await sendEmail({
        to: process.env.MONARCHY_RECIPIENT_EMAIL,
        subject: `One of the services for ${process.env.BUSINESS_NAME} failed`,
        text: `One of the services for ${
          process.env.BUSINESS_NAME
        } failed.\n\n${JSON.stringify(err)}`,
      });
      console.error(err);
      return res.status(201).send("Lead Successfully Created");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export default dentalOfferHandler;
