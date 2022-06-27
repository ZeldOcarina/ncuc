import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const buttonCss = css`
  display: block;
  color: var(--white);
  width: ${({ width }) => (width ? width : css`max-content`)};
  padding: 2rem 0;
  border: none;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
`

const StyledButton = styled.button`
  ${buttonCss}
  background-color: ${({ color }) =>
    css`
      ${color}
    `};

  .button {
    ${buttonCss}
    background-color: ${({ color }) =>
      css`
        ${color}
      `};
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
 ***********************/

const Button = ({ type, url, children, color, width }) => {
  return (
    <StyledButton
      as={setAs(type)}
      href={type !== "internal" ? url : undefined}
      color={color}
      width={width || undefined}
    >
      {type === "internal" ? (
        <Link
          to={url}
          className="button"
          href={url}
          style={{
            backgroundColor:
              color === "primary"
                ? "var(--color-primary)"
                : "var(--color-secondary",
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
}

export default Button
