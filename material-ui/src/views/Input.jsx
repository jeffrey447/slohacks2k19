import React from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import {
    Container,
    Row,
    Col
  } from "reactstrap";

const InputWeight = () => (
  <form>
    <Container>
        <Row>
            <Col xs="9">
                <Input
                label={{ basic: true}}
                labelPosition='right'
                placeholder='Enter weight in lbs'
                />
            </Col>
            <Col xs="3">
                <Button primary>Submit</Button>
            </Col>
        </Row>
    </Container>
  </form>
)

export default InputWeight;