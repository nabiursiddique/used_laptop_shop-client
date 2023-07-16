import React from 'react';

const BookNowModal = ({bookProduct}) => {
    const { sellerName, sellerImage, email, productName, originalPrice, resalePrice, yearOfPurchase, category, condition, location, phoneNumber, productImage, productDescription, date, time } = bookProduct;
    return (
        <div>
            <input type="checkbox" id="book_now_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{sellerName}</h3>
                    <p className="py-4">{productName}</p>
                    <div className="modal-action">
                        <label htmlFor="book_now_modal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;