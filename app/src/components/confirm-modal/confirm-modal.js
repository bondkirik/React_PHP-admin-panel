import React from "react";
import {Button, Modal} from "react-bootstrap";



const ConfirmModal = ({show, onHide , method ,alertShow}) =>{

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Publish changes</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary"

                    onClick={() => method(() => {
                        onHide();
                        alertShow();
                    })}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        // <div id={target} data-uk-modal={modal.toString()}>
        //     <div className="uk-modal-dialog uk-modal-body">
        //         <h2 className="uk-modal-title">Save</h2>
        //         <p>Are you sure want save?</p>
        //         <p className="uk-text-right">
        //             <button
        //                 className="uk-button uk-button-default uk-modal-close" type="button">Cancel
        //             </button>
        //             <button
        //                 className="uk-button uk-button-primary uk-modal-close"
        //                 type="button"
        //                 onClick={() => method(() => {
        //                         UIkit.notification({message: 'Success saved', status: 'success'})
        //                     },
        //                     () => {
        //                         UIkit.notification({message: 'Error save', status: 'danger'})
        //                     })}
        //
        //             >Save
        //             </button>
        //         </p>
        //     </div>
        // </div>
    )
};

export default ConfirmModal;