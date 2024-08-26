import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../slices/cartOrderSlice';


const Order = () => {

    const dispatch = useDispatch();
    const { orders, loading, error, orderStatus } = useSelector((state) => state.cartorder);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <Fragment>
            <Helmet>
                <title>Order Page</title>
            </Helmet>
            <div className='page flexcol g20 wh'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {orderStatus && orders.length > 0 ? 
                ( orders.map((order) => (
                        <div key={order.razorpay_order_id} className='flex center-start g20 outline2'>
                            <p>Order ID: {order.razorpay_order_id}</p>
                            <p>Payment ID: {order.razorpay_payment_id}</p>
                            <button>See order details</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </Fragment>
    )
};

export default Order;