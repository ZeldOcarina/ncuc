import { Link } from "gatsby"
import React from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"

import { hexToRGB } from "../helpers/helpers"
import respond from "../styles/abstracts/mediaqueries"

const StyledHeroItem = styled.article`
  .card {
    background-color: ${({ white, bgColorOverride }) =>
      bgColorOverride ? bgColorOverride : hexToRGB(white, 0.75)};
    padding: 5rem 2.5rem 2.5rem;
    border-radius: 15px;
    position: relative;
    -webkit-mask-image: radial-gradient(
      circle at top,
      transparent 40px,
      black 41px
    );
    mask-image: radial-gradient(circle at top, transparent 40px, black 41px);
    min-height: 100%;
  }

  // Clip the background and obtain a circle on top of the background

  .heading {
    text-transform: uppercase;
    color: var(--color-tertiary);
    font-size: 2.5rem;

    ${respond(
      500,
      css`
        font-size: 2rem;
      `
    )}
  }

  .icon-container {
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-10px);
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    z-index: 100;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
`

const CardLink = ({ children, ButtonLink }) => {
  if (!ButtonLink) return <div>{children}</div>
  if (ButtonLink.startsWith("http"))
    return (
      <a href={ButtonLink} rel="external" target="_blank">
        {children}
      </a>
    )
  return <Link to={ButtonLink}>{children}</Link>
}

const HeroItem = ({
  Heading,
  Media,
  AltText,
  BgColorOverride,
  ButtonLink,
  bgImage,
  overlay,
}) => {
  const icon = Media.localFiles[0].publicURL
  const { colors } = useContext(AppContext)

  const cardRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    // Place the iconRef in the top center of the cardRef
    const card = cardRef.current
    const icon = iconRef.current

    const cardRect = card.getBoundingClientRect()
    const iconRect = icon.getBoundingClientRect()

    const cardCenterX = cardRect.x + cardRect.width / 2
    const cardCenterY = cardRect.y + cardRect.height / 4

    const iconCenterX = iconRect.x + iconRect.width / 2
    const iconCenterY = iconRect.y + iconRect.height

    const iconOffsetX = cardCenterX - iconCenterX
    let iconOffsetY = cardCenterY - iconCenterY

    const isMobile = window.innerWidth < 768
    if (isMobile) iconOffsetY -= 10

    icon.style.transform = `translate(${iconOffsetX}px, ${iconOffsetY}px)`
  }, [cardRef, iconRef])

  const innerContent = (
    <>
      <div className="icon-container" ref={iconRef}>
        <img className="icon" src={icon} alt={AltText ?? Heading} />
      </div>
      <div className="card" ref={cardRef}>
        <h3 className="heading">{Heading}</h3>
      </div>
    </>
  )

  return (
    <StyledHeroItem
      white={colors.white}
      bgColorOverride={BgColorOverride}
      bgImage={bgImage}
    >
      <CardLink ButtonLink={ButtonLink}>{innerContent}</CardLink>
    </StyledHeroItem>
  )
}

export default HeroItem
