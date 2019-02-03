import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import InputWeight from './Input.jsx';
import axios from 'axios';
import TodoItem from './TodoItem';
import '../assets/css/dashboard.css';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1
  // chartExample1,
  // chartExample2,
  // chartExample3,
  // chartExample4
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      todoList: [
        {
          title:"Walk dog",
          id:1
        },
        {
          title:"Eat more vegetables",
          id:2
        },
        {
          title:"Go to the gym three times a week",
          id:3
        },
        {
          title:"Stop drinking energy drinks",
          id:4
        }
      ]
    };
  }
//   componentDidMount() {
//     axios.get(".port and route info")
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Your weight over time</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
              <Container className="inputWeight">
                <Row>
                  <Col xs="12">
                    <InputWeight />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Your partner's weight over time</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Tasks(5)</h6>
                  <p className="card-category d-inline"> today</p>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <TodoItem todoList={ this.state.todoList }/>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Rankings</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>City</th>
                        <th className="text-center">Meowcoin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Jason Tran</td>
                        <td>San Luis Obispo</td>
                        <td className="text-center">$1203</td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Stanley Lee</td>
                        <td>San Diego</td>
                        <td className="text-center">$700</td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Jeffrey Ha</td>
                        <td>La Jolla</td>
                        <td className="text-center">$699</td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>Alex Nicholas</td>
                        <td>Overland Park</td>
                        <td className="text-center">$512</td>
                      </tr>
                      <tr>
                        <td>6.</td>
                        <td>Joey Ly</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$410</td>
                      </tr>
                      <tr>
                        <td>7.</td>
                        <td>Amy Kim</td>
                        <td>Gloucester</td>
                        <td className="text-center">$405</td>
                      </tr>
                      <tr>
                        <td>8.</td>
                        <td>NguyenN Nguyen</td>
                        <td>Gloucester</td>
                        <td className="text-center">$200</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
