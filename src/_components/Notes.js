import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import uuidv1 from  'uuid/v1';
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

    // save notes to local storage
    componentDidMount() {
        const json = localStorage.getItem('notes');
        const notes = JSON.parse(json);
        if (notes) {
          this.setState(() => ({ notes }));
        }
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.notes.length !== this.state.notes.length) {
        const json = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', json);
      }
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
            this.togglemodal()
        }
    }


    confirmDelete = () => {
        this.setState(() => ({
            confirmDelete: true
        })).then(console.log('hello'))
    }

    togglemodal = () => {
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
                            <Col md='6' key={uuidv1()} >
                                <div className="card-style position-relative shadow" onClick={event => this.deleteNote(index, event)}>
                                    {note}
                                    {this.state.importance ? <span className="position-absolute star ">*</span> : null}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Modal isOpen={this.state.modal} togglemodal={this.togglemodal} className="">
                    <ModalHeader togglemodal={this.togglemodal}>Delete Note!!!</ModalHeader>
                    <ModalBody>
                        Are you sure ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.confirmDelete}>Delete</Button>
                        <Button color="secondary" onClick={this.togglemodal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


export { Notes }