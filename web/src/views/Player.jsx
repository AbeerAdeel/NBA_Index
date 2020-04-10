import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";

import Spinner from 'react-bootstrap/Spinner';

const SearchQuery = gql`
query Player($_id: ID!) {
  getCertainPlayer(_id: $_id) {
    id
    Name
    PTS
    TRB
    AST
    Position
    Target
    PER
    WS
    FG
    imgFile
  }
}
`;

class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            id: "",
        }
    }

    componentWillMount() {
        const path = window.location.pathname;
        const splitPath = path.split("/");
        this.setState({ id: splitPath[3] });
    }


    render() {
        console.log(this.state.id);
        return (
            <>
                <div className="content">
                    <Query query={SearchQuery} skip={this.state.id === ""} variables={{ _id: this.state.id }}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            }
                            const playerInfo = data.getCertainPlayer[0];
                            console.log(playerInfo);
                            const img = require(`assets/img/${playerInfo.imgFile}`);
                            return (
                                <Row>
                                    <Col xs="12">
                                        <Card className="card-stats">
                                            <CardHeader>
                                                <CardTitle tag="h5">{playerInfo.Name}</CardTitle>
                                                <p className="card-category">Career Stats</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col>
                                                        <img src={img} style={{ marginLeft: '30px' }} alt="Card image cap" />
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <div className="numbers" style={{ textAlign: "center" }}>
                                                            <p className="card-category">PPG</p>
                                                            <CardTitle tag="p">{playerInfo.PTS}</CardTitle>
                                                            <p />
                                                        </div>
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <div className="numbers" style={{ textAlign: "center" }}>
                                                            <p className="card-category">RPG</p>
                                                            <CardTitle tag="p">{playerInfo.TRB}</CardTitle>
                                                            <p />
                                                        </div>
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <div className="numbers" style={{ textAlign: "center" }}>
                                                            <p className="card-category">APG</p>
                                                            <CardTitle tag="p">{playerInfo.AST}</CardTitle>
                                                            <p />
                                                        </div>
                                                    </Col>

                                                    <Col style={{ margin: "auto" }}>
                                                        <div className="numbers" style={{ textAlign: "center" }}>
                                                            <p className="card-category">PER</p>
                                                            <CardTitle tag="p">{playerInfo.PER}</CardTitle>
                                                            <p />
                                                        </div>
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <div className="numbers" style={{ textAlign: "center" }}>
                                                            <p className="card-category">WS</p>
                                                            <CardTitle tag="p">{playerInfo.WS}</CardTitle>
                                                            <p />
                                                        </div>
                                                    </Col>
                                                </Row>





                                            </CardBody>
                                            <br />
                                            <br />
                                        </Card>
                                    </Col>
                                </Row>
                            )
                        }}
                    </Query>

                </div>
            </>
        );
    }
}

export default Player;
