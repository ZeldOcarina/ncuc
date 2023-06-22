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
                    "aa8201b1-0413-ed11-a9ab-ff1d79b08822": this.lead.dental_offer,
                    "667062e7-5871-ed11-a9ab-ff1d79b08822": this.lead.message,
                    "3c44feb9-0413-ed11-a9ab-ff1d79b08822": this.lead.service,
                    "b92a5371-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_campaign,
                    "654c717a-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_content,
                    "664c717a-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_id,
                    "55e85769-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_medium,
                    "53e85769-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_source,
                    "ba2a5371-8916-ed11-a9ab-ff1d79b08822": this.lead.utm_term,
                    "isInAktify": this.lead.isInAktify,
                    "isDuplicatedAktifyLead": this.lead.isDuplicatedAktifyLead,
                    "aktifyId": this.lead.aktifyId,
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