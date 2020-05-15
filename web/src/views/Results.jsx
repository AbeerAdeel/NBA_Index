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
import Pagination from '@material-ui/lab/Pagination';

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
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(id, name, position, targets, PER, archetype) {
    this.props.setPlayer({ id, name, position, targets, PER, archetype});
    this.props.history.push('player');
  }

  handlePagination(page) {
    this.props.setSearch({ search: this.props.selectCurrentState.search, page, skip: (page - 1) * 7 });
    this.props.history.push('search');
  }

  render() {
    console.log(this.state);
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

              <Row>
                <CardTitle tag="h5" style={{ marginLeft: '20px' }}>{title}</CardTitle>
                {
                  searchResults.map((item) => {
                    const img = item.imgFile ? require(`assets/img/${item.imgFile}`) : require('assets/img/person.jpg');
                    const targets = item.Target === "Once in a Generation" ? ["Once in a Generation", "All Time Great"] : [item.Target];
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
                              <a href="javascript:void(0)" onClick={() => this.handleOnClick(item._id, item.Name, item.Position, targets, item.PER, item.Archetype)}>View more info...</a>
                            </div>
                          </CardFooter>
                        </Card>
                        <br />
                      </Col>
                    )
                  })
                }
                <Pagination count={pages === 0 ? 1 : pages} page={this.props.selectCurrentState.page} color="primary" style={{ margin: 'auto', width: 'fit-content' }} onChange={(object, page) => this.handlePagination(page, data.getSearchResults.count)} />
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
    setSearch: (playerObj) => dispatch(playerActions.setSearch(playerObj)),
  };
}

Results.propTypes = {
  selectCurrentState: PropTypes.object,
  setPlayer: PropTypes.func,
  setSearch: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);