import React from "react";
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from "components/Search";
import Spinner from 'react-bootstrap/Spinner';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as playerSelectors from '../managers/selector';
import { createStructuredSelector } from 'reselect';
import Pagination from '@material-ui/lab/Pagination';
import PlayerCard from "components/PlayerCard";
import { CardTitle } from "reactstrap";


const PlayerQuery = gql`
    query Player($search: String!, $limit: Int!, $skip: Int!) {
        getSearchResults(search: $search, limit: $limit, skip: $skip) {
          players {
            _id
            Name
            PTS
            TRB
            AST
            Position
            PER
            WS
            imgFile
            Target
            Archetype
          }
          count
        }
    }
`;


class Results extends React.Component {

  handlePagination(page) {
    this.props.setSearch({ search: this.props.selectCurrentState.search, page, skip: (page - 1) * 7 });
    this.props.history.push('search');
  }

  render() {
    return (
      <div className="content">
        <Search />
        <br />
        <Query query={PlayerQuery} skip={!this.props.selectCurrentState.search} variables={{ search: this.props.selectCurrentState.search, limit: 7, skip: this.props.selectCurrentState.skip }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }

            const searchResults = data.getSearchResults.players;
            const pages = Math.floor(data.getSearchResults.count / 7);
            const title = `Search results for '${this.props.selectCurrentState.search}'`;

            return (
              <div>
                <CardTitle tag="h5" style={{ marginLeft: '20px' }}>{title}</CardTitle>
                {
                  searchResults.map((item) => {
                    const img = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                    const targets = item.Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"] : [item.Target];
                    return (
                      <PlayerCard playerInfo={item} img={img} footer={true} targets={targets} history={this.props.history} />
                    )
                  })
                }
                <Pagination count={pages === 0 ? 1 : pages} page={this.props.selectCurrentState.page} color="primary" style={{ margin: 'auto', width: 'fit-content' }} onChange={(object, page) => this.handlePagination(page, data.getSearchResults.count)} />
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectCurrentState: playerSelectors.selectCurrentState(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSearch: (playerObj) => dispatch(playerActions.setSearch(playerObj)),
  };
}

Results.propTypes = {
  selectCurrentState: PropTypes.object,
  setSearch: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);