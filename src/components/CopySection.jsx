import React from "react"
import styled from "styled-components"

const StyledCopySection = styled.article`
  column-count: 2;
  column-gap: var(--section-gutter);
`

const CopySection = ({ children }) => {
  return <StyledCopySection>{children}</StyledCopySection>
}

export default CopySection
