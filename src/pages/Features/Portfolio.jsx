import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';


const Portfolio = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Portfolio | MarketPlace</title>
        <meta name="description" content="My Resume"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/portfolio" />
      </Helmet>

      <div className='page flex center'>
        Portfolio
      </div>
    </Fragment>
  )
};

export default Portfolio;