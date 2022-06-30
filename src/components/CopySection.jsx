import React from "react"
import styled from "styled-components"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const StyledCopySection = styled.article`
  column-count: ${({ columns }) => columns || 2};
  column-gap: var(--section-gutter);
  color: ${({ theme }) => {
    return theme === "light" ? "var(--white)" : "var(--grey500)"
  }};
  p,
  li {
    margin-bottom: 1.3rem;
  }
`

const CopySection = ({ children, columns, theme }) => {
  //console.log(children)
  return (
    <StyledCopySection columns={columns} theme={theme}>
      <ReactMarkdown
        children={children.replaceAll("\\", "")}
        remarkPlugins={[remarkGfm]}
      />
    </StyledCopySection>
  )
}

export default CopySection
