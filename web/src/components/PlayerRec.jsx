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

class PlayerRec extends React.Component {
    handleOnClick(id, name, position, targets, PER, archetype) {
        this.props.setPlayer({ id, name, position, targets, PER, archetype });
        this.props.history.push('player');
    }

    render() {
        const nCards =  12 / this.props.data.length;
        return (
            <Row>
                <Col xs="12">
                    <CardTitle tag="h5">Similar Players to {this.props.name}</CardTitle>
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
    data: PropTypes.object,
    name: PropTypes.string,
    setPlayer: PropTypes.func,
    history: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
}

export default connect(null, mapDispatchToProps)(PlayerRec);