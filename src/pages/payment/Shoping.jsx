import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from './ProductCard';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Shoping = () => {

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const products = [
        {
            id: 1,
            title: 'Product 1',
            price: 5000,
            disPrice: 2500,
            currency: 'INR',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-.jpg',
        },
        {
            id: 2,
            title: 'Product 2',
            price: 5000,
            disPrice: null,
            currency: 'AUD',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-.jpg',
        },
        {
            id: 3,
            title: 'Product 3',
            price: 5000,
            disPrice: 2500,
            currency: 'USD',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-.jpg',
        },
    ];

    const razorpayHandler = async (amount, currency) => {

        const { data: { key } } = await axios.get(`${BASE_URL}/payment/getkey`);
        const { data: { order } } = await axios.post(`${BASE_URL}/payment/checkout`, { amount, currency },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const userId = order.notes.userId;

        const options = {
            key: key,
            amount: order.amount,
            currency: order.currency,
            name: `${user.firstName} ${user.lastName}`,
            description: "Test Transaction",
            image: user.image,
            order_id: order.id,
            callback_url: `${BASE_URL}/payment/payment-verification/${userId}`,
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: "9026075867"
            },
            notes: {
                address: "Test Address",
                role: user.role,
                country: user.country
            },
            theme: {
                color: "#00aaff"
            },
            modal: {
                escape: false,
                ondismiss: () => {
                    toast(<div className='flex center g5'> < NewReleasesIcon /> Payment failed</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                }
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Fragment>
            <Helmet>
                <title>Shop Page | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/shoping" />
            </Helmet>
            <div className='page'>
                <Link to='/order' className="textBig">See Orders</Link>
                <div className="card-perfect-grid">
                    {products && products.length === 0 && <p className="text">There are no products yet.</p>}
                    {products && products.length > 0 && products.map((item) => (
                        <ProductCard key={item.id} title={item.title} amount={item.price} disPrice={item.disPrice} currency={item.currency} img={item.img} razorpayHandler={razorpayHandler} />
                    ))}
                </div>
            </div>
        </Fragment>
    )
};

export default Shoping;