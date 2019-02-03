import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import InputWeight from './Input.jsx';
import Coin from './Coin.jsx';
import '../assets/css/dashboard.css';
import $ from 'jquery';

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
//import {
  //chartExample1
  // chartExample1,
  // chartExample2,
  // chartExample3,
  // chartExample4
//} from "variables/charts.jsx";

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

let chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bigChartData: "data1",
      points: null,
      points1: null
    };

    this.setBgChartData = this.setBgChartData.bind(true);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    let mainUser = getCookie("session");
    const setState = this.setState.bind(this);
    
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
          
          if (result.success) {
            let data = result.data;
            if (data.user != null && data.supporter != null) {
              let x1 = [];
              let y1 = [];
  
              let x2 = [];
              let y2 = [];
  
              let count = 0;
              for (let i = 0; i < data.user.weightData.length; i++) {
                let item = data.user.weightData[i];

                x1.push(item.date);
                y1.push(item.weight);
                count++;
              }
              
              if (count > 12) {
                let lastIndex = x1.length - 1;
                let startIndex = lastIndex - 12;
                if (startIndex < 0) { startIndex = 0; }
  
                x1.slice(startIndex, lastIndex);
                y1.slice(startIndex, lastIndex);
              }
  
              count = 0;
              for (let i = 0; i < data.supporter.weightData.length; i++) {
                let item = data.supporter.weightData[i];

                x2.push(item.date);
                y2.push(item.weight);
                count++;
              }

              if (count > 12) {
                let lastIndex = x2.length - 1;
                let startIndex = lastIndex - 12;
                if (startIndex < 0) { startIndex = 0; }
  
                x2.slice(startIndex, lastIndex);
                y2.slice(startIndex, lastIndex);
              }
  
              let ctx = document.createElement("canvas").getContext("2d");
              let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
              gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
              gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
              gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
              
              setState({
                points: {
                  labels: x1,
                  datasets: [
                    {
                      label: "Weight",
                      fill: true,
                      backgroundColor: gradientStroke,
                      borderColor: "#1f8ef1",
                      borderWidth: 2,
                      borderDash: [],
                      borderDashOffset: 0.0,
                      pointBackgroundColor: "#1f8ef1",
                      pointBorderColor: "rgba(255,255,255,0)",
                      pointHoverBackgroundColor: "#1f8ef1",
                      pointBorderWidth: 20,
                      pointHoverRadius: 4,
                      pointHoverBorderWidth: 15,
                      pointRadius: 4,
                      data: y1
                    }
                  ]
                },

                points1: {
                  labels: x2,
                  datasets: [
                    {
                      label: "Weight",
                      fill: true,
                      backgroundColor: gradientStroke,
                      borderColor: "#1f8ef1",
                      borderWidth: 2,
                      borderDash: [],
                      borderDashOffset: 0.0,
                      pointBackgroundColor: "#1f8ef1",
                      pointBorderColor: "rgba(255,255,255,0)",
                      pointHoverBackgroundColor: "#1f8ef1",
                      pointBorderWidth: 20,
                      pointHoverRadius: 4,
                      pointHoverBorderWidth: 15,
                      pointRadius: 4,
                      data: y2
                    }
                  ]
                }
              });

              
            }
        } else {
            alert(result.message);
        }
        }
      });
    }
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  loadData = canvas => {
  };



  render() {

    return (
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
                    <Col sm="6">
                      {/* <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.points}
                      options={chartOptions}
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
                    <Col sm="6">
                      {/* <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.points1}
                      options={chartOptions}
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
                  <h6 className="title d-inline">Checkpoints</h6>
                  <p className="card-category d-inline"> this year</p>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" disabled type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Lose weight</p>
                            <p className="text-muted">
                            Lose weight
                            </p>
                          </td>
                          {/* <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip636901683"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td> */}
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultValue=""
                                  disabled
                                  type="checkbox"
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Lose weight</p>
                            <p className="text-muted">
                            Lose weight
                            </p>
                          </td>
                          {/* <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip457194718"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td> */}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Coin />
            </Col>
          </Row>
        </div>
    );
  }
}

export default Dashboard;