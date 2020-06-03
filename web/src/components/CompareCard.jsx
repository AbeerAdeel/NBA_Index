/*eslint-disable*/
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
import Search from "components/Search";
import Button from '@material-ui/core/Button';

class Footer extends React.Component {
    render() {
        return (
            <Row>
                <Col xs="12">
                    <Card className="card-stats">
                        <CardHeader>
                            <CardTitle style={{ textDecoration: "underline" }} tag="h5">Compare Players</CardTitle>
                        </CardHeader>
                        <CardBody className="text-center">
                            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1000px', margin: '0 auto' }}>
                                <Search width={'200px'} />
                                <Search width={'200px'} />
                                <Search width={'200px'} />
                                <Search width={'200px'} />
                            </div>
                            <br />
                            <br />
                        </CardBody>
                        <CardFooter style={{marginLeft: 'auto'}}>
                            <div className="stats">
                                <Button variant="contained" color="primary">Compare</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
};

export default Footer;
