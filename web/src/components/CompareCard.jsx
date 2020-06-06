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

class Footer extends React.Component {
    render() {
        let nCards = 12 / this.props.data.length;
        if (nCards >= 6) {
            nCards = 4
        }
        return (
            <Row>
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
                                        <br />
                                        <br />
                                        <h3>PTS: {item.PTS}</h3>
                                        <h3>AST: {item.AST}</h3>
                                        <h3>TRB: {item.TRB}</h3>
                                        <h3>PER: {item.PER}</h3>
                                        <h3>WS: {item.WS}</h3>
                                        <h3>MVP: {item.MVP ? item.MVP : 0}</h3>
                                        <h3>AS: {item.MVP ? item.AS : 0}</h3>
                                        <h3>All-NBA: {item.AllNBA ? item.AllNBA : 0}</h3>
                                        <h3><b>{item.Target}</b></h3>
                                    </CardBody>
                                    {/* <CardFooter>
                                        <hr />
                                        <div className="stats">
                                            <a href="javascript:void(0)" onClick={() => this.handleOnClick(item._id, item.Name, item.Position, targets, item.PER, item.Archetype)}>View more info...</a>
                                        </div>
                                    </CardFooter> */}
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }
}

Footer.propTypes = {
    data: PropTypes.array
};

export default Footer;
