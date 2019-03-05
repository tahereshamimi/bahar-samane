import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { Input } from './Input';

class Notes extends Component {
    state = {
        notes: [],
        note: '',
        importance: false,
        visibility: false,
        importanceButton:'gray-button'
    }

    changeImportance = () => {
        this.setState({ importance: !this.state.importance });
        if (this.state.importance===true) {
            this.setState({ importanceButton:'gray-button' });
        }
        else{
            this.setState({ importanceButton:'red-button' });
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
            note: e.target.value
        })
        
    }

    

    onSubmit = (e) => {
        console.log('tata')
        this.setState((prevState) => ({
            notes:prevState.notes.push(this.state.note)
        }));
        console.log(this.state.notes)

        e.preventDefault();

    }

    render() {
        const notes = this.state.notes;
        
        const noteItem = notes.map((note) =>
            <Col  md='6' key={note.toString()}>
                <div className="card-style">
                {note}
                </div>
            </Col>
        );
        return (
            <div>
                <Container>

                    {/* <Input addNotes={this.addNotes}></Input> */}
                    <Row className='justify-content-center' >
            
                    <form onSubmit={this.onSubmit} className='input-card p-3'>
                        <div>
                            <span className={this.state.importanceButton}
                                onClick={this.changeImportance}>{this.state.importance ? 'urgent' : 'normal'}
                            </span>
                        </div>
                        <div>
                            <textarea className='textarea mt-3' name='note' placeholder="enter note" onChange={this.addNote} ></textarea>
                        </div>
                        <div>
                            {/* {this.state.visibility ? <button type='submit' className='save-button' onClick={this.addNotes}>save</button> : null} */}
                            {this.state.visibility ? <button type='submit' className='save-button'>save</button> : null}
                        </div>
                    </form>
                    </Row>

                    <Row>
                        {noteItem}
                    </Row>
                </Container>

            </div>
        );
    }
}


export { Notes }