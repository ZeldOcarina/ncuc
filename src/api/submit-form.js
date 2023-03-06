
const Lead = require("../backend/models/lead");
const { sendEmail } = require("../backend/config/emailConfig");

const SalesJetConnector = require("../backend/helpers/SalesJetConnector");
const { connect } = require("../backend/helpers/mongo-connect");

const leadHtml = require("../backend/views/leadEmail");

export default async function submitForm(req, res) {
    try {
        const connection = await connect();
        const lead = await Lead.create(req.body);

        const salesJetConnector = new SalesJetConnector({
            salesJetApiKey: process.env.SALESJET_API_KEY,
            eventName: "ncuc_form_submittion",
            lead
        });

        if (req.body.salesJetOnly) {
            await salesJetConnector.connectLeadWithSalesJet();
            return res.status(201).send("Lead Successfully Created");
        }

        const isFluVaccine = req.body.service === "Flu Vaccine";

        const promises = [];

        promises.push(sendEmail({
            to: isFluVaccine ? "vaccineclinics@orangecountycovidclinic.com" : "frontdesk@newportbeachuc.com",
            //to: isFluVaccine ? "mattia@adyproduction.com" : "frontdesk@newportbeachuc.com",
            subject: isFluVaccine ? "We have a new flu vaccine inquiry!" : "We have a new contact request from the website!",
            text: isFluVaccine ? `Flu vaccine request incoming.\n\n${JSON.stringify(req.body)}` : `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
            html: leadHtml(lead, isFluVaccine)
        }));

        promises.push(salesJetConnector.connectLeadWithSalesJet());

        // await Promise.all(promises);

        res.status(201).send("Lead Successfully Created");
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
        return;
        await sendEmail({
            to: "mattia@monarchy.io",
            //to: isFluVaccine ? "mattia@adyproduction.com" : "frontdesk@newportbeachuc.com",
            subject: "A service for NCUC is down!",
            text: JSON.stringify(err)
        })
        console.error(err);
        res.status(400).send(err.message);
    }
}

