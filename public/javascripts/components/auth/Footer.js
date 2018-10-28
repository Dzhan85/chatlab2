import React from 'react'
import Link from './Link'

const Footer = ({ text, url, linkText }) => (

    <div className="auth-footer">
        <Link text={text}
              url={url}
              linkText={linkText}/>

        <Link text="Or go"
              url="/"
              linkText="Home"/>
    </div>
)

export default Footer