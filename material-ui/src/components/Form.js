import React from 'react'
// import { Button, Checkbox, Form, Divider } from 'semantic-ui-react'
import '../assets/css/form.css'
import $ from 'jquery'

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        let username = this.state.username;
        if (this.state.username.length > 0 && this.state.pass.length > 0) {
            $.ajax({
                url: "http://localhost:7000/api/user/" + username,
                type: "POST",
                data: {
                    action: "getInfo"
                },
                dataType: "json",
                success: function(result) {
                    // alert(result.success);
                    if (result.success) {
                        setCookie("session", username, 7);
                        window.location = './admin/dashboard';
                    } else {
                        alert(result.message);
                    }
                }
            });
        } else {
            alert("Please input your username and password!");
        }
        
    }

    render() {
        return (
        <div className = "form">
            
                <div className="input-container">
                    <input type="text" id="usr" placeholder="Username" name="name" onChange={(e) => this.state.username = e.target.value}/>
                    <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                </div>
                
                <div className="input-container">
                    <input type="password" id="pw" placeholder="Password" name="password" onChange={(e) => this.state.pass = e.target.value}/>
                    <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                </div>

                <button type="submit" id="login" onClick={this.handleLogin}>Log In</button>
            
        </div>)
    }
}

export default LoginForm