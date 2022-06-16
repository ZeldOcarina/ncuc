import React from "react"
import styled from "styled-components"

const StyledCopySection = styled.article`
  column-count: ${({ columns }) => columns || 2};
  column-gap: var(--section-gutter);
  color: ${({ theme }) => {
    return theme === "light" ? "var(--white)" : "var(--grey500)"
  }};
`

const CopySection = ({ children, columns, theme }) => {
  return (
    <StyledCopySection columns={columns} theme={theme}>
      {children}
    </StyledCopySection>
  )
}

export default CopySection
