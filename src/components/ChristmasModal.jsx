import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import closeModalIcon from "../images/icons/close-modal.svg"
import hr from "../images/hr.svg"
import snowflake from "../images/snowflake.svg"

import Snowfall from "react-snowfall"

const StyledChristmasModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  // Make backdrop blurred
  backdrop-filter: blur(3px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ isDialogShown }) => {
    if (!isDialogShown) {
      return `
        display: none;
      `
    }
  }}

  dialog {
    border: none;
    width: 35vw;
    aspect-ratio: 1 / 1;
    max-width: 95%;
    background-color: var(--color-tertiary);
    border-radius: 12px;
    position: relative;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    font-size: 2.5rem;

    ${respond(
      1560,
      css`
        width: 45vw;
      `
    )}
    ${respond(
      1360,
      css`
        width: 50vw;
      `
    )}
    ${respond(
      1200,
      css`
        width: 60vw;
      `
    )}
    ${respond(
      1000,
      css`
        width: 80vw;
      `
    )}
    ${respond(
      750,
      css`
        width: 90%;
        aspect-ratio: unset;
        height: 90vh;
      `
    )}
    ${respond(
      320,
      css`
        font-size: 1.8rem;
      `
    )}

    h2 {
      color: var(--white);
      font-weight: 100;
      text-transform: uppercase;
      text-align: center;
      font-size: 4rem;

      ${respond(
        320,
        css`
          font-size: 3rem;
        `
      )}
    }

    .hr {
      margin: var(--gutter) auto;
      max-width: 100%;
    }

    .schedule {
      text-align: center;
      .big {
        font-size: 3rem;
        font-weight: 400;

        ${respond(
          320,
          css`
            font-size: 2.5rem;
          `
        )}
      }
    }

    .close-icon {
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }

    .snowflake {
      // place it in the left-top
      position: absolute;
      top: 3rem;
      left: 2rem;
      transform: rotate(20deg);
      width: 8rem;
      height: 8rem;
      z-index: 1000;

      ${respond(
        400,
        css`
          display: none;
        `
      )}
    }
  }
`

const ChristmasModal = () => {
  const [isDialogShown, setIsDialogShown] = useState(true)
  const closeIcon = useRef(null)

  useEffect(() => {
    closeIcon.current.addEventListener("click", () => {
      setIsDialogShown(false)
    })
  }, [isDialogShown])

  return (
    <StyledChristmasModal isDialogShown={isDialogShown}>
      <dialog>
        <img
          src={closeModalIcon}
          alt="close modal"
          className="close-icon"
          ref={closeIcon}
        />
        <div className="content">
          <h2>Holiday Hours</h2>
          <img className="hr" src={hr} alt="dividing line" />
          <div className="schedule">
            <div>
              <p>
                12/24 Christmas Eve
                <br />
                <span className="big">8am to 4pm</span>
              </p>
              <p>
                12/25 Christmas Day
                <br />
                <span className="big">8am to 1pm</span>
              </p>
              <p>
                12/31 New Year’s Eve
                <br />
                <span className="big">8am to 6pm</span>
              </p>
              <p>
                1/1/23 New Year’s Day <br />
                <span className="big">8am to 3:30pm</span>
              </p>
            </div>
          </div>
        </div>
        <img src={snowflake} alt="snowflake" className="snowflake" />
      </dialog>
      <Snowfall />
    </StyledChristmasModal>
  )
}

export default ChristmasModal
