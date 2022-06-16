import React from "react"
import styled from "styled-components"
import FaqItem from "./FaqItem"
import IntroSection from "./IntroSection"

const StyledFaqs = styled.section`
  background-color: var(--background-dark);
`

function Faqs({ faqs }) {
  return (
    <StyledFaqs>
      <IntroSection
        title="Frequently asked questions"
        subtitle="Newport Beach Urgent care"
      ></IntroSection>
      <div className="container">
        {faqs.map(({ id, data: { question, answer } }) => (
          <FaqItem {...{ question, answer }} key={id} />
        ))}
      </div>
    </StyledFaqs>
  )
}

export default Faqs
