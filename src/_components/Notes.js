import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Input } from './Input';

class Notes extends Component {
    state = {
        notes: ['first', 'second','third']
    }

    addNotes = (e) => {
        console.log('tata')
        // this.setState({ notes: prevState.push() });
        this.setState({ note: this.state.notes.push(e.target.value) })

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

                    <Input addNotes={this.addNotes}></Input>
                    <Row>
                        {noteItem}
                    </Row>
                </Container>

            </div>
        );
    }
}


export { Notes }