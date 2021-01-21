import React from "react";
import {Button} from "react-bootstrap";

const Panel = ({listShow, saveShow, backupShow}) => {
    return (
        <div className="panel">

            <Button className="nav_btn" variant="secondary"
                    onClick={listShow} >
                Open
            </Button>

            <Button className="nav_btn" variant="primary"
                    onClick={saveShow} >
                Publish
            </Button>

            <Button className="nav_btn" variant="dark"
                    onClick={backupShow} >
                Backup
            </Button>
        </div>
    )
};

export default Panel;