import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <div className='page flex center'>
        cart
      </div>
    </Fragment>
  )
};

export default Cart;