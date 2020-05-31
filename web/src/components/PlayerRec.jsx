import React from "react";
import PropTypes from "prop-types";

class PlayerRec extends React.Component {
    render() {
        return (
            <Row>
                <Col xs="12">
                    <CardTitle tag="h5">Similar Players to {this.props.selectCurrentState.name}</CardTitle>
                </Col>
                {
                    this.props.data.map((item) => {
                        const colImg = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                        const targets = item.Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"] : [item.Target];
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
                                            <a href="javascript:void(0)" onClick={() => this.handleOnClick(item._id, item.Name, item.Position, targets, item.PER, item.Archetype)}>View more info...</a>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }
}

PlayerRec.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
};

export default PlayerRec;