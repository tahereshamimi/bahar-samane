import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class Notes extends Component {
    state = {
        notes: [],
        note: '',
        importance: false,
        visibility: false,
        importanceButton: 'gray-button',
        modal: false,
        confirmDelete: false
    }

    changeImportance = () => {
        this.setState({ importance: !this.state.importance });
        if (this.state.importance === true) {
            this.setState({ importanceButton: 'gray-button' });
        }
        else {
            this.setState({ importanceButton: 'red-button' });
        }
    }

    // in this part typed note are added to state, and save buttun visibility is checked
    addNote = (e) => {
        if (e.target.value === '') {
            this.setState({ visibility: false });
        }
        else {
            this.setState({ visibility: true })
        }
        this.setState({
            note: e.target.value,
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            notes: prevState.notes.concat(this.state.note),
        }));
    }


    deleteNote = (index) => {
        if (this.state.confirmDelete) {
            const notes = this.state.notes
            notes.splice(index, 1)
            this.setState({
                notes,
                confirmDelete: false,
                modal:false
            })
        }
        else{
            this.toggleModal()
        }
    }


    confirmDelete = () => {
        this.setState(() => ({
            confirmDelete: true
        })).then(this.deleteNote())
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            modal:!prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center' >
                        <form onSubmit={this.onSubmit} className='input-card p-3'>
                            <div>
                                <span className={this.state.importanceButton}
                                    onClick={this.changeImportance}>{this.state.importance ? 'urgent' : 'normal'}
                                </span>
                            </div>
                            <div>
                                <textarea className='textarea mt-3' name='note' placeholder="enter note" onKeyUp={this.addNote} ></textarea>
                            </div>
                            <div>
                                {this.state.visibility ? <button type='submit' className='save-button'>save</button> : null}
                            </div>
                        </form>
                    </Row>

                    <Row>
                        {this.state.notes.map((note, index) => (
                            <Col md='6'>
                                <div key={Date.now} className="card-style position-relative shadow" onClick={event => this.deleteNote(index, event)}>
                                    {note}
                                    {this.state.importance ? <span className="position-absolute star ">*</span> : null}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Modal isOpen={this.state.modal} toggleModal={this.toggleModal} className="">
                    <ModalHeader toggleModal={this.toggleModal}>Delete Note!!!</ModalHeader>
                    <ModalBody>
                        Are you sure ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.confirmDelete}>Delete</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


export { Notes }