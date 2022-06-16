import React from "react"
import styled from "styled-components"

const StyledList = styled.ul`
  column-count: 2;
  column-gap: var(--gutter);
  row-gap: var(--gutter);
  list-style: none;
`

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>
}

export default List
