import React from "react";
// react plugin used to create charts
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
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

    getToolTipText(target) {
        if (target === 'Once in a Generation') {
            return "This player is part of the mount rushmore of NBA history. When you think of the greatest to ever play, this player comes up more than often.";
        }
        else if (target === 'All Time Great') {
            return "This player is one of the best at its position and currently is or a potential Hall of Famer.";
        }
        else if (target === 'All Star') {
            return "This player is consistently an All Star or a potential All Star through out his career.";
        }
        else if (target === 'Quality Starter') {
            return "This player is consitenlty a productive starter through his career."
        }
        else if (target === 'Role Player') {
            return "This player is a solid contributer to his team throughout his career.";
        }
        else if (target === 'Bench Player') {
            return "This player is consitently been on the bench throughout his career.";
        }
        else if (target === 'HOF') {
            return "This player is currently in the Hall of Fame but played in an era where stats and awards were a little inflated";
        }
        return "There isn't been enough games in the current players career to make a career evaluation";
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
                        const toolTipText = this.getToolTipText(playerInfo.Target);
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
                                                    <h5><li style={{ marginLeft: '-20px' }}><b>College/HS: </b>{playerInfo.College}</li></h5>
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
                                            <h3><b>{playerInfo.Target}</b><sup><Tooltip title={toolTipText} placement="top-end" arrow>
                                                <InfoIcon color="action" />
                                            </Tooltip></sup></h3>
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
