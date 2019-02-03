import React from 'react'
// import { Button, Checkbox, Form, Divider } from 'semantic-ui-react'
import '../stylesheets/form.css'
import $ from 'jquery'

const FormExampleForm = () => (
//   <Form>
//     <Form.Field>
//       <label>First Name</label>
//       <input placeholder='First Name' />
//     </Form.Field>
//     <Form.Field>
//       <label>Last Name</label>
//       <input placeholder='Last Name' />
//     </Form.Field>
//     <Form.Field>
//       <Checkbox label='I agree to the Terms and Conditions' />
//     </Form.Field>
//     <Button type='submit' className="blue">Submit</Button>
//   </Form>
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

            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script type="text/javascript">
                $(window).on('load', function() {
                    console.debug("TEST!");
                });
            </script>
        </div>
)

export default FormExampleForm