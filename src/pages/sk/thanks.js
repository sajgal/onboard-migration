import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'gatsby-link'

class ThanksSk extends Component {
  render() {
    const homepage = this.props.data.allContentfulHomepage.edges[0].node
    const menuItems = this.props.data.allContentfulMenu.edges

    return (
      <div className="page-content">
        <Navigation lang="en" menuItems={menuItems} menuType="top" />

        <div className="site-width">
          <h1>Ďakujeme</h1>
          <p>
            Budeme sa snažit odpovedať čo najskôr.{' '}
            <Link to={`/sk`}>&laquo; Naspäť na úvodnú stránku.</Link>
          </p>
        </div>
        <Footer data={homepage} menuItems={menuItems} menuType="top" />
      </div>
    )
  }
}

ThanksSk.PropTypes = {
  data: PropTypes.object.isRequired,
}

export default ThanksSk

export const thanksSkQuery = graphql`
  query ThanksSkQuery {
    allContentfulHomepage(filter: { node_locale: { eq: "sk" } }) {
      edges {
        node {
          id
          footerContacts {
            childMarkdownRemark {
              html
            }
          }
          footerSocialLinks {
            id
            text
            link
            type
          }
        }
      }
    }
    allContentfulMenu(filter: { node_locale: { eq: "sk" } }) {
      edges {
        node {
          id
          type
          node_locale
          items {
            ... on ContentfulPage {
              id
              link: slug
              text: title
              node_locale
            }
            ... on ContentfulBlog {
              id
              link: slug
              text: title
              node_locale
            }
            ... on ContentfulImageLink {
              id
              link
              text
              node_locale
            }
            ... on ContentfulTextLink {
              id
              link
              text
              node_locale
            }
          }
        }
      }
    }
  }
`
