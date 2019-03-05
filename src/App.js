import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { Header, Notes } from './_components';

class App extends Component {

  render() {
    return (
      <div >
        <Container>
          <Row>
            <Col>
              <Header></Header>
            </Col>
          </Row>
          <Row>
            <Col>
              <Notes ></Notes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App


