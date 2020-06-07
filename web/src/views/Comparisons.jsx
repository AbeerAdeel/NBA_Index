import React from "react";
import Search from "components/Search";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import * as playerSelectors from '../managers/selector';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Spinner from 'react-bootstrap/Spinner';
import CompareCard from "components/CompareCard";

const PlayerQuery = gql`
    query Player($playerIds: [ID]!) {
        getComparisonData(playerIds: $playerIds) {
            _id
            Name
            PTS
            TRB
            AST
            PER
            WS
            imgFile
            MVP
            AllNBA
            NBAChamp
            AS
            Target
            isActive
        }
    }
`;

class Comparisons extends React.Component {
  render() {
    return (
      <div className="content">
        <Search isMultiple={true} />
        <br/>
        <Query query={PlayerQuery} skip={!this.props.selectCurrentState} variables={{ playerIds: this.props.selectCurrentState }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
            console.log(data.getComparisonData);
            return (
              <CompareCard data={data.getComparisonData} />
            )
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectCurrentState: playerSelectors.selectCurrentState(),
});


Comparisons.propTypes = {
  selectCurrentState: PropTypes.object
};

export default connect(mapStateToProps, null)(Comparisons);
