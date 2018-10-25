import React from 'react'
import { FormattedMessage } from 'react-intl'

const ContactFormSection = props => {
  return (
    <div className="content site-width">
      <div className="form-box">
        {props.data && (
          <div>
            <h2>{props.data.contactSectionTitle}</h2>
            <span
              dangerouslySetInnerHTML={{
                __html: props.data.contactSectionText.childMarkdownRemark.html,
              }}
            />
          </div>
        )}
        <form
          id="contact"
          name="contact"
          method="POST"
          data-netlify="true"
          action={`/${props.lang}/thanks/`}
        >
          <label htmlFor="name">
            <FormattedMessage id="name" />
          </label>
          <FormattedMessage id="namePlaceholder">
            {text => (
              <input type="text" name="name" id="name" placeholder={text} />
            )}
          </FormattedMessage>

          <label htmlFor="email">
            <FormattedMessage id="email" />
          </label>
          <FormattedMessage id="emailPlaceholder">
            {text => (
              <input type="text" name="email" id="email" placeholder={text} />
            )}
          </FormattedMessage>

          <label htmlFor="message">
            <FormattedMessage id="message" />
          </label>
          <FormattedMessage id="messagePlaceholder">
            {text => <textarea name="message" id="text" placeholder={text} />}
          </FormattedMessage>

          <FormattedMessage id="send">
            {text => <input type="submit" value={text} />}
          </FormattedMessage>
        </form>
      </div>
    </div>
  )
}

export default ContactFormSection
