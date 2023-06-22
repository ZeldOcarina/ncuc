import React from "react"
import styled from "styled-components"

import IntroSection from "../components/IntroSection"
import List from "../components/List"
import ListItem from "../components/ListItem"

const StyledUrgentCare = styled.section`
  .intro-section {
    .heading {
      color: var(--body-color);
    }
  }
`

const UrgentCare = ({ superheading, heading, subheading, listItems }) => {
  return (
    <StyledUrgentCare>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
        <List>
          {listItems.map(item => {
            return <ListItem key={item.id} item={item.data} />
          })}
        </List>
      </div>
    </StyledUrgentCare>
  )
}

export default UrgentCare
