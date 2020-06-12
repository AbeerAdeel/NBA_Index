import React from "react";
import Search from "components/Search";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import * as compareSelectors from '../managers/Comparisons/selector';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Spinner from 'react-bootstrap/Spinner';
import CompareCard from "components/CompareCard";
import * as compareActions from '../managers/Comparisons/actions';
import Button from '@material-ui/core/Button';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

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
        <Row>
          <Col xs="10">
            <Search isMultiple={true} />
          </Col>
          <Col xs="2">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '15px', height: '56px', width: '120px' }}
              onClick={() => this.props.setComparison([])}
              disabled={this.props.selectCurrentState.length === 0}
            >Clear</Button>
          </Col>
        </Row>
        <br />
        <Query query={PlayerQuery} skip={!this.props.selectCurrentState} variables={{ playerIds: this.props.selectCurrentState.map(i => i.id) }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
            if (data.getComparisonData.length === 0) {
              return (
                <>
                  <div className="content">
                    <Row>
                      <Col md="12">
                        <Card className="card-stats">
                          <CardHeader>
                            <CardTitle tag="h3">Welcome!</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <div>
                              <p>This is an all in one basketball analytics website for inquries about player projections, classifications, etc.  You will also find here every player that has played in the NBA with their info as well as their awards for better knowledge of that player.</p>
                              <h5>Current Features</h5>
                              <ul>
                                <li>Classifcation system of how good a players career was using a 94% accurate Deep Learning Tensorflow Model</li>
                                <li>Information of every player in NBA History</li>
                              </ul>
                              <h5>Features to Potentialy Come</h5>
                              <ul>
                                <li>Stat projections for current basketball players</li>
                                <li>Career earnings for all players</li>
                              </ul>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </>
              )
            }
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
  selectCurrentState: compareSelectors.selectCurrentComparison()
});

function mapDispatchToProps(dispatch) {
  return {
    setComparison: (playerIds) => dispatch(compareActions.setComparison(playerIds)),
  };
}


Comparisons.propTypes = {
  selectCurrentState: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparisons);
