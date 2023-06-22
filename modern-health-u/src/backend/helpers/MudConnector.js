const googleLibPhoneNumber = require('google-libphonenumber');
const axios = require("axios");
const url = require('url');

/* *************
* MudConnector *
* **************/

class MudConnector {
    constructor({ handshakeKey, clientId, clientName, CampaignID, lead }) {
        this.endpointUrl = " https://agent.dentalgameplan.com/marketing/marketingtracking";
        this.HandshakeKey = handshakeKey;
        this.clientId = clientId;
        this.client_name = clientName;
        this.CampaignID = CampaignID;
        this.lead = lead;
        this.formatPhoneNumber();
        this.createRequest();
    }

    formatPhoneNumber() {
        const phoneUtil = googleLibPhoneNumber.PhoneNumberUtil.getInstance();
        const number = phoneUtil.parse(this.lead.phone_number, 'US');
        // parse the number 18285687485 as a US number and return the number like 8285687485
        this.lead.phone_number = phoneUtil.format(number, googleLibPhoneNumber.PhoneNumberFormat.NATIONAL).replace(/[^0-9]/g, '');
    }

    createRequest() {
        this.params = {
            formdata: 1,
            HandshakeKey: this.HandshakeKey,
            ClientID: this.clientId,
            CampaignID: this.CampaignID,
            client_name: this.client_name,
            First_Name: `${this.lead.first_name} ${this.lead.last_name}`,
            Email: this.lead.email,
            Phone_Number: this.lead.phone_number,
            checkReceiveOffer: this.lead.checkReceiveOffer ? "Yes" : "No",
            dr_notes: this.lead.surveyAnswers || this.lead.message || ""
        };
    }

    async connectLeadWithMud() {
        console.log(this.params)
        const axiosInstance = axios({
            url: this.endpointUrl,
            method: "POST",
            data: this.params,
            headers: { 'Content-Type': 'application/json' },
        });

        return axiosInstance;
    }
}

module.exports = MudConnector
