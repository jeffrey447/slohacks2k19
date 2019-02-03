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
    componentDidMount() {
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
                    alert(result.success);
                    if (result.success && result.data != null) {
                        let data = result.data;

                        $("#coin").val(data.coins.toString() + " Coins");
                        $("#mult").val("x" + data.multiplier.toString() + " multiplier");
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
                <Card.Meta id="mult">x1.0 multiplier</Card.Meta>
                <Card.Description>
                    <h1 id="coin">500 Coins</h1>
                    <hr></hr>
                    Current reward upon completion.
                </Card.Description>
            </Card>
        )
    }
}

export default Coin;