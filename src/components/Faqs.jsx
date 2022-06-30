import React from "react"
import styled from "styled-components"
import FaqItem from "./FaqItem"
import IntroSection from "./IntroSection"

const StyledFaqs = styled.section`
  background-color: var(--background-dark);
  ${({ noPaddingTop }) => {
    return noPaddingTop && "padding-top: 0;"
  }}
`

function Faqs({ faqs, superheading, heading, subheading, noPaddingTop }) {
  return (
    <StyledFaqs noPaddingTop={noPaddingTop}>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          noPaddingTop={noPaddingTop}
        ></IntroSection>
        {faqs.map(({ id, data: { question, answer } }) => (
          <FaqItem {...{ question, answer }} key={id} />
        ))}
      </div>
    </StyledFaqs>
  )
}

export default Faqs
