import React from 'react';

const ProductCard = ({ title, amount, disAmount, currency, img, paymentHandler }) => {

    const getDiscountPercent = (amount, disAmount) => {
        const discount = (amount - disAmount) / amount * 100;
        return Math.round(discount);
    }

    return (
        <div className="card-grid-item">
            <img src={img} alt={title} />

            <div className="card-detail">
                <p className="textBig">{title}</p>
                <div className="flex center g5">
                    <div className={`${disAmount ? 'line-through textSmol' : 'text'}`}>{amount} {currency}</div>
                    {disAmount && <div className="flex start g5"><div className="text">{disAmount} {currency}</div><div className="discount"> Discount {getDiscountPercent(amount, disAmount)}%</div></div>}
                </div>
                <button onClick={() => paymentHandler(amount, currency)}>Buy now</button>
            </div>
        </div>
    )
};

export default ProductCard;