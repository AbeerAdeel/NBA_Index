import React from "react";
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";

class PlayerInfo extends React.Component {

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
        const toolTipText = this.getToolTipText(this.props.playerInfo.Target);
        const awards = this.generateAwards(this.props.playerInfo);
        return (
            <Row>
                <Col xs="12" sm="4">
                    <Card className="card-stats">
                        <CardHeader>
                            <CardTitle style={{ textDecoration: "underline" }} tag="h5">Player Info</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <ul style={{ listStyleType: "none", marginTop: "-10px" }}>
                                    <h5><li style={{ marginLeft: '-20px' }}><b>Height: </b>{this.props.playerInfo.Height}</li></h5>
                                    <h5><li style={{ marginLeft: '-20px' }}><b>Weight: </b>{this.props.playerInfo.Weight}lb</li></h5>
                                    <h5><li style={{ marginLeft: '-20px' }}><b>College/HS: </b>{this.props.playerInfo.College}</li></h5>
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
                            <h3><b>{this.props.playerInfo.Target}</b><sup><Tooltip title={toolTipText} placement="top-end" arrow>
                                <InfoIcon color="action" />
                            </Tooltip></sup></h3>
                        </CardBody>
                    </Card>
                </Col>
                <br />
                <br />
            </Row>
        );
    }
}

PlayerInfo.propTypes = {
    playerInfo: PropTypes.object,
};

export default PlayerInfo;
