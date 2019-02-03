import React from 'react';
import {
    Button,
    Label,
    FormGroup,
    Input,
    UncontrolledTooltip,
    Table
  } from "reactstrap";

const TodoItem = (props) => {
    const todoList = props.todoList.map(todoItem => {
        return(
            <tr key={ todoItem.id }>
                <td>
                <FormGroup check>
                    <Label check>
                    <Input
                        defaultValue=""
                        type="checkbox"
                    />
                    <span className="form-check-sign">
                        <span className="check" />
                    </span>
                    </Label>
                </FormGroup>
                </td>
                <td>
                    <p className="title">{ todoItem.title }</p>
                </td>
                <td className="td-actions text-right">
                </td>
            </tr>
        );
    });
    return(
        <div className="todoItem">
            <Table>
                <tbody>
                    { todoList }
                </tbody>
            </Table>
        </div>
    )
}

export default TodoItem;