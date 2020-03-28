import React, { Fragment, Component } from 'react'
import { Modal , Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
export default class List extends Component {
    state = {
        show:false,
        idToRemove:null
    }

    removeSegments = () => {
        if(this.state.idToRemove) {
            this.props.handleRemoveSegments(this.state.idToRemove)
            this.setState({
                show:false
            })
        }
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow(id) {
        this.setState({
            show:true,
            idToRemove: id
        })
    }
    render() {
        const list = this.props.segmentsList.map(doc => {
            return ( <ListGroup.Item as="li" key={doc.id}> {doc.name.name}
                <FontAwesomeIcon size="xs" icon={faTrashAlt} onClick={() => this.handleShow(doc.id)}
                style={{float:'right', cursor:'pointer'}}/>
                </ListGroup.Item>
                )
        })
        return (
            <Fragment>
                { list != '' ? list : 'No size at this moment' }
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Size</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.handleClose }><FontAwesomeIcon icon={faTimes}/> Cancel</Button>
                        <Button variant="primary" onClick={ this.removeSegments }><FontAwesomeIcon icon={faTrash}/> Remove</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}
