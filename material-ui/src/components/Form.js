import React from 'react'
// import { Button, Checkbox, Form, Divider } from 'semantic-ui-react'
import '../assets/css/form.css'

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
            <form method="GET" action="/admin/dashboard">
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