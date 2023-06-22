import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"
import respond from "../styles/abstracts/mediaqueries"

import MenuCategoryItems from "./MenuCategoryItems"
import { BiChevronDown } from "react-icons/bi"
import { MdChevronRight } from "react-icons/md"
import useParams from "../hooks/useParams"

const StyledCategoryItem = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

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

  .link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.3rem;
    list-style: none;
  }

  .second-level__item {
    position: relative;
    width: 100%;
  }

  .second-level-menu {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(116%) translateY(-4rem);
    background-color: rgb(43, 57, 144, 0.9);
    display: grid;
    flex-direction: column;
    padding: 4rem;
    width: 25rem;
    gap: var(--gutter);
  }
`

const CategoryItem = ({ category, categoryItems }) => {
  const {
    hoveredCategory,
    setHoveredCategory,
    secondaryHoveredCategory,
    setSecondaryHoveredCategory,
  } = useContext(AppContext)

  const params = useParams()

  function handleMouseEnter(category) {
    setHoveredCategory(category)
  }
  function handleMouseLeave() {
    setHoveredCategory("")
    setSecondaryHoveredCategory("")
  }

  function handleSecondaryHover(subCategory) {
    setSecondaryHoveredCategory(subCategory)
  }

  return (
    <StyledCategoryItem
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={() => handleMouseLeave(category)}
    >
      <span role="presentation" onMouseEnter={() => handleMouseEnter(category)}>
        {category}
      </span>
      {hoveredCategory === category && (
        <MenuCategoryItems category={category}>
          {categoryItems.map((item, i) => {
            return (
              <ul className="link-container" key={i}>
                {item.children ? (
                  <li
                    className="second-level__item"
                    role="presentation"
                    onMouseEnter={() => handleSecondaryHover(item.item)}
                  >
                    <span
                      role="presentation"
                      className="second-level__word"
                      onMouseEnter={() => handleSecondaryHover(item.item)}
                    >
                      {item.item}
                    </span>
                    <MdChevronRight />
                    {secondaryHoveredCategory === item.item ? (
                      <div className="second-level-menu">
                        {item.children.map((child, i) => {
                          return (
                            <Link
                              to={child.link + params}
                              key={i}
                              className="second-level__link"
                            >
                              {child.item}
                            </Link>
                          )
                        })}
                      </div>
                    ) : null}
                  </li>
                ) : (
                  <Link role="link" to={item.link + params || "/" + params}>
                    {item.item || ""}
                  </Link>
                )}
              </ul>
            )
          })}
        </MenuCategoryItems>
      )}
      <BiChevronDown />
    </StyledCategoryItem>
  )
}

export default CategoryItem
