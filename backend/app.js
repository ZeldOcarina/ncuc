require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Lead = require("./models/lead");
const { sendEmail } = require("./config/emailConfig");
const leadHtml = require("./views/leadEmail");

const app = express();

app.use(cors({
    origin: "http://localhost:8000"
}))

app.use(express.json());

app.post("/api/submit-form", async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        console.log(lead);

        await sendEmail({
            to: "mattia@monarchy.io",
            subject: "We have a new contact request from the website!",
            text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
            html: leadHtml(lead)
        })

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

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})