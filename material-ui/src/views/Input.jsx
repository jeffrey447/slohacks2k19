import React from 'react'
import { Input, Button, Form } from 'semantic-ui-react'
import {
    Container,
    Row,
    Col
  } from "reactstrap";
import $ from 'jquery'

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c
         = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

let username = getCookie("session");
if (username == null && window.location != "http://localhost:3000/") {
    alert("Not logged in.");
    window.location = '/';
}

class InputWeight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: ""
        };

        this.handleUpdateWeight = this.handleUpdateWeight.bind(this);
    }

    handleUpdateWeight() {
        let weightS = this.state.weight.trim();
        if (weightS.trim().length > 0) {
            if (isNaN(weightS) == false) {
                $.ajax({
                    url: "http://localhost:7000/api/user/" + username + "?weight=" + weightS,
                    type: "POST",
                    data: {
                        action: "addWeight"
                    },
                    dataType: "json",
                    success: function(result) {
                        if (result.success) {
                            let weight = parseInt(weightS);
                            let updateM = false;
                            let mult = 0;
                            let coins = 0;
                            
                            if (weight > 200 && weight <= 250) {
                                mult = 1.5;
                                coins += 750;
                                updateM = true;
                            }
                            
                            if (weight <= 200 && updateM == false) {
                                mult = 2.25;
                                coins += 1150;
                                updateM = true;
                            }
                            
                            if (updateM) {
                                $.ajax({
                                    url: "http://localhost:7000/api/user/" + username + "?key=coins&val=" + coins,
                                    type: "POST",
                                    data: {
                                        action: "update"
                                    },
                                    dataType: "json",
                                    success: function(result) {
                                        $.ajax({
                                            url: "http://localhost:7000/api/user/" + username + "?key=multiplier&val=" + mult,
                                            type: "POST",
                                            data: {
                                                action: "update"
                                            },
                                            dataType: "json",
                                            success: function(result) {
                                                // refresh the page, dab
                                                window.location.href = window.location.pathname + window.location.search + window.location.hash;
                                            }
                                        });
                                    }
                                });
                            } else {
                                // refresh the page, dab
                                window.location.href = window.location.pathname + window.location.search + window.location.hash;
                            }
                        } else {
                            alert(result.message);
                        }
                    }
                });
            }
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="10">
                        <Input
                        label={{ basic: true}}
                        labelPosition='right'
                        placeholder='Enter weight in lbs'
                        name="weight"
                        onChange={(e) => this.state.weight = e.target.value}
                        />
                    </Col>
                    <Col xs="2">
                        <Button primary id="submitWeight" onClick={this.handleUpdateWeight}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default InputWeight;