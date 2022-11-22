import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledCard = styled.article`
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  grid-template-rows: 1fr 1fr;

  .top-section {
    background-color: transparent;
    margin-bottom: 1rem;
    height: 30rem;
  }

  .bottom-section {
    position: relative;
    background-color: var(--white);
    height: auto;
    padding: 4rem 4rem ${({ link }) => (link ? "10rem" : "6rem")} 4rem;
    flex-grow: 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }

  h5 {
    color: var(--color-tertiary);
    text-transform: uppercase;
    font-size: 2.4rem;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: var(--gutter);
    line-height: 1.4;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;

    ${respond(
      "big-desktop",
      css`
        font-size: 3.2rem;
      `
    )}
  }

  .link {
    color: var(--color-secondary);
    font-weight: 500;
    text-transform: uppercase;
    display: block;
    position: absolute;
    bottom: 4rem;
    right: 5rem;

    ${respond(
      "phone-port",
      css`
        right: 7rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        right: 8rem;
      `
    )}
  }
`

const Card = ({ Copy, Heading, Media, ButtonLabel, ButtonLink, AltText }) => {
  return (
    <StyledCard link={ButtonLink}>
      <div className="top-section">
        <img src={Media?.localFiles[0]?.publicURL} alt={AltText || Heading} />
      </div>
      <div className="bottom-section">
        <h5>{Heading}</h5>
        <p>{Copy}</p>
        {ButtonLink && (
          <Link className="link" to={ButtonLink}>
            {ButtonLabel}
          </Link>
        )}
      </div>
    </StyledCard>
  )
}

export default Card
