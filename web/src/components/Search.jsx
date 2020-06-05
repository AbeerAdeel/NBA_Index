import React, { Fragment } from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as playerActions from '../managers/actions';
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
    Archetype
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

    handleSubmit(event, value, data) {
        const player = data.filter(x => x._id === value.id);
        if (player.length === 0 && this.props.isMultiple) {
            const ids = value.map(i => i.id);
            this.props.setComparison(ids);
        }
        else if (player.length == 0) {
            this.props.setSearch({ search: value, page: 1, skip: 0 });
            this.props.history.push('search');
            return;
        }
        else {
            const id = player[0]._id;
            const name = player[0].Name;
            const position = player[0].Position;
            const targets = player[0].Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"] : [player[0].Target];
            const PER = player[0].PER ? player[0].PER : 0.0;
            const archetype = player[0].Archetype;
            this.props.setPlayer({ id, name, position, targets, PER, archetype });
            if (!window.location.pathname.includes('player')) {
                this.props.history.push('player')
            }
            return;
        }
    }

    _handleTextFieldChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const width = this.props.width ? this.props.width : 'auto';
        const isMultiple = this.props.isMultiple ? this.props.isMultiple : false;
        return (
            <MuiThemeProvider>
                <Query query={SearchQuery} skip={this.state.value === ""} variables={{ search: this.state.value }}>
                    {({ loading, error, data }) => {
                        const temp = data && data.getAllPlayers;
                        const options = [];
                        temp && temp.forEach((element) => {
                            options.push({ id: element._id, Name: element.Name });
                        });
                        return (
                            <Autocomplete
                                disableClearable
                                freeSolo
                                multiple={isMultiple}
                                id="free-solo-2-demo"
                                options={options}
                                renderOption={option => <Fragment>{option.Name}</Fragment>}
                                getOptionLabel={option => option.Name}
                                onChange={(event, value) => this.handleSubmit(event, value, data.getAllPlayers)}
                                style={{ width }}
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
        setSearch: (search) => dispatch(playerActions.setSearch(search)),
        setComparison: (playerIds) => dispatch(playerActions.setSearch(playerIds)),
    };
}

Search.propTypes = {
    setPlayer: PropTypes.func,
    setSerch: PropTypes.func,
    width: PropTypes.string,
    isMultiple: PropTypes.bool,
    setComparison: PropTypes.bool
};

export default withRouter(connect(null, mapDispatchToProps)(Search));