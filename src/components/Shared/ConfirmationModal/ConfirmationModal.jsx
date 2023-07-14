import React from 'react';

const ConfirmationModal = ({title, message, closeModal, cancelButtonName, successButtonName, deleteFunction, deletingInfo}) => {
    return (
        <div>
        <input type="checkbox" id="confirmation_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <label onClick={closeModal} className="btn">{cancelButtonName}</label>
                    <label onClick={()=>deleteFunction(deletingInfo)} htmlFor="confirmation_modal" className="btn  bg-red-400 text-white hover:bg-red-500">{successButtonName}</label>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ConfirmationModal;