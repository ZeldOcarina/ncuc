import React from "react"
import styled from "styled-components"
import FaqItem from "./FaqItem"
import IntroSection from "./IntroSection"

const StyledFaqs = styled.section`
  background-color: var(--background-dark);
`

function Faqs({ faqs, superheading, heading, subheading }) {
  return (
    <StyledFaqs>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        ></IntroSection>
        {faqs.map(({ id, data: { question, answer } }) => (
          <FaqItem {...{ question, answer }} key={id} />
        ))}
      </div>
    </StyledFaqs>
  )
}

export default Faqs
