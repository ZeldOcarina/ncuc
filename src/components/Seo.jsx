import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const Seo = ({ title, description, language }) => {
  const {
    site: {
      siteMetadata: { siteUrl, title: metaTitle, description: metaDescription },
    },
  } = useStaticQuery(query)

  return (
    <Helmet htmlAttributes={{ lang: language || "en" }}>
      <title>{title || metaTitle}</title>
      <meta name="description" content={description || metaDescription} />
      <meta name="webmaster" content="Mattia Rasulo" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || metaTitle} />
      <meta
        property="og:description"
        content={description || metaDescription}
      />
      <meta property="og:image" content={`${siteUrl}/screenshot.png`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:width" content="630" />
      <meta property="og:image:type" content="image/png" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel&family=Poppins:ital,wght@0,400;0,600;0,700;1,600&family=Work+Sans:wght@600&display=swap"
        rel="stylesheet"
      /> */}
      <link rel="stylesheet" href="https://use.typekit.net/nxf4ohg.css" />
      {/* FAVICONS */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#f9fcff" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
  }
`

export default Seo
