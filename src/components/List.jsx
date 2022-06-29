import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledList = styled.ul`
  column-count: 2;
  column-gap: var(--gutter);
  row-gap: var(--gutter);
  list-style: none;

  ${respond(
    "macbook-air",
    css`
      row-gap: 0;
    `
  )}
`

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>
}

export default List
