import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageBoxRow from '../components/ImageBoxRow'

class Page extends Component {
  render() {
    const {
      title,
      createdAt,
      body,
      featuredImage,
      submenu,
      secondSectionTitle,
      secondSectionText,
      secondSectionList,
    } = this.props.data.contentfulPage
    const homepage = this.props.data.allContentfulHomepage.edges[0].node
    const menuItems = this.props.data.allContentfulMenu.edges

    return (
      <div className="page-content">
        <Navigation
          lang={this.props.pathContext.langKey}
          menuItems={menuItems}
          menuType="top"
        />

        <div className="featured-image-box-full">
          <div className="site-width">
            <h1>{title}</h1>
          </div>
          <div className="img gradient">
            <Img sizes={featuredImage.sizes} />
          </div>
        </div>

        <div className="site-width">
          {submenu && (
            <div className="submenu">
              <ImageBoxRow boxes={submenu} />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
          />
        </div>

        {(secondSectionTitle || secondSectionText || secondSectionList) && (
          <div className="second-section">
            <div className="site-width">
              {secondSectionTitle && <h2>{secondSectionTitle}</h2>}
              {secondSectionText && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: secondSectionText.childMarkdownRemark.html,
                  }}
                />
              )}
              {secondSectionList && (
                <div className="submenu">
                  <ImageBoxRow boxes={secondSectionList} />
                </div>
              )}
            </div>
          </div>
        )}

        <Footer data={homepage} menuItems={menuItems} menuType="top" />
      </div>
    )
  }
}

Page.PropTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageQuery($slug: String!, $langKey: String!) {
    contentfulPage(slug: { eq: $slug }, node_locale: { eq: $langKey }) {
      title
      body {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        sizes(maxWidth: 5000) {
          ...GatsbyContentfulSizes
        }
      }
      node_locale
      submenu {
        ... on ContentfulImageLink {
          id
          text
          link
          image {
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes
            }
          }
          node_locale
        }
      }
      secondSectionTitle
      secondSectionText {
        childMarkdownRemark {
          html
        }
      }
      secondSectionList {
        ... on ContentfulImageLink {
          id
          text
          link
          image {
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes
            }
          }
          node_locale
        }
      }
    }
    allContentfulHomepage(filter: { node_locale: { eq: $langKey } }) {
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
    allContentfulMenu(filter: { node_locale: { eq: $langKey } }) {
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
            }
          }
        }
      }
    }
  }
`
