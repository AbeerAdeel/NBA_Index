import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

const SearchQuery = gql`
query Player($_id: ID!) {
  getCertainPlayer(_id: $_id) {
    id
    Name
    PTS
    Position
    FG
  }
}
`;

class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            id: "",
        }
    }

    componentWillMount() {
        const path = window.location.pathname;
        const splitPath = path.split("/");
        this.setState({ id: splitPath[3] });
    }


    render() {
        console.log(this.state.id);
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12" xs="6">
                            <Card className="card-stats">
                                <CardHeader>
                                    <CardTitle tag="h5">Lebron James</CardTitle>
                                    <p className="card-category">Los Angeles Lakers</p>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <img src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                                        <Query query={SearchQuery} skip={this.state.id === ""} variables={{ _id: this.state.id }}>
                                            {({ loading, error, data }) => {
                                                if (loading) {
                                                    return <Spinner animation="border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </Spinner>
                                                }
                                                console.log(data);
                                                return <div></div>
                                            }}
                                        </Query>
                                    </Row>

                                </CardBody>
                                <br />
                                <br />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Player;
