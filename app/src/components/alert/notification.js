import React from "react";
import {Toast} from "react-bootstrap";



const Notification = ({show, onHide}) => {

        return (
            <>
                <Toast  onClose={() => onHide()} show={show} delay={2000} autohide >
                    <Toast.Header  >
                        <strong className="mr-auto">SUCCESS SAVE</strong>
                    </Toast.Header>
                </Toast>
            </>
        );


};

export default Notification;