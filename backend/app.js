require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Lead = require("./models/lead");
const { sendEmail } = require("./config/emailConfig");
const leadHtml = require("./views/leadEmail");

const SalesJetConnector = require("./helpers/SalesJetConnector");

const app = express();

app.use(cors({
    origin: "http://localhost:8000"
}))

app.use(express.json());

app.post("/api/submit-form", async (req, res) => {
    try {
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
            //to: isFluVaccine ? "vaccineclinics@orangecountycovidclinic.com" : "frontdesk@newportbeachuc.com",
            to: isFluVaccine ? "mattia@adyproduction.com" : "frontdesk@newportbeachuc.com",
            cc: "mattia@monarchy.io",
            subject: isFluVaccine ? "We have a new flu vaccine inquiry!" : "We have a new contact request from the website!",
            text: isFluVaccine ? `Flu vaccine request incoming.\n\n${JSON.stringify(req.body)}` : `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
            html: leadHtml(lead, isFluVaccine)
        }));

        promises.push(salesJetConnector.connectLeadWithSalesJet());

        // await Promise.all(promises);

        res.status(201).send("Lead Successfully Created");
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@adyproduction.5cosb.mongodb.net/ncuc-db?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("DB Connection successful");
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });

app.listen(3001, () => {
    console.log("Server listening on port 3001");
})