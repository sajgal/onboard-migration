import React from 'react'
import Link from 'gatsby-link'

const Footer = props => {
  const menu = props.menuItems.filter(item => item.node.type === props.menuType)
  const menuItems = menu[0].node.items

  const localeNavigation = menuItems.map(item => (
    <div key={item.id}>
      <Link to={`/${item.node_locale}/${item.link}/`}>
        {item.text}
      </Link>
    </div>
  ))

  const socialLinks = props.data.footerSocialLinks.map(item => (
    <div key={item.id}>
      <a href={item.link} target="__blank">
        <i
          className={`fa fa-${
            item.type === 'facebook' ? 'facebook-square' : item.type
          }`}
        />{' '}
        {item.text}
      </a>
    </div>
  ))

  return (
    <div className="footer">
      <div className="footer-content site-width">
        <div>
          <div className="logo">OnBoard</div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.data.footerContacts.childMarkdownRemark.html,
          }}
        />
        <div className="footer-menu">{localeNavigation}</div>
        <div>{socialLinks}</div>
      </div>
      <div className="footer-bottom site-width">
        <div>
          &copy; {new Date().getFullYear()} &middot; OnBoard Study{' '}
          <div className="created-by">
            Created by <a href="https://www.sajgal.com">sajgal.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
