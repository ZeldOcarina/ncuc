import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    text-align: center;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <span>
          © {new Date().getFullYear()} Monarchy LLC | Tutti i Diritti Riservati
          <br />
          <a href="https://monarchy.io/privacy">Privacy Policy</a> |{" "}
          <a href="https://monarchy.io/privacy">Cookie Policy</a>
        </span>
      </div>
    </StyledFooter>
  )
}

export default Footer
