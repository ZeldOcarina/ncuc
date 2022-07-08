import { PhoneNumberUtil } from "google-libphonenumber";
import axios from "axios";

export default class FormHandler {
    constructor({ formData, isContactForm }) {
        this.isContactForm = isContactForm;
        this.formData = formData;
        this.errors = {};
    }

    validateForm() {
        // CHECK THERE IS NO MISSING REQUIRED INPUTS
        if (!this.formData.first_name.value) this.errors = { ...this.errors, first_name: "First name is required" };
        if (!this.formData.last_name.value) this.errors = { ...this.errors, last_name: "Last name is required" };
        if (!this.formData.email.value) this.errors = { ...this.errors, email: "Email is required" };
        if (!this.formData.phone_number.value) this.errors = { ...this.errors, phone_number: "Phone number is required" };
        if (!this.formData.visit_type.value) this.errors = { ...this.errors, visit_type: "Please let us know the kind of visit you'd like to get." };
        if (!this.formData.service.value) this.errors = { ...this.errors, service: "Please select what service you are interested in." };

        // CHECK EMAIL IS VALID
        if (this.formData.email.value && !this.validateEmail(this.formData.email.value)) this.errors = { ...this.errors, email: "Please enter a valid email" };

        // CHECK PHONE IS VALID
        if (this.formData.phone_number.value && !this.validatePhone(this.formData.phone_number)) this.errors = { ...this.errors, phone_number: "Please enter a valid phone number" };

        return this.errors;
    }

    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    validatePhone(phone) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedPhoneNumber = phoneUtil.parse(phone.value, phone.country_code ? phone.country_code.toUpperCase() : "US");
        const isPhoneValid = phoneUtil.isValidNumber(parsedPhoneNumber);

        return isPhoneValid;
    }

    async submitForm(data) {
        const webhookData = {};

        for (const [key, value] of Object.entries(data)) {
            webhookData[key] = value.value;
        }

        const response = await axios.post("http://localhost:3000/api/submit-form", webhookData);

        if (response.status === 201) return true;
        throw new Error("Form Submission Failed");
    }
}