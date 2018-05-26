import React from 'react'
import Link from 'gatsby-link'
import { FormattedMessage } from 'react-intl'

const HeaderTop = props => {
  const links = props.langs.map(
    lang =>
      lang.selected ? (
        <span className="not-selected" key={lang.langKey}>
          <FormattedMessage id={`lang_name_${lang.langKey}`} />
        </span>
      ) : (
        <Link
          to={`/${lang.langKey}`}
          key={lang.langKey}
          className={`${lang.selected ? 'selected' : ''}`}
        >
          <FormattedMessage id={`lang_name_${lang.langKey}`} />
        </Link>
      )
  )

  return (
    <div className="header-top">
      <div className="header-language site-width">
        <i className="fa fa-globe" /> {links}
        {/* <i className="fa fa-globe" /> Slovenčina (SK)
        <i className="fa fa-angle-down" /> */}
      </div>
    </div>
  )
}

export default HeaderTop
