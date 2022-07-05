import React, { useContext } from "react"
import styled from "styled-components"
import AppContext from "../context/AppContext"

const StyledMenuCategoryItems = styled.div`
  position: absolute;
  min-width: max-content;
  top: 6rem;
  left: 50%;
  background-color: rgb(43, 57, 144, 0.9);
  z-index: 200;
  padding: 4rem;
  transform: translateX(-50%);
  color: var(--white);
  text-transform: uppercase;
  display: grid;
  gap: var(--gutter);

  a {
    color: var(--white);
    &:hover {
      cursor: pointer;
      color: var(--color-secondary);
    }
  }
`

const MenuCategoryItems = ({ category, children }) => {
  const { setHoveredCategory } = useContext(AppContext)

  function handleMouseEnter() {
    setHoveredCategory(category)
  }
  function handleMouseLeave() {
    setHoveredCategory("")
  }

  return (
    <StyledMenuCategoryItems
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </StyledMenuCategoryItems>
  )
}

export default MenuCategoryItems
