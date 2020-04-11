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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// awards = ['MVP', 'All-NBA', 'NBA Champ', 'All Star', 'All-Defensive',
//               'Scoring Champ', 'BLK Champ', 'AST Champ', 'TRB Champ', 'STL Champ']

const SearchQuery = gql`
query CareerStats($_id: ID!) {
  getCertainPlayer(_id: $_id) {
    id
    Name
    PTS
    TRB
    AST
    Position
    PER
    WS
    imgFile
    MVP
    AllNBA
    NBAChamp
    AS
    AllDefensive
    ScoringChamp
    BLKChamp
    ASTChamp
    TRBChamp
    STLChamp
    ROY
    DefPOY
    MostImproved
    College
    Weight
    Height
    birthDate
    Target
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


    generateAwards(playerInfo) {
        const awardIndex = ['MVP', 'NBAChamp', 'AS', 'AllDefensive', 'ScoringChamp', 'BLKChamp', 'ASTChamp', 'TRBChamp', 'STLChamp', 'ROY', 'DefPOY', 'MostImproved'];
        const awardCategories = ['MVP', 'NBA Champ', 'All Star', 'All Defensive', 'Scoring Champ', 'BLK Champ', 'AST Champ', 'TRB Champ', 'STL Champ', 'Rooke of the Year', 'DPOY', 'Most Improved'];
        const awards = awardIndex.map(x => playerInfo[x]);
        const awardsArr = [];
        const result = awards.reduce(function (result, field, index) {
            result[awardCategories[index]] = field;
            return result;
        }, {});
        for (const key in result) {
            if (result[key] === undefined || result[key] === null) {
                delete result[key];
            }
            else {
                awardsArr.push(`${result[key]}x ${key}`);
            }
        }
        return awardsArr;
    }

    render() {
        return (

            <div className="content">
                <Query query={SearchQuery} skip={this.state.id === ""} variables={{ _id: this.state.id }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        const playerInfo = data.getCertainPlayer[0];
                        const awards = this.generateAwards(playerInfo);
                        console.log(playerInfo);
                        const img = require(`assets/img/${playerInfo.imgFile}`);
                        return (
                            <Row>
                                <Col xs="12">
                                    <Card className="card-stats">
                                        <CardHeader>
                                            <CardTitle tag="h5">{playerInfo.Name}</CardTitle>

                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <img src={img} style={{ marginLeft: '30px' }} alt="Card image cap" />
                                                </Col>
                                                <Col style={{ margin: "auto" }}>
                                                    <div className="numbers" style={{ textAlign: "center" }}>
                                                        <p className="card-category">Position</p>
                                                        <CardTitle tag="p">{playerInfo.Position}</CardTitle>
                                                        <p />
                                                    </div>
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
                                    <br />
                                </Col>
                                <Col xs="12" sm="4">
                                    <Card className="card-stats">
                                        <CardHeader>
                                            <CardTitle style={{ textDecoration: "underline" }} tag="h5">Player Info</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <ul style={{ listStyleType: "none", marginTop: "-10px" }}>
                                                    <h5><li style={{ marginLeft: '-20px' }}><b>Height: </b>{playerInfo.Height}</li></h5>
                                                    <h5><li style={{ marginLeft: '-20px' }}><b>Weight: </b>{playerInfo.Weight}lb</li></h5>
                                                    <h5><li style={{ marginLeft: '-20px' }}><b>Birth Date: </b>{playerInfo.birthDate}</li></h5>
                                                    <h5><li style={{ marginLeft: '-20px' }}><b>College: </b>{playerInfo.College}</li></h5>
                                                </ul>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" sm="4">
                                    <Card className="card-stats">
                                        <CardHeader>
                                            <CardTitle style={{ textDecoration: "underline" }} tag="h5">Awards</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <ul style={{ listStyleType: "none", marginTop: "-10px" }}>
                                                    {
                                                        awards.map((item) => {
                                                            return <h5><li style={{ marginLeft: '-20px' }}>{item}</li></h5>
                                                        })
                                                    }
                                                </ul>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" sm="4">
                                    <Card className="card-stats">
                                        <CardHeader>
                                            <CardTitle style={{ textDecoration: "underline" }} tag="h5">Career Evaluation</CardTitle>
                                        </CardHeader>
                                        <CardBody className="text-center">
                                           
                                                <h2><b>{playerInfo.Target}</b></h2>
                                            

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default Player;
