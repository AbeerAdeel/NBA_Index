import React from "react";
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from "components/Search/Search";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(id, name, position, targets, PER) {
        this.props.setPlayer({ id, name, position, targets, PER });
        this.props.history.push('player');
    }

    render() {
        return (
            <div className="content">
                <Search />
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
                                    <a href="javascript:void(0)" onClick={() => this.handleOnClick("5e9a51d6332e4992bcc3956c", "LeBron James", "SF", ["Once in a Generation", "All Time Great"], 27.5)}>View more info...</a>
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
                                    <a href="javascript:void(0)" onClick={() => this.handleOnClick("5e9a4680332e4992bcc38495", "Michael Jordan", "SG", ["Once in a Generation", "All Time Great"], 27.9)}>View more info...</a>
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
                                    <a href="javascript:void(0)" onClick={() => this.handleOnClick("5e9a4680332e4992bcc38483", "Kobe Bryant", "SG", ["Once in a Generation", "All Time Great"], 22.9)}>View more info...</a>
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
                                    <a href="javascript:void(0)" onClick={() => this.handleOnClick("5e9a51d6332e4992bcc3954b", "Stephen Curry", "PG", ["All Time Great"], 23.8)}>View more info...</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
}

Dashboard.propTypes = {
    setPlayer: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Dashboard);

