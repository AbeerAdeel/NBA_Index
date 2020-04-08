import React from "react";
import _ from 'lodash'
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withRouter } from "react-router-dom";
import {AutoComplete} from "material-ui";


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
// core components



class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: ['Lebron James', 'Pascal Siakim', 'Kobe Bryant'],
            value: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(value){
        const path = `players/${value}`;
        this.props.history.push('source');
    }

    render() {
        return (
            <>
                <div className="content">
                    <MuiThemeProvider>
                        <SearchBar
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={this.state.dataSource}
                            onChange={(value) => this.setState({ value: value })}
                            onRequestSearch={() => this.handleSubmit(this.state.value)}
                            style={{
                                margin: '0',
                                maxWidth: 1200
                            }}
                            placeholder="Search for a player..."
                        />
                    </MuiThemeProvider>
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
                </div>
            </>
        );
    }
}

export default withRouter(Dashboard);
