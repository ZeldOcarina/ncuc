import type ILead from "../models/lead-interface";
import type State from "../../types/states.t";

import type { AxiosInstance } from "axios";

const axios = require("axios") as AxiosInstance;

const API_ROOT = "https://api.aktify.io/api/v1";

export interface AktifyLead {
  phoneNumber: string;
  region: State;
  email: string;
  externalCreated: string;
  externalLeadId: string;
  firstName: string;
  lastName: string;
  source: string;
}

class AktifyConnector {
  lead: ILead;
  parsedLead: AktifyLead;
  createdLeadInAktify: AktifyLead;

  constructor(lead: ILead) {
    this.lead = lead;
    this.parsedLead = this.parseLeadForAktify();
  }

  parsePhoneNumber(phoneNumber: string): string {
    if (this.lead.phone_number.startsWith("+1")) return this.lead.phone_number;
    if (this.lead.phone_number.startsWith("("))
      return "+1" + phoneNumber.replace(/\D/g, "");
    return "+" + this.lead.phone_number;
  }

  parseLeadForAktify() {
    const parsedLead: AktifyLead = {
      phoneNumber: this.parsePhoneNumber(this.lead.phone_number),
      region: "TX" as State,
      email: this.lead.email,
      externalCreated: new Date().toISOString(),
      externalLeadId: this.lead._id,
      firstName: this.lead.first_name,
      lastName: this.lead.last_name,
      source: "Website",
    };
    return parsedLead;
  }

  async createNewLead(): Promise<AktifyLead> {
    if (!process.env.AKTIFY_API_KEY)
      throw new Error("No API key found for Aktify");
    //console.log(this.parsedLead);
    console.log(process.env.AKTIFY_API_KEY.trim());
    const createdAktifyLead = await axios.post(
      API_ROOT + "/leads",
      this.parsedLead,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.AKTIFY_API_KEY.trim(),
        },
      }
    );
    console.log("createdAktifyLead:");
    console.log(createdAktifyLead.data);
    return createdAktifyLead.data;
  }
}

export default AktifyConnector;
