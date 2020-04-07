import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    CardImg,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart
} from "variables/charts.jsx";

class Players extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <form>
                        <InputGroup className="no-border">
                            <Input placeholder="Search for a player" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className="nc-icon nc-zoom-split" />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">LeBron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <a href="">View more info...</a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Michael Jordan</CardTitle>
                                    <p className="card-category">Chicago Bulls</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jordami01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <a href="">View more info...</a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Kobe Bryant</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/bryanko01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <a href="">View more info...</a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Stephen Curry</CardTitle>
                                    <p className="card-category">Golden State Warriors</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/curryst01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <a href="">View more info...</a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row>
                    <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">LeBron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history" /> Updated 3 minutes ago
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">LeBron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history" /> Updated 3 minutes ago
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">LeBron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history" /> Updated 3 minutes ago
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">LeBron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody className="text-center">
                                    <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history" /> Updated 3 minutes ago
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row> */}
                </div>
            </>
        );
    }
}

export default Players;
