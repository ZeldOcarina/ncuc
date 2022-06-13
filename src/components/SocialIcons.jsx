import React from "react"
import {
  // FaFacebookF,
  // FaInstagram,
  // FaTwitter,
  // FaLinkedin,
  FaYoutube,
} from "react-icons/fa"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledSocialIcons = styled.div`
  width: max-content;
  display: flex;
  gap: 2.5rem;
  ${respond(
    "phone-port",
    css`
      margin: 0 auto;
    `
  )}
  .social-icon {
    font-size: 3rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    ${mobileVersion => {
      return (
        mobileVersion &&
        css`
          font-size: 5.5rem;
        `
      )
    }}
    &:hover {
      transform: scale(1.2);
    }
  }
  .social-link {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: var(--white);
    text-transform: initial;
    font-size: 1.9rem;
  }
`

const SocialIcons = (
  {
    socialLinks: { facebook, instagram, linkedin, twitter, youtube },
    className,
  },
  mobileVersion
) => {
  return (
    <StyledSocialIcons className={className} mobileVersion={mobileVersion}>
      {/* <a href={facebook}>
        <FaFacebookF color="white" className="social-icon" />
      </a>
      <a href={instagram}>
        <FaInstagram color="white" className="social-icon" />
      </a>
      <a href={linkedin}>
        <FaLinkedin color="white" className="social-icon" />
      </a>
      <a href={twitter}>
        <FaTwitter color="white" className="social-icon" />
      </a> */}
      <a href={youtube} className="social-link">
        <FaYoutube color="white" className="social-icon" />{" "}
        <span className="name">YouTube</span>
      </a>
    </StyledSocialIcons>
  )
}

export default SocialIcons
