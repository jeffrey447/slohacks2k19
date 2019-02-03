import React from 'react'
// import { Button, Checkbox, Form, Divider } from 'semantic-ui-react'
import '../stylesheets/form.css'
import $ from 'jquery'

const FormExampleForm = () => (
        <div className = "form">
            <form method="GET" action="/user">
                <div className="input-container">
                    <input type="text" placeholder="Username" name="name"/>
                    <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" name="password"/>
                    <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
)

export default FormExampleForm