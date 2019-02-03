import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import InputWeight from './Input.jsx';
import axios from 'axios';
import TodoItem from './TodoItem';
import RankItem from './RankItem';
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
      ],
      rankings: [
        {
          rank:1,
          name:'Jason Tran',
          city:'Monrovia, CA',
          earnings:'$1,250'
        },
        {
          rank:2,
          name:'Stanley Lee',
          city:'San Gabriel, CA',
          earnings:'$985'
        },
        {
          rank:3,
          name:'Jeffrey Ha',
          city:'Rosemead, CA',
          earnings:'$800'
        },
        {
          rank:4,
          name:'Demetrius Ly',
          city:'Temple City, CA',
          earnings:'$600'
        },
        {
          rank:5,
          name:'Andrea Chu',
          city:'Arcadia, CA',
          earnings:'$560'
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
                  <h6 className="title d-inline">To-Do List</h6>
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
                  <CardTitle tag="h4">Leaderboard</CardTitle>
                </CardHeader>
                <CardBody>
                  <RankItem rankings={ this.state.rankings }/>
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
