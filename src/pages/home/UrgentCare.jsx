import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import IntroSection from "../../components/IntroSection"
import List from "../../components/List"
import ListItem from "../../components/ListItem"

const StyledUrgentCare = styled.section``

const UrgentCare = () => {
  const {
    intro: {
      data: { superheading, heading, subheading },
    },
    items: { listItems },
  } = useStaticQuery(query)

  return (
    <StyledUrgentCare>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
        <List>
          {listItems.map(
            ({
              id,
              data: {
                item,
                icon: {
                  localFiles: [{ publicURL }],
                },
              },
            }) => {
              return <ListItem key={id} item={item} icon={publicURL} />
            }
          )}
        </List>
      </div>
    </StyledUrgentCare>
  )
}

const query = graphql`
  query UrgentCare {
    intro: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "UrgentCare" } }
    ) {
      data {
        superheading
        heading
        subheading
      }
    }
    items: allAirtable(
      filter: {
        table: { eq: "Home" }
        data: { blockName: { eq: "UrgentCareItem" } }
      }
    ) {
      listItems: nodes {
        id
        data {
          item
          icon {
            localFiles {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default UrgentCare
