import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import respond from "../styles/abstracts/mediaqueries"

import { Colors } from "../styles/abstracts/abstracts"
import { shadeColor } from "../helpers/helpers"
import useParams from "../hooks/useParams"

const buttonCss = css`
  display: block;
  color: var(--white);
  width: ${({ width }) => (width ? width : css`35rem !important`)};
  padding: 2rem 0;
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
  transition: all 0.2s ease-in-out;
  background-color: var(--color-primary);
  border-radius: 10px;

  &:hover {
    background-color: #222b5f;
  }

  ${respond(
    "big-laptop",
    css`
      width: 22rem !important;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      font-size: 3.5rem;
      width: 53rem !important;
      padding: 2rem;
    `
  )}
`

const navButtonCss = css`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 68%;
  width: 21.5rem;
  line-height: 1.3;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;

  &:hover {
    background-color: ${shadeColor(Colors.colorTertiary, -30)} !important;
  }

  .subline {
    text-transform: capitalize !important;
    font-weight: 300;
    font-size: 1.4rem;
    display: block;
  }

  ${respond(
    "big-desktop",
    css`
      width: 40rem;
      font-size: 2rem;
    `
  )}
`

const mobileNavButtonCss = css`
  min-width: max-content;
  margin: 0 auto;
  height: 8rem;
  width: 40rem;
  font-size: 1.6rem;
  padding: 0 4rem;
  margin-bottom: var(--big-gutter);
`

const StyledButton = styled.button`
  ${buttonCss}
  padding: 0;
  background-color: ${({ color }) =>
    css`
      ${color}
    `};
  ${({ navButton }) => navButton && navButtonCss};
  ${({ mobileNavButton }) => mobileNavButton && mobileNavButtonCss};

  .button {
    ${buttonCss}
    background-color: ${({ color }) =>
      css`
        ${color}
      `};
    border-radius: 10px;
  }
`

function setAs(type) {
  switch (type) {
    case "button":
      return "button"
    case "link":
      return "a"
    case "internal":
      return "div"
    default:
      return "button"
  }
}

/*************************
 * @param {string} type
 * @param {string} useImperativeHandle(
 * @param {function} children,
 * @param {string} color,
 * @param {string} width,
 * @param {string} className,
 ***********************/

const Button = ({
  type,
  url,
  children,
  color,
  width,
  navButton,
  mobileNavButton,
  className,
}) => {
  const params = useParams()
  return (
    <StyledButton
      as={setAs(type)}
      href={type !== "internal" ? url : undefined}
      color={color}
      width={width || undefined}
      navButton={navButton}
      mobileNavButton={mobileNavButton}
      className={className ? `button ${className}` : "button"}
    >
      {type === "internal" ? (
        <Link
          to={url + params}
          className={className ? `button ${className}` : "button"}
          href={url}
          style={{
            width: width ? width : "max-content",
          }}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "link", "internal"]).isRequired,
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
}

export default Button
