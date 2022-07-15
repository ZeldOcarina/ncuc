import React from "react"
import styled, { css } from "styled-components"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import respond from "../styles/abstracts/mediaqueries"

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

  ${respond(
    500,
    css`
      column-count: 1;
    `
  )}
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
