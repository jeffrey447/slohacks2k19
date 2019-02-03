import React from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import {
    Container,
    Row,
    Col
  } from "reactstrap";

const InputWeight = () => (
  <form method="POST" action="">
    <Container>
        <Row>
            <Col xs="10">
                <Input
                label={{ basic: true}}
                labelPosition='right'
                placeholder='Enter weight in lbs'
                name="weight"
                />
            </Col>
            <Col xs="2">
                <Button primary>Submit</Button>
            </Col>
        </Row>
    </Container>
  </form>
)

export default InputWeight;