import React from "react";
import PropTypes from "prop-types";
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

class PlayerCard extends React.Component {
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
                        <br />
                    </Card>
                    <br />
                </Col>
            </Row>

        );
    }
}

PlayerCard.propTypes = {
    playerInfo: PropTypes.object,
    img: PropTypes.string
};

export default PlayerCard;
