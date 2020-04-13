import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';


// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";


const SearchQuery = gql`
query Player($search: String!) {
  getAllPlayers(search: $search, limit: 10) {
    id
    Name
  }
}
`;

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            value: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    }

    handleSubmit(value, data) {
        const player = data.filter(x => x.Name === value);
        const id = player[0].id;
        const name = player[0].Name;
        this.props.setPlayer({ id, name });
        const path = `player/${id}`;
        this.props.history.push(path);
    }

    _handleTextFieldChange(e) {
        this.setState({
            value: e.target.value
        });
    }


    render() {
        return (
            <div className="content">
                <MuiThemeProvider>
                    <Query query={SearchQuery} skip={this.state.value === ""} variables={{ search: this.state.value }}>
                        {({ loading, error, data }) => {
                            const dataSource = data && data.getAllPlayers ? data.getAllPlayers.map(x => x.Name) : [];
                            return (
                                <Autocomplete
                                    freeSolo
                                    autoFocus
                                    id="free-solo-2-demo"
                                    onChange={(event, value) => this.handleSubmit(value, data.getAllPlayers)}
                                    options={dataSource}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search for a player ..."
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.value}
                                            onChange={this._handleTextFieldChange}
                                        />
                                    )}
                                />
                            )
                        }}
                    </Query>
                </MuiThemeProvider>
                <br />
                <Row>
                    <Col md="3">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">LeBron James</CardTitle>
                                <p className="card-category">Los Angeles Lakers</p>
                            </CardHeader>
                            <CardBody className="text-center">
                                <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats">
                                    <a href="player/5e891c0f90b08b93bc4a7c28">View more info...</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Michael Jordan</CardTitle>
                                <p className="card-category">Chicago Bulls</p>
                            </CardHeader>
                            <CardBody className="text-center">
                                <img className="center" src={require("assets/img/jordami01.jpg")} alt="Card image cap" />
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats">
                                    <a href="player/5e890efc90b08b93bc4a6b65">View more info...</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Kobe Bryant</CardTitle>
                                <p className="card-category">Los Angeles Lakers</p>
                            </CardHeader>
                            <CardBody className="text-center">
                                <img className="center" src={require("assets/img/bryanko01.jpg")} alt="Card image cap" />
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats">
                                    <a href="player/5e890efc90b08b93bc4a6bc4">View more info...</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Stephen Curry</CardTitle>
                                <p className="card-category">Golden State Warriors</p>
                            </CardHeader>
                            <CardBody className="text-center">
                                <img className="center" src={require("assets/img/curryst01.jpg")} alt="Card image cap" />
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats">
                                    <a href="player/5e891c0f90b08b93bc4a7c41">View more info...</a>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
}

Dashboard.propTypes = {
    setPlayer: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Dashboard);

