import React from "react"
import styled, { css } from "styled-components"
import IntroSection from "../../components/IntroSection"
import respond from "../../styles/abstracts/mediaqueries"

const StyledOtherPracticioners = styled.section`
  padding-top: 0;
  padding-bottom: 12rem;
  background-color: var(--background-dark);

  .practicioner {
    margin: 0 auto;
  }

  .other-practicioners {
    display: flex;
    justify-content: center;
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: flex-start;
      gap: var(--gutter);

      ${respond(
        1020,
        css`
          grid-template-columns: 1fr 1fr;
        `
      )}
      ${respond(
        670,
        css`
          grid-template-columns: 1fr;
        `
      )}

      .practicioner {
        font-size: 2.4rem;
        font-weight: 600;
        text-align: left;
      }
    }
  }
`

const OtherPracticioners = ({ practicioners, heading, subheading }) => {
  return (
    <StyledOtherPracticioners>
      <IntroSection heading={heading} subheading={subheading} noPaddingTop />
      <div className="other-practicioners container">
        <ul>
          {practicioners.map(practicioner => {
            return (
              <li key={practicioner.id} className="practicioner">
                <article>{practicioner.data.Heading}</article>
              </li>
            )
          })}
        </ul>
      </div>
    </StyledOtherPracticioners>
  )
}

export default OtherPracticioners
