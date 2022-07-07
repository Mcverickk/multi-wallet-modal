import React from "react";

const Modal = props => {

    if (!props.show[0]) {
        return null
    }
    else if (props.show[1]) {
        return <h4>Wallet is connected!</h4>
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Choose a wallet to connect!</h4>
                </div>
                <div className="modal-body">
                    <button className="connect-MM" onClick={props.connectMM}>Connect MetaMask</button>
                    <button className="connect-CB" onClick={props.connectCB}>Connect Coinbase</button>
                </div>
                <div className="modal-footer">
                    <button className="footer-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}


//
export default Modal;