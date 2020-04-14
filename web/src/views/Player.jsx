import React from "react";
// react plugin used to create charts
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import * as playerSelectors from '../managers/selector';
import * as playerActions from '../managers/actions';


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

const PlayerQuery = gql`
    query Player($_id: ID!) {
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
        SixthMan
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

const StatsQuery = gql`
    query CareerStats($Name: String!) {
        getPlayerStats(Name: $Name) {
            Year
            Team
            G
            GS
            FGP
            eFG
            FTP
            MP
            FG3
            TRB
            AST
            STL
            BLK
            TOV
            PTS
        }
    }
`;

const SimilarQuery = gql`
    query SimilarPlayers($Positions: [String]!, $Target: String!, $Name: String!) {
        getSimilarPlayers(Positions: $Positions, Target: $Target, Name: $Name) {
            id
            Name
            Position
            imgFile
        }
    }
`;

class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            target: "",
            positions: []
        }
        this.createData = this.createData.bind(this);
    }

    createData(Year, Team, G, GS, MP, PTS, AST, TRB, BLK, STL, TOV, FGP, FG3, FTP, eFG) {
        return { Year, Team, G, GS, MP, PTS, AST, TRB, BLK, STL, TOV, FGP, FG3, FTP, eFG };
    }

    generateRows(stats) {
        const length = stats['Year'].length;
        const rows = [];
        for (let index = 0; index < length; index++) {
            const row = this.createData(stats.Year[index], stats.Team[index], stats.G[index], stats.GS[index], stats.MP[index], stats.PTS[index], stats.AST[index], stats.TRB[index], stats.BLK[index], stats.STL[index], stats.TOV[index], stats.FGP[index], stats.FG3[index], stats.FTP[index], stats.eFG[index])
            rows.push(row)
        }
        return rows;
    }


    generateAwards(playerInfo) {
        const awardIndex = ['MVP', 'NBAChamp', 'AS', 'AllDefensive', 'ScoringChamp', 'BLKChamp', 'ASTChamp', 'TRBChamp', 'STLChamp', 'ROY', 'DefPOY', 'MostImproved', 'SixthMan'];
        const awardCategories = ['MVP', 'NBA Champ', 'All Star', 'All Defensive', 'Scoring Champ', 'BLK Champ', 'AST Champ', 'TRB Champ', 'STL Champ', 'Rooke of the Year', 'DPOY', 'Most Improved', 'Sixth Man'];
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

    handleOnClick(id, name, positions, target) {
        this.props.setPlayer({ id, name, positions, target });
        this.props.history.push('player');
    }

    getToolTipText(target) {
        if (target === 'Once in a Generation') {
            return "This player is part of the mount rushmore of NBA history. When you think of the greatest players to ever play, this player comes up more than often.";
        }
        else if (target === 'All Time Great') {
            return "This player is one of the best at its position and currently is or will be a Hall of Famer.";
        }
        else if (target === 'All Star') {
            return "This player is consistently an All Star or a potential All Star through out his career.";
        }
        else if (target === 'Quality Starter') {
            return "This player has been consitenlty a productive starter through his career."
        }
        else if (target === 'Role Player') {
            return "This player has been a solid contributer to his team throughout his career.";
        }
        else if (target === 'Bench Player') {
            return "This player has consitently been on the bench throughout his career.";
        }
        else if (target === 'HOF') {
            return "This player is currently in the Hall of Fame but played in an era where stats and awards were a little inflated";
        }
        return "There hasn't been enough games in the current players career to make a current career evaluation";
    }

    render() {
        console.log(this.props.selectCurrentPlayer);
        return (
            <div className="content">
                <Query query={PlayerQuery} skip={!this.props.selectCurrentPlayer.id} variables={{ _id: this.props.selectCurrentPlayer.id }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        const playerInfo = data.getCertainPlayer[0];
                        const awards = this.generateAwards(playerInfo);
                        const toolTipText = this.getToolTipText(playerInfo.Target);
                        const img = playerInfo.imgFile ? require(`assets/img/${playerInfo.imgFile}`) : require('assets/img/person.jpg');

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
                                                    {<img src={img} style={{ marginLeft: '30px' }} alt="Card image cap" />}
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
                                                {awards.length === 0 &&
                                                    <ul style={{ listStyleType: "none", marginTop: "-10px" }}>
                                                        {
                                                            <h5><li style={{ marginLeft: '-20px' }}>There are no awards for this player</li></h5>
                                                        }
                                                    </ul>
                                                }
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
                <Query query={StatsQuery} skip={!this.props.selectCurrentPlayer.name} variables={{ Name: this.props.selectCurrentPlayer.name }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        if (data.getPlayerStats.length === 0) {
                            return <div></div>;
                        }

                        const playerStats = data.getPlayerStats[0];
                        const rows = this.generateRows(playerStats);

                        return (
                            <Col xs="12" style={{ marginTop: '30px' }}>
                                <CardTitle tag="h5">Career Stats (Per Game)</CardTitle>
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: '650px', marginBottom: '15px', marginTop: '15px'}} size = "small" aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Year</TableCell>
                                                <TableCell align="right">Team</TableCell>
                                                <TableCell align="right">G</TableCell>
                                                <TableCell align="right">GS</TableCell>
                                                <TableCell align="right">MP</TableCell>
                                                <TableCell align="right">PTS</TableCell>
                                                <TableCell align="right">AST</TableCell>
                                                <TableCell align="right">TRB</TableCell>
                                                <TableCell align="right">BLK</TableCell>
                                                <TableCell align="right">STL</TableCell>
                                                <TableCell align="right">TOV</TableCell>
                                                <TableCell align="right">FG%</TableCell>
                                                <TableCell align="right">3P%</TableCell>
                                                <TableCell align="right">FT%</TableCell>
                                                <TableCell align="right">eFG%</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell align="right">{row.Year}</TableCell>
                                                    <TableCell align="right">{row.Team}</TableCell>
                                                    <TableCell align="right">{row.G}</TableCell>
                                                    <TableCell align="right">{row.GS}</TableCell>
                                                    <TableCell align="right">{row.MP}</TableCell>
                                                    <TableCell align="right">{row.PTS}</TableCell>
                                                    <TableCell align="right">{row.AST}</TableCell>
                                                    <TableCell align="right">{row.TRB}</TableCell>
                                                    <TableCell align="right">{row.BLK}</TableCell>
                                                    <TableCell align="right">{row.STL}</TableCell>
                                                    <TableCell align="right">{row.TOV}</TableCell>
                                                    <TableCell align="right">{row.FGP}</TableCell>
                                                    <TableCell align="right">{row.FG3}</TableCell>
                                                    <TableCell align="right">{row.FTP}</TableCell>
                                                    <TableCell align="right">{row.eFG}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Col>
                        )
                    }}
                </Query>
                <br />
                <br />
                <Query query={SimilarQuery} variables={{ Positions: this.props.selectCurrentPlayer.positions, Target: this.props.selectCurrentPlayer.target, Name: this.props.selectCurrentPlayer.name }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        const similarPlayers = data.getSimilarPlayers;
                        const nCards = 12 / similarPlayers.length;

                        return (
                            <Row>
                                <Col xs="12">
                                    <CardTitle tag="h5">Similar Players to {this.props.selectCurrentPlayer.name}</CardTitle>
                                </Col>
                                {
                                    similarPlayers.map((item) => {
                                        const colImg = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                                        const positions = item.Position ? item.Position.split("-") : [];
                                        return (
                                            <Col xs="12" sm={nCards} style={{ marginTop: '0px' }}>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle tag="h5">{item.Name}</CardTitle>
                                                    </CardHeader>
                                                    <CardBody className="text-center">
                                                        <img className="center" src={colImg} alt="Card image cap" />
                                                    </CardBody>
                                                    <CardFooter>
                                                        <hr />
                                                        <div className="stats">
                                                            <a href="javascript:void(0)" onClick={() => this.handleOnClick(item.id, item.Name, positions, this.props.selectCurrentPlayer.target)}>View more info...</a>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectCurrentPlayer: playerSelectors.selectCurrentPlayer(),
});

function mapDispatchToProps(dispatch) {
    return {
        setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
}


Player.propTypes = {
    selectCurrentPlayer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
