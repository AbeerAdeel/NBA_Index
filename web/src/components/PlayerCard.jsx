import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';

class PlayerCard extends React.Component {
    handleOnClick(id, name, position, targets, PER, archetype) {
        this.props.setPlayer({ id, name, position, targets, PER, archetype });
        this.props.history.push('player');
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Card className="card-stats">
                        <CardHeader>
                            <CardTitle tag="h5">{this.props.playerInfo.Name}</CardTitle>

                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    {<img src={this.props.img} style={{ marginLeft: '30px' }} alt="Card image cap" />}
                                </Col>
                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">Position</p>
                                        <CardTitle tag="p">{this.props.playerInfo.Position}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">PPG</p>
                                        <CardTitle tag="p">{this.props.playerInfo.PTS}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">RPG</p>
                                        <CardTitle tag="p">{this.props.playerInfo.TRB}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">APG</p>
                                        <CardTitle tag="p">{this.props.playerInfo.AST}</CardTitle>
                                        <p />
                                    </div>
                                </Col>

                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">PER</p>
                                        <CardTitle tag="p">{this.props.playerInfo.PER}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                                <Col style={{ margin: "auto" }}>
                                    <div className="numbers" style={{ textAlign: "center" }}>
                                        <p className="card-category">WS</p>
                                        <CardTitle tag="p">{this.props.playerInfo.WS}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <br />
                        {this.props.footer && <CardFooter>
                            <hr />
                            <div className="stats">
                                <a href="javascript:void(0)" onClick={() => this.handleOnClick(this.props.playerInfo._id, this.props.playerInfo.Name, this.props.playerInfo.Position, this.props.targets, this.props.playerInfo.PER, this.props.playerInfo.Archetype)}>View more info...</a>
                            </div>
                        </CardFooter>}
                    </Card>
                    <br />
                </Col>
            </Row>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
  }

PlayerCard.propTypes = {
    playerInfo: PropTypes.object,
    img: PropTypes.string,
    footer: PropTypes.bool,
    targets: PropTypes.array,
    history: PropTypes.object,
    setPlayer: PropTypes.func
};

export default connect(null, mapDispatchToProps)(PlayerCard);
