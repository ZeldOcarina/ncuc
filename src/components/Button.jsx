import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"

const buttonCss = css`
  display: block;
  color: var(--white);
  width: ${({ width }) => (width ? width : css`max-content`)};
  padding: 2rem 0;
  border: none;
`

const StyledButton = styled.button`
  ${buttonCss}
  background-color: ${({ color }) => css`var(--color-${color})`};

  .button {
    ${buttonCss}
    background-color: ${({ color }) => css`var(--color-${color})`};
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

export default Button
