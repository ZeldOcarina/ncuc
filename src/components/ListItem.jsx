import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: var(--gutter);

  margin-bottom: var(--small-gutter);

  img {
    ${respond(
      "iphone-12-mini-land",
      css`
        width: 1.8rem;
      `
    )}
  }
`

/********************
 * @param {string} item
 * @param {string} icon
 ********************/

const ListItem = ({ item }) => {
  return (
    <StyledListItem>
      <img
        src={item.Media.localFiles[0].publicURL}
        alt={item.AltText || "list symbol"}
      />
      <span>{item.Heading}</span>
    </StyledListItem>
  )
}

export default ListItem
