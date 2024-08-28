import React from 'react';

const ProductCard = ({ title, amount, disPrice, currency, img, razorpayHandler }) => {

    const getDiscountPercent = (amount, disPrice) => {
        const discount = (amount - disPrice) / amount * 100;
        return Math.round(discount);
    }

    return (
        <div className="card-grid-item">
            <img src={img} alt={title} />

            <div className="card-detail">
                <p className="textBig">{title}</p>
                <div className="flex center g5">
                    <div className={`${disPrice ? 'line-through textSmol' : 'text'}`}>{amount} {currency}</div>
                    {disPrice && <div className="flex start g5"><div className="text">{disPrice} {currency}</div><div className="discount"> Discount {getDiscountPercent(amount, disPrice)}%</div></div>}
                </div>
                <button onClick={() => razorpayHandler(amount, currency)}>Buy now</button>
            </div>
        </div>
    )
};

export default ProductCard;