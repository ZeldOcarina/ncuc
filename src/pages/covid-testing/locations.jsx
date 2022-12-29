import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../../layout/Layout"
import Seo from "../../components/Seo"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import IntroSection from "../../components/IntroSection"
import Button from "../../components/Button"

const Styledlocations = styled.main`
  .locations-container {
    text-align: center;
    h5 {
      color: var(--color-secondary);
    }

    article {
      &:not(:last-child) {
        margin-bottom: var(--big-gutter);
      }
    }
  }

  .book-button {
    padding: 2rem 4rem;
    min-width: max-content;
    margin: 0 auto 6rem auto;
  }
`

const Locations = ({
  data: {
    locationsData: { locationsData },
  },
}) => {
  return (
    <Layout>
      <Styledlocations>
        <div className="container">
          <IntroSection
            heading="OUR COVID TESTING LOCATIONS"
            subheading={
              "In addition to our Newport site, we offer drive-thru COVID testing at the following locations."
            }
            centerSubHeading
          />
          <Button
            color="var(--color-tertiary)"
            navButton
            type="link"
            url="https://occctesting.com/"
            className="book-button"
          >
            BOOK COVID TEST
          </Button>
        </div>

        <div className="locations-container container">
          {locationsData.map(location => {
            return (
              <article className="location" key={location.id}>
                <h5>{location.data.Name}</h5>
                <p>
                  <a href={location.data.AddressLink}>
                    {location.data.Address}
                  </a>
                </p>
                <p>{location.data.Notes}</p>
                <ReactMarkdown
                  children={location.data.Schedule}
                  remarkPlugins={[remarkGfm]}
                />
              </article>
            )
          })}
        </div>
      </Styledlocations>
    </Layout>
  )
}

export const Head = ({
  data: {
    keywordsData: { keywordsData },
  },
}) => (
  <Seo
    title="NCUC | COVID Testing Locations"
    keywords={`${keywordsData.Main_Keyword} ${keywordsData.Relative_Keywords}`}
  />
)

export const query = graphql`
  query Locations {
    keywordsData: airtable(
      table: { eq: "Sitemap" }
      data: { Page_Title: { eq: "Locations" } }
    ) {
      keywordsData: data {
        Main_Keyword
        Relative_Keywords
      }
    }
    locationsData: allAirtable(filter: { table: { eq: "COVID Locations" } }) {
      locationsData: nodes {
        id
        data {
          Address
          AddressLink
          Name
          Notes
          Schedule
        }
      }
    }
  }
`

export default Locations
