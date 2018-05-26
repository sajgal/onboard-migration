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
          <div className="contentful">
            <a
              href="https://www.contentful.com/"
              rel="nofollow"
              target="_blank"
            >
              <img
                src="https://images.contentful.com/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg"
                style={{ maxWidth: '100px', width: '100%' }}
                alt="Powered by Contentful"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
