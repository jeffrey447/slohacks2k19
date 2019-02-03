import React from 'react'
import { Card } from 'semantic-ui-react'
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

class Coin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coins: 0,
            mult: 0
        };
    }

    componentDidMount() {
        const setState = this.setState.bind(this);
        let mainUser = getCookie("session");
        if (mainUser != null) {
            $.ajax({
                url: "http://localhost:7000/api/user/" + mainUser,
                type: "POST",
                data: {
                    action: "getInfo"
                },
                dataType: "text",
                success: function(jsonData) {
                    let result = $.parseJSON(jsonData);
                    
                    if (result.success && result.data != null) {
                        let data = result.data.user;
                        
                        setState({
                            coins: data.coins,
                            mult: data.multiplier
                        });
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    };

    render() {
        return (
            <Card className="container">
                <Card.Meta id="mult">x{this.state.mult} multiplier</Card.Meta>
                <Card.Description>
                    <h1 id="coin">{this.state.coins} Coin(s)</h1>
                    <hr></hr>
                    Current reward upon completion.
                </Card.Description>
            </Card>
        )
    }
}

export default Coin;