import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "../components/IntroSection"
import { useRef } from "react"
import { useEffect } from "react"

const StyledHtmlEmbed = styled.section`
  background-color: ${({ bgColorOverride }) =>
    bgColorOverride ? bgColorOverride : "inherit"};
  justify-content: center;
  margin: 0 auto;
  padding: 0 0 var(--section-gutter) 0;

  .intro-section {
    text-align: center;
    margin: 0 auto;
    padding: 0;

    ${respond(
      500,
      css`
        max-width: 90%;
      `
    )}

    .heading,
    .subheading {
      text-align: center;
      color: var(--white);
    }

    .heading,
    .subheading {
      margin: 0 auto;
      padding: 0;
    }

    .superheading {
      text-align: center;
      margin: 0 auto;
    }

    &::after {
      display: none;
    }
  }

  .title-container {
    background-color: var(--color-primary);
    padding: var(--big-gutter) 0;
  }

  .html-container {
    display: grid;
    place-items: center;
    iframe {
      border: none;
    }
  }
`

const HtmlEmbed = ({
  html,
  heading,
  subheading,
  superheading,
  id,
  bgColorOverride,
}) => {
  const htmlDivRef = useRef(null)

  useEffect(() => {
    const parsedHtml = document.createRange().createContextualFragment(html)
    htmlDivRef.current && htmlDivRef.current.appendChild(parsedHtml)
  }, [htmlDivRef, html])

  return (
    <StyledHtmlEmbed id={id} bgColorOverride={bgColorOverride}>
      <div className="title-container">
        <IntroSection
          heading={heading}
          superheading={superheading}
          subheading={subheading}
        />
      </div>

      <div ref={htmlDivRef} className="html-container" />
    </StyledHtmlEmbed>
  )
}

export default HtmlEmbed
