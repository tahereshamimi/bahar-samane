import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Notes extends Component {
    state = {
        notes: [],
        note: '',
        importance: false,
        visibility: false,
        importanceButton: 'gray-button',
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


    // change color of importance button by clicking
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


    // submit inputing note
    onSubmit = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            notes: prevState.notes.concat(this.state.note),
        }));
    }


    // delete note by clicking on it
    deleteNote = (index) => {
        const notes = this.state.notes
        notes.splice(index, 1)
        this.setState({
            notes,
        })
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
            </div>
        );
    }
}


export { Notes }