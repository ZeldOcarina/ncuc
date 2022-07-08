import React, { useState } from "react"
import { navigate } from "gatsby"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

import StyledForm from "./formStyles"

import FormHandler from "./FormHandler"
import PuffLoader from "react-spinners/PuffLoader"

const Form = ({ title, cta }) => {
  const initialState = {
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
    email: { value: "", error: "" },
    phone_number: { value: "", country_code: "", error: "" },
    visit_type: { value: "", error: "" },
    service: { value: "", error: "" },
    message: { value: "", error: "" },
    privacy_accepted: { value: false, error: "" },
  }

  const [isSubmittionFailed, setIsSubmittionFailed] = useState(false)
  const [submitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState(initialState)

  // useEffect(() => {
  //   console.log(formState)
  // }, [formState])

  function handleInputChange(e, type) {
    if (type) {
      return setFormState(formState => {
        return {
          ...formState,
          phone_number: {
            value: e,
            error: "",
            country_code: type.countryCode,
          },
        }
      })
    }

    const { name } = e.target
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value

    setFormState(formState => {
      return {
        ...formState,
        [name]: {
          value,
          error: "",
        },
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formHandler = new FormHandler({
      formData: formState,
      isContactForm: true,
    })
    const validationErrors = formHandler.validateForm()

    const validationErrorKeys = Object.keys(validationErrors)

    validationErrorKeys.forEach(key => {
      setFormState(formState => {
        return {
          ...formState,
          [key]: { ...formState[key], error: validationErrors[key] },
        }
      })
    })

    if (validationErrorKeys.length !== 0) return

    setLoading(true)

    try {
      await formHandler.submitForm(formState)

      setIsSubmitted(true)
      setIsSubmittionFailed(false)
      navigate("/thank-you")
    } catch (err) {
      console.log(err)
      setIsSubmittionFailed(true)
      setIsSubmitted(false)
    } finally {
      setLoading(false)
    }
  }

  const formTitle = function setTitleString() {
    if (submitted) return <h3 className="green">Form Submitted</h3>
    if (isSubmittionFailed)
      return <h3 className="red">Form Submittion Failed</h3>
    return <h3>{title}</h3>
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {formTitle()}
      <div className="name-container">
        <div className="input-container">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className={formState?.first_name?.error ? "error" : ""}
            onChange={handleInputChange}
            value={formState?.first_name?.value}
          />
          <span className="error-message">{formState?.first_name?.error}</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className={formState?.last_name?.error ? "error" : ""}
            onChange={handleInputChange}
            value={formState?.last_name?.value}
          />
          <span className="error-message">{formState?.last_name?.error}</span>
        </div>
      </div>
      <div className="input-container">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={formState?.email?.error ? "error" : ""}
          onChange={handleInputChange}
          value={formState?.email?.value}
        />
        <span className="error-message">{formState?.email?.error}</span>
      </div>
      <div className="input-container">
        <PhoneInput
          inputProps={{ name: "phone_number", placeholder: "Phone Number" }}
          country="us"
          id="phone_number"
          placeholder="Phone Number"
          containerClass="input"
          dropdownClass="tel-dropdown"
          onChange={handleInputChange}
          className={formState?.phone_number?.error ? "error" : ""}
        />
        {formState.phone_number.error && (
          <span className="error-message">
            {formState?.phone_number?.error}
          </span>
        )}
      </div>
      <div className="input-container">
        <select
          name="visit_type"
          id="visit_type"
          onChange={handleInputChange}
          value={formState?.visit_type?.value}
          className={formState?.visit_type?.error ? "error" : ""}
        >
          <option value="">
            Do you prefer an in person or a virtual visit?
          </option>
          <option value="in_person">In Person Visit</option>
          <option value="virtual">Telemedicine Virtual Visit</option>
        </select>
        <span className="error-message">{formState?.visit_type?.error}</span>
      </div>
      <div className="input-container">
        <select
          name="service"
          id="service"
          onChange={handleInputChange}
          value={formState?.service?.value}
          className={formState?.service?.error ? "error" : ""}
        >
          <option value="">What service are you interested in?</option>
          <option value="illness_or_injury">Illness or Injury</option>
          <option value="physical_testing">Physical Testing</option>
          <option value="covid_testing">COVID Testing</option>
        </select>
        <span className="error-message">{formState?.service?.error}</span>
      </div>
      <div className="input-container">
        <textarea
          name="message"
          placeholder="Message"
          className={formState?.message?.error ? "error" : ""}
          onChange={handleInputChange}
          value={formState?.message?.value}
        />
        <span className="error-message">{formState?.message?.error}</span>
      </div>
      <div className="privacy-container">
        <input
          type="checkbox"
          name="privacy_accepted"
          id="privacy_accepted"
          checked={formState?.privacy_accepted?.value}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="privacy_accepted" className="checkbox-label">
          I agree to receive emails and text messages from NCUC to handle my
          request or for promotional purposes.
        </label>
      </div>
      <button className="submit-btn" type="submit" disabled={submitted}>
        {cta}
      </button>
      {loading && (
        <>
          <div className="loader-container">
            <PuffLoader color={"var(--white)"} loading={loading} size={100} />
          </div>
          <div className="overlay"></div>
        </>
      )}
    </StyledForm>
  )
}

export default Form
