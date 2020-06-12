import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as compareSelector from '../managers/Comparisons/selector';

class CompareCard extends React.Component {
    getMaxObject() {
        const fields = ["PTS", "TRB", "AST", "PER", "WS", "MVP", "AllNBA", "NBAChamp", "AS"];
        const targetObj = { "Once in a Generation": 10, "All Time Great": 9, "HOF": 8, "All Star": 7, "Quality Starter": 6, "Average Player": 5, "Role Player": 4, "Bench Player": 3, "Out of the League": 2, "NA": 1 }
        const maxObj = {}
        for (const field of fields) {
            const arr = this.props.data.map(i => i[field]);
            maxObj[field] = arr.indexOf(Math.max(...arr));
        }
        const targets = this.props.data.map(i => i.Target);
        const targetArr = targets.map(i => targetObj[i]);
        maxObj['Target'] = targetArr.indexOf(Math.max(...targetArr));
        return maxObj;
    }

    getField(params) {
        let field = params.field;
        if (field === 'AllNBA') {
            field = 'All NBA';
        }
        else if (field === 'NBAChamp') {
            field = 'NBA Champ';
        }
        else if (field === 'Target') {
            field = 'Career Evaluation';
        }
        if (params.maxObj[params.field] === params.index) {
            return <h5 style={{ "color": "green" }}>{`${field}: ${params.value}`}</h5>
        }
        return <h5>{`${field}: ${params.value}`}</h5>
    }

    removePlayer(currentPlayer, data) {
        const player = data.filter(x => x.id == currentPlayer.id)[0];
        const index = data.indexOf(player);
        data.splice(index, 1);
    }

    render() {
        let nCards = Math.floor(12 / this.props.data.length);
        if (nCards >= 6) {
            nCards = 4
        }
        let index = -1;
        const maxObj = this.getMaxObject();
        const data = this.props.data;
        return (
            <Row>
                {
                    this.props.data.map((item) => {
                        const colImg = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                        index = index + 1;
                        return (
                            <Col xs="12" sm={nCards} style={{ marginTop: '0px' }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h5">{item.Name}</CardTitle>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <img className="center" src={colImg} alt="Card image cap" />
                                        <br />
                                        <br />
                                        <this.getField index={index} maxObj={maxObj} field="PTS" value={item.PTS} />
                                        <this.getField index={index} maxObj={maxObj} field="AST" value={item.AST} />
                                        <this.getField index={index} maxObj={maxObj} field="TRB" value={item.TRB} />
                                        <this.getField index={index} maxObj={maxObj} field="PER" value={item.PER} />
                                        <this.getField index={index} maxObj={maxObj} field="WS" value={item.WS} />
                                        <this.getField index={index} maxObj={maxObj} field="NBAChamp" value={item.NBAChamp ? item.NBAChamp : 0} />
                                        <this.getField index={index} maxObj={maxObj} field="MVP" value={item.MVP ? item.MVP : 0} />
                                        <this.getField index={index} maxObj={maxObj} field="AS" value={item.AS ? item.AS : 0} />
                                        <this.getField index={index} maxObj={maxObj} field="AllNBA" value={item.AllNBA ? item.AllNBA : 0} />
                                        <this.getField index={index} maxObj={maxObj} field="Target" value={item.Target ? item.Target : "NA"} />
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectCurrentState: compareSelector.selectCurrentComparison(),
});


CompareCard.propTypes = {
    data: PropTypes.array,
    selectCurrentState: PropTypes.array,
};

export default connect(mapStateToProps, null)(CompareCard);
