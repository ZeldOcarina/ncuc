import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"
import respond from "../styles/abstracts/mediaqueries"

import MenuCategoryItems from "./MenuCategoryItems"

const StyledCategoryItem = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;

  ${respond(
    "notebook",
    css`
      font-size: 1.4rem;
    `
  )}

  span {
    &:hover {
      color: var(--color-secondary);
    }
  }
`

const CategoryItem = ({ category, categoryItems }) => {
  const { hoveredCategory, setHoveredCategory } = useContext(AppContext)

  function handleMouseEnter(category) {
    setHoveredCategory(category)
  }
  function handleMouseLeave(category) {
    setHoveredCategory("")
  }

  if (category === "About Us") return ""

  return (
    <StyledCategoryItem
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={() => handleMouseLeave(category)}
    >
      <span>{category}</span>
      {hoveredCategory === category && (
        <MenuCategoryItems category={category}>
          {categoryItems.map((item, i) => {
            return (
              <Link to={item.data.Permalink} key={i}>
                {item.data.Child || ""}
              </Link>
            )
          })}
        </MenuCategoryItems>
      )}
    </StyledCategoryItem>
  )
}

export default CategoryItem
