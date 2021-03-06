import React from "react"
import { Link } from "gatsby"

import Layout from "../components/shared/layout"
import Seo from "../components/shared/seo"

const Success = () => {
  return (
    <Layout>
      <Seo title='Unrealistic - Success'/>
      <div className='container'>
        <div className='content has-text-centered'>
            <p>
                Thanks for submitting your form! We'll get back to you in the next 72 hours.<br/>Return to <Link to='/'>Home</Link>.
            </p>
        </div>
      </div>
    </Layout>
  )
}

export default Success;
