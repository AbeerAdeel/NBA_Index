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

class PlayerValue extends React.Component {

    magnitude (value) {
        var mag = 0;

        while(value > 1) {
          mag++;
          value = value / 10;
        };

        return mag;
    }

    humanize (value) {
        var mag = this.magnitude(value);

        if (mag <= 3) return value;

        if (mag > 3 && mag <= 6) {
            return value.toString().substr(0, mag - 3) + "K"
        }

        if (mag > 6 && mag <= 9) {
            return value.toString().substr(0, mag - 6) + "M"
        }

        if (mag > 9 && mag <= 12) {
            return value.toString().substr(0, mag - 9) + "B"
        }

        if (mag > 12 && mag <= 15) {
            return value.toString().substr(0, mag - 12) + "T"
        }

        return value;
    }

    renderContractStatus(obj) {
        const value = obj.avgSalary / obj.marketValue;
        console.log("value", value);
        if (value > 2) {
            return <h3 style={{color:'red'}}><b>Overpaid</b></h3>
        }
        else if (value > 1 && value < 2) {
            return <h3 style={{color:'blue'}}><b>Paid Accordingly</b></h3>
        }
        return <h3 style={{color:'green'}}><b>Underpaid</b></h3>
    }

    render() {
        return (
            <Row>
                {this.props.playerInfo.isActive &&
                    <Col xs="12" sm="4" style={{ marginTop: '20px' }}>
                        <Card className="card-stats">
                            <CardHeader>
                                <CardTitle style={{ textDecoration: "underline" }} tag="h5">Market Value</CardTitle>
                            </CardHeader>
                            <CardBody className="text-center">
                                <h2><b>{this.humanize(this.props.playerInfo.marketValue)}</b></h2>
                            </CardBody>
                        </Card>
                    </Col>}
                {this.props.playerInfo.isActive &&
                    <Col xs="12" sm="4" style={{ marginTop: '20px' }}>
                        <Card className="card-stats">
                            <CardHeader>
                                <CardTitle style={{ textDecoration: "underline" }} tag="h5">Average Salary</CardTitle>
                            </CardHeader>
                            <CardBody className="text-center">
                                <h2><b>{this.humanize(this.props.playerInfo.avgSalary)}</b></h2>
                            </CardBody>
                        </Card>
                    </Col>}
                {this.props.playerInfo.isActive &&
                    <Col xs="12" sm="4" style={{ marginTop: '20px' }}>
                        <Card className="card-stats">
                            <CardHeader>
                                <CardTitle style={{ textDecoration: "underline" }} tag="h5">Contract Status</CardTitle>
                            </CardHeader>
                            <CardBody className="text-center">
                                <this.renderContractStatus avgSalary={this.props.playerInfo.avgSalary} marketValue={this.props.playerInfo.marketValue} />
                            </CardBody>
                        </Card>
                    </Col>}
            </Row>
        );
    }
}

PlayerValue.propTypes = {
    playerInfo: PropTypes.object
};

export default PlayerValue;
