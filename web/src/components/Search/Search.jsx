import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as playerActions from '../../managers/actions';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const SearchQuery = gql`
query Player($search: String!) {
  getAllPlayers(search: $search, limit: 10) {
    _id
    Name
    Position
    Target
    PER
  }
}
`;

class Search extends React.Component {
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
        const id = player[0]._id;
        const name = player[0].Name;
        const position = player[0].Position;
        const targets = player[0].Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"] : [player[0].Target];
        const PER = player[0].PER ? player[0].PER : 0.0;
        this.props.setPlayer({ id, name, position, targets, PER });
        if (!window.location.pathname.includes('player')) {
            this.props.history.push('player')
        }
    }

    _handleTextFieldChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        console.log(this.state.value);
        return (
            <MuiThemeProvider>
                <Query query={SearchQuery} skip={this.state.value === ""} variables={{ search: this.state.value }}>
                    {({ loading, error, data }) => {
                        const dataSource = data && data.getAllPlayers ? data.getAllPlayers.map(x => x.Name) : [];
                        return (
                            <Autocomplete
                                disableClearable
                                freeSolo
                                id="free-solo-2-demo"
                                options={dataSource}
                                onChange={(event, value) => this.handleSubmit(value, data.getAllPlayers)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search for a player ..."
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.value ? this.state.value : ""}
                                        onChange={this._handleTextFieldChange}
                                    />
                                )}
                            />
                        )
                    }}
                </Query>
            </MuiThemeProvider>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
    };
}

Search.propTypes = {
    setPlayer: PropTypes.func,
};

export default withRouter(connect(null, mapDispatchToProps)(Search));
