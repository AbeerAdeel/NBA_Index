import React from "react";
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from "components/Search/Search";
import Spinner from 'react-bootstrap/Spinner';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as playerSelectors from '../managers/selector';
import { createStructuredSelector } from 'reselect';

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
    query Player($search: String!) {
        getAllPlayers(search: $search, limit:7) {
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
        }
    }
`;


class Results extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(id, name, position, targets, PER) {
    this.props.setPlayer({ id, name, position, targets, PER });
    this.props.history.push('player');
  }

  render() {
    return (
      <div className="content">
        <Search />
        <br />
        <Query query={PlayerQuery} skip={!this.props.selectCurrentState} variables={{ search: this.props.selectCurrentState }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }

            const searchResults = data.getAllPlayers;
            const title = `Search resulsts for ${this.props.selectCurrentState}`;

            return (
              <Row>
                <CardTitle tag="h5">{title}</CardTitle>
                {
                  searchResults.map((item) => {
                    const img = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                    const targets = item.Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"]: [item.Target];
                    return (
                      <Col xs="12">
                        <Card className="card-stats">
                          <CardHeader>
                            <CardTitle tag="h5">{item.Name}</CardTitle>

                          </CardHeader>
                          <CardBody>
                            <Row>
                              <Col>
                                {<img src={img} style={{ marginLeft: '30px' }} alt="Card image cap" />}
                              </Col>
                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">Position</p>
                                  <CardTitle tag="p">{item.Position}</CardTitle>
                                  <p />
                                </div>
                              </Col>
                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">PPG</p>
                                  <CardTitle tag="p">{item.PTS}</CardTitle>
                                  <p />
                                </div>
                              </Col>
                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">RPG</p>
                                  <CardTitle tag="p">{item.TRB}</CardTitle>
                                  <p />
                                </div>
                              </Col>
                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">APG</p>
                                  <CardTitle tag="p">{item.AST}</CardTitle>
                                  <p />
                                </div>
                              </Col>

                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">PER</p>
                                  <CardTitle tag="p">{item.PER}</CardTitle>
                                  <p />
                                </div>
                              </Col>
                              <Col style={{ margin: "auto" }}>
                                <div className="numbers" style={{ textAlign: "center" }}>
                                  <p className="card-category">WS</p>
                                  <CardTitle tag="p">{item.WS}</CardTitle>
                                  <p />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                          <CardFooter>
                            <hr />
                            <div className="stats">
                              <a href="javascript:void(0)" onClick={() => this.handleOnClick(item._id, item.Name, item.Position, targets, item.PER)}>View more info...</a>
                            </div>
                          </CardFooter>
                        </Card>
                        <br />
                      </Col>
                    )
                  })
                }
              </Row>
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
    setPlayer: (playerObj) => dispatch(playerActions.setPlayer(playerObj)),
  };
}

Results.propTypes = {
  selectCurrentState: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);