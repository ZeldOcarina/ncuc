import styled, { css } from "styled-components";
import respond from "../../styles/abstracts/mediaqueries";

export default styled.form`
position: relative;
  .checkbox-label {
      font-size: 1.6rem;
      line-height: 1.3; 
  }

  .iti__flag {
    background-image: url("path/to/flags.png");
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .iti__flag {
      background-image: url("path/to/flags@2x.png");
    }
  }

  display: grid;
  gap: var(--gutter);

  ${respond(
  "small-phone",
  css`
      width: 320px;
   `)}

  h3 {
    text-align: center;
    ${respond(
    "nexus-7",
    css`
      font-size: 2.4rem;
   `)}
  }

  .name-container, .input-container {
    ${respond("iphone-12-mini", css`
      max-width: 32.5rem;  
    `)}
  }

  .name-container,
  .privacy-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gutter);
    align-items: center;
    ${respond(
      "iphone-8-plus",
      css`
      grid-template-columns: 1fr;
   `)}
    ${respond(
        "iphone-5",
        css`
      max-width: 300px;
   `)}
  }

  .privacy-container {
    grid-template-columns: 2rem 1fr;
    ${respond(
          "iphone-5",
          css`
      max-width: 300px;
   `)}

    input {
      transform: scale(1.5);
    }
  }

  input,
  select,
  textarea,
  .input {
    background-color: #f0f5f8;
    border: none;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;

    &::placeholder {
      color: #1c2126;
    }
    ${respond(
            "iphone-5",
            css`
      max-width: 300px;
   `)}
  }

  textarea {
    height: 20rem;
  }

  button {
    border: none;
    background-color: var(--color-secondary);
    font-family: var(--title-font);
    color: var(--white);
    text-transform: uppercase;
    border-radius: 60px;
    padding: 2rem 0;
    font-size: 2.3rem;
    font-weight: 200;
    letter-spacing: 5px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    ${respond(
              "nexus-7",
              css`
      font-size: 1.8rem;
   `)}
   ${respond(
                "iphone-5",
                css`
      font-size: 1.5rem;
   `)}

    &:hover {
      background-color: var(--color-primary);
    }

    &:disabled {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }

  .error-message {
    display: inline-block;
    font-weight: 400;
    color: red;
    font-size: 1.6rem;
    transform: translateX(1rem);
  }

  .error {
    border: 2px solid red;
  }

  .react-tel-input {
    padding: 1rem 2rem;
    .country-list {
      transform: translateY(-20px);
    }
    .flag-dropdown.open {
      background-color: transparent;
    }

    .flag-dropdown {
      background-color: transparent;
      border: none;

      .selected-flag {
        transform: scale(1.2);

        .open {
          background-color: transparent;
          background: transparent;
        }

        &:hover,
        &:focus {
          background-color: transparent;
        }
      }
    }

    .form-control {
      background-color: transparent;
      border: none;
      font-size: 1.8rem;
    }
  }

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 2;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    transform: scale(1.05);
    border-radius: 10px;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }
`;