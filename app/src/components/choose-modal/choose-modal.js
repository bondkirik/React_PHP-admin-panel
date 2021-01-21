import React from 'react';
import {Button, Modal, ListGroup} from "react-bootstrap";

const ChooseModal = ({show, onHide, data, redirect}) => {

    const list = data.map(item => {
        if (item.time){
            return(
                <ListGroup.Item key={item.file}>
                    <a
                        href="#"
                        onClick={(e) => redirect(e, item.file, onHide())}
                    >Backup from {item.time}</a>
                </ListGroup.Item>
            )
        }else {
            return(
                <ListGroup.Item key={item}>
                    <a
                        href="#"
                        onClick={(e) => redirect(e,item,onHide())}
                    >{item}</a>
                </ListGroup.Item>
            )
        }
    })

    let msg;
    if (data.length < 1){
        msg = <div>Not found backup copy</div>
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {msg}
                <ListGroup>
                    {list}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )

};

export default ChooseModal;