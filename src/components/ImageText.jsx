import React from "react"
import styled, { css } from "styled-components"

import { unified } from "unified"
import markdown from "remark-parse"
import html from "remark-html"

import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"

const StyledImageText = styled.section`
  ${respond(
    1100,
    css`
      padding-top: var(--gutter);
    `
  )}
  .container {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: var(--section-gutter);

    ${respond(
      1100,
      css`
        grid-template-columns: 1fr;
      `
    )}
  }

  .right-container {
    ${respond(
      1100,
      css`
        display: none;
      `
    )}

    img {
      width: 100%;
    }
  }

  .mobile-image {
    width: 100%;
    display: none;
    margin-bottom: var(--big-gutter);

    ${respond(
      1100,
      css`
        display: block;
      `
    )}
  }

  .left-container {
    .markdown-container {
      p {
        margin-bottom: var(--gutter);
      }
    }
  }

  .intro {
    text-align: left;
    padding-top: var(--gutter);

    ${respond(
      1100,
      css`
        padding-top: 0;
        margin-bottom: 0;
      `
    )}

    h2,
    h3 {
      text-align: left;
      margin-left: 0;

      ${respond(
        1100,
        css`
          text-align: center;
          margin: var(--gutter) auto 0 auto;
        `
      )}
    }

    h2 {
      margin-bottom: 0;
    }
  }
`

const ImageText = ({ superheading, heading, copy, AltText, mediaDrop }) => {
  return (
    <StyledImageText id="dr-doonan-bio">
      <div className="container">
        <div className="left-container">
          <IntroSection
            superheading={superheading}
            heading={heading}
            className="intro"
          />
          <img
            src={mediaDrop.localFiles[0].publicURL}
            alt={AltText}
            className="mobile-image"
          />
          <div
            className="markdown-container"
            dangerouslySetInnerHTML={{
              __html: unified().use(markdown).use(html).processSync(copy),
            }}
          ></div>
        </div>
        <div className="right-container">
          <img src={mediaDrop.localFiles[0].publicURL} alt={AltText} />
        </div>
      </div>
    </StyledImageText>
  )
}

export default ImageText
