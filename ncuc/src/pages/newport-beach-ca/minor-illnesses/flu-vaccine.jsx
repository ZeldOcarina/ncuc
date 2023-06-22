import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"

import AppContext from "@zeldocarina/gatsby-theme-waves/src/context/AppContext"

import Layout from "@zeldocarina/gatsby-theme-waves/src/layout/Layout"
import Seo from "@zeldocarina/gatsby-theme-waves/src/components/Seo"

import CopySection from "@zeldocarina/gatsby-theme-waves/src/components/CopySection"
import TextSection from "@zeldocarina/gatsby-theme-waves/src/components/TextSection"
import MobilePingPong from "@zeldocarina/gatsby-theme-waves/src/components/MobilePingPong"
import PingPong from "@zeldocarina/gatsby-theme-waves/src/components/PingPong"
import Faqs from "@zeldocarina/gatsby-theme-waves/src/components/Faqs"
import CardsSection from "@zeldocarina/gatsby-theme-waves/src/components/CardsSection"
import Form from "@zeldocarina/gatsby-theme-waves/src/components/vaccine-form/Form"
import respond from "@zeldocarina/gatsby-theme-waves/src/styles/abstracts/mediaqueries"
import { parseShortcodes } from "@zeldocarina/gatsby-theme-waves/src/helpers/parseShortcodes"

const StyledFluVaccine = styled.main`
  #cta {
    padding: 11rem 0;

    ul {
      list-style-position: inside;
      list-style: none;
      text-align: center;
    }

    p {
      text-align: center;
    }

    a {
      font-weight: 500;
    }

    .buttons-container {
      gap: 0;
    }

    .button {
      width: 100% !important;
      background-color: var(--color-primary);
      min-width: max-content;
      padding: 2rem 3rem;
      display: block;
      color: var(--white);
      border-radius: 10px;
    }
  }

  .cta-container {
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${respond(
      1040,
      css`
        grid-template-columns: 1fr;
      `
    )}

    .form-container {
      width: 80%;
      display: flex;
      align-items: center;

      ${respond(
        1300,
        css`
          width: 90%;
        `
      )}
      ${respond(
        1040,
        css`
          width: 80%;
          padding: var(--section-gutter) 0;
          grid-row: 2 / 3;
        `
      )}
      ${respond(
        500,
        css`
          width: 97%;
        `
      )}
    }

    #cta {
      .container {
        width: 80%;

        ${respond(
          1300,
          css`
            width: 90%;
          `
        )}
        ${respond(
          1040,
          css`
            grid-row: 1 / 2;
          `
        )}
        ${respond(
          500,
          css`
            width: 97%;
          `
        )}
      }
    }
  }

  .form-container {
    padding: var(--section-gutter) 0 0 0;
    width: 40%;
    margin: 0 auto;

    ${respond("laptop", "width: 50%;")}
    ${respond("tab-land", "width: 70%;")}
    ${respond("tab-port", "width: 100%;")}
    ${respond("phone-port", "width: 90%;")}

    .form {
      h3 {
        margin-bottom: var(--gutter);
        font-family: var(--title-font);
        font-weight: 200;
        text-transform: uppercase;
        font-size: 3.5rem;
        color: var(--grey500);
      }

      .privacy-container {
        margin-top: var(--gutter);
        margin-bottom: var(--gutter);
      }
    }
  }

  .hero {
    min-height: 88vh;
    position: relative;
    display: grid;
    place-items: center;

    ${respond(
      "phone-port",
      css`
        min-height: 75vh;
      `
    )}

    &__content {
      max-width: 80rem;
      display: grid;
      place-items: center;

      ${respond(
        "phone-port",
        css`
          max-width: 90%;
        `
      )}
    }

    &__title {
      color: var(--white);
      font-weight: 400;
      text-transform: uppercase;
      font-size: 4.5rem;
      text-align: center;

      ${respond(
        "phone-port",
        css`
          font-size: 2.8rem;
        `
      )}
    }

    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top left;
      z-index: -1;
      filter: brightness(0.7);
    }

    &__btn {
      background-color: var(--color-tertiary);
      color: var(--white);
      font-weight: 500;
      padding: 2rem 3rem;
      min-width: max-content;
      display: inline-block;
      margin: 0 auto;
      border-radius: 10px;
    }
  }

  .cta {
    position: relative;

    &__title,
    &__subtitle,
    &__phone {
      color: var(--white);
      text-align: center;
    }

    &__title {
      text-transform: uppercase;
      font-weight: 300;
      font-size: 3.5rem;
      margin: var(--gutter) auto;
    }

    &__phone {
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: var(--gutter);

      a {
        font-weight: 300;
        text-transform: uppercase;
        color: var(--white);
      }
    }
    &__subtitle {
      margin-bottom: var(--big-gutter);
    }

    .container {
      position: relative;
      z-index: 100;
    }

    &__bg-image {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);
    margin-top: 7rem;

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
      `
    )}
  }
`

const FluVaccine = ({
  data: {
    heroData: { heroData },
    textData: { textData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    ctaSectionData: { ctaSectionData },
    faqTitleData: { faqTitleData },
    faqItemsData: { faqItemsData },
    cardsTitleData: { cardsTitleData },
    cardsData: { cardsData },
  },
}) => {
  const { isiPadPro12 } = useContext(AppContext)

  function setPingPong() {
    if (
      pingPongItems.length === 0 ||
      !pingPongItems.some(
        item => item.data.Media && item.data.Media.localFiles[0]
      )
    )
      return ""
    if (isiPadPro12)
      return <MobilePingPong titleData={pingPongTitle} items={pingPongItems} />
    return <PingPong titleData={pingPongTitle} items={pingPongItems} />
  }

  return (
    <Layout>
      <StyledFluVaccine>
        <header className="hero">
          <div className="hero__content">
            <h1 className="hero__title">{heroData.Heading}</h1>
            <img
              className="hero__bg"
              src={heroData.Media.localFiles[0].publicURL}
              alt={heroData.AltText}
            />
            <a className="hero__btn" href={heroData.ButtonLink}>
              {heroData.ButtonLabel}
            </a>
          </div>
        </header>
        <div className="cta-container">
          <section className="cta" id="cta">
            <div className="container">
              <h2 className="cta__title">{ctaSectionData.Heading}</h2>
              <h5 className="cta__phone">
                Call now: <a href="tel:19496687383">(949) 668-7383</a>
              </h5>
              <p className="cta__subtitle">{ctaSectionData.Subheading}</p>

              <CopySection columns={1} theme={"light"}>
                {ctaSectionData.Copy}
              </CopySection>
            </div>
            <img
              className="cta__bg-image"
              src={ctaSectionData.Media.localFiles[0].publicURL}
              alt=""
              role="presentation"
            />
          </section>
          <div className="form-container" id="vaccine-form">
            <Form
              title="Schedule your vaccine today!"
              cta="submit"
              isFluVaccineForm
            />
          </div>
        </div>

        <TextSection
          superheading={textData.Superheader}
          subheading={textData.Subheading}
          heading={textData.Heading}
          copy={textData.Copy}
        />
        {setPingPong()}
        <Faqs
          id="faq"
          superheading={faqTitleData.Superheading}
          heading={faqTitleData.Heading}
          subheading={faqTitleData.Subheading}
          faqs={faqItemsData}
          backgroundOverride={faqTitleData.BgColorOverride}
        />
        <CardsSection
          heading={cardsTitleData.Heading}
          superheading={cardsTitleData.Superheading}
          subheading={cardsTitleData.Subheading}
          cards={cardsData}
          backgroundOverride={cardsTitleData.BgColorOverride}
        />
      </StyledFluVaccine>
    </Layout>
  )
}

export const Head = ({
  data: {
    pageTitleData: { pageTitleData },
    keywordsData: { keywordsData },
    pageShortcodesData,
    globalShortcodesData: { globalShortcodesData },
  },
}) => {
  const shortcodes = parseShortcodes(
    pageShortcodesData?.pageShortcodesData,
    globalShortcodesData
  )

  return (
    <Seo
      title={`NCUC | ${pageTitleData.Page_Title}`}
      keywords={`${keywordsData.Main_Keyword} ${keywordsData.Relative_Keywords}`}
      shortcodes={shortcodes}
    />
  )
}

export const query = graphql`
  query FluVaccine {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: {
        Permalink: { eq: "/newport-beach-ca/minor-illnesses/flu-vaccine/" }
      }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    keywordsData: airtable(
      table: { eq: "Sitemap" }
      data: { Page_Title: { eq: "Flu Vaccine" } }
    ) {
      keywordsData: data {
        Main_Keyword
        Relative_Keywords
      }
    }
    heroData: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "Hero" }, isActive: { eq: true } }
    ) {
      heroData: data {
        Heading
        ButtonLabel
        ButtonLink
        Overlay
        Media {
          localFiles {
            publicURL
          }
        }
        Subheading
        AltText
      }
    }
    textData: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "Text" }, isActive: { eq: true } }
    ) {
      textData: data {
        Superheading
        Heading
        Subheading
        Copy
      }
    }
    pingPongTitle: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "PingPong" }, isActive: { eq: true } }
    ) {
      pingPongTitle: data {
        Subheading
        Heading
        Superheading
      }
    }
    pingPongItems: allAirtable(
      filter: {
        table: { eq: "Flu Vaccine" }
        data: { Block: { eq: "PingPongItem" }, isActive: { eq: true } }
      }
    ) {
      pingPongItems: nodes {
        data {
          Heading
          Copy
          Media {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
    ctaSectionData: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "CTA" }, isActive: { eq: true } }
    ) {
      ctaSectionData: data {
        Subheading
        Heading
        Copy
        ButtonLabel
        ButtonLink
        Media {
          localFiles {
            publicURL
          }
        }
      }
    }
    faqTitleData: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "FAQ" }, isActive: { eq: true } }
    ) {
      faqTitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
      id
    }
    faqItemsData: allAirtable(
      filter: {
        table: { eq: "Flu Vaccine" }
        data: { Block: { eq: "FaqItem" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      faqItemsData: nodes {
        data {
          Heading
          Copy
          Name
          rowNumber
        }
        id
      }
    }
    cardsTitleData: airtable(
      table: { eq: "Flu Vaccine" }
      data: { Block: { eq: "Cards" }, isActive: { eq: true } }
    ) {
      cardsTitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
      id
    }
    cardsData: allAirtable(
      filter: {
        table: { eq: "Flu Vaccine" }
        data: { Block: { eq: "CardsItem" }, isActive: { eq: true } }
      }
    ) {
      cardsData: nodes {
        data {
          Heading
          Copy
          ButtonLabel
          ButtonLink
          Media {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
    pageShortcodesData: allAirtable(
      filter: {
        table: { eq: "Shortcodes" }
        data: { Shortcodes: { ne: null }, Category: { eq: "Flu Vaccine" } }
      }
    ) {
      pageShortcodesData: nodes {
        data {
          Label
          Shortcodes
          Value
          Category
        }
      }
    }
    globalShortcodesData: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: { Shortcodes: { ne: null }, Name: { eq: "Details" } }
      }
    ) {
      globalShortcodesData: nodes {
        data {
          Label
          Shortcodes
          Value
          Category
        }
      }
    }
  }
`

export default FluVaccine
