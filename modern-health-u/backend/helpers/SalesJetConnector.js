const axios = require("axios");

class SalesJetConnector {
    constructor({ salesJetApiKey, eventName, lead }) {
        this.endpointUrl = "https://sj-api.com/externalapp/track";
        this.salesJetApiKey = salesJetApiKey;
        this.eventName = eventName;
        this.lead = lead;
        this.createWebhook();
    }

    createWebhook() {
        this.webhookData = {
            event_name: this.eventName, // YOUR EVENT NAME GOES HERE,
            contact: {
                email: this.lead.email,
                first_name: this.lead.first_name,
                last_name: this.lead.last_name,
                phone_number: this.lead.phone_number,
                custom_attributes: {
                    "ca98d0cd-cc17-ed11-a9ab-ff1d79b08822": this.lead.visit_type,
                    "0794acd8-cc17-ed11-a9ab-ff1d79b08822": this.lead.service,
                    "e24a47e4-cc17-ed11-a9ab-ff1d79b08822": this.lead.message,
                    "57feee61-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_campaign,
                    "00b27a6e-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_content,
                    "924aff67-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_id,
                    "58feee61-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_medium,
                    "01b27a6e-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_source,
                    "b75cf17c-d017-ed11-a9ab-ff1d79b08822": this.lead.utm_term,
                    "935f965d-b219-ed11-a9ab-ff1d79b08822": this.lead.preferred_appointment_date ? this.lead.preferred_appointment_date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""
                }
            }
        };
    }

    async connectLeadWithSalesJet() {
        const axiosPromise = axios({
            url: this.endpointUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: this.salesJetApiKey,
            },
            method: "POST",
            data: this.webhookData,
        });

        return axiosPromise;
    }
}

module.exports = SalesJetConnector