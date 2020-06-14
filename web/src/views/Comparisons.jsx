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
                <div className="content">
                  <br />
                  <Row>
                    <Col md="3">
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h5">LeBron vs MJ</CardTitle>
                          <p className="card-category">Who is the GOAT?</p>
                        </CardHeader>
                        <CardBody className="text-center" style={{justifyContent: 'space-between', display : 'flex'}}>
                          <img className="center" src={require("assets/img/jamesle01.jpg")} alt="Card image cap" />
                          <img className="center" src={require("assets/img/jordami01.jpg")} alt="Card image cap" />
                        </CardBody>
                        <CardFooter>
                          <hr />
                          <div className="stats">
                            <a href="javascript:void(0)" onClick={() => this.props.setComparison([{id: "5e9a51d6332e4992bcc3956c", Name: 'LeBron James'}, {id: "5e9a4680332e4992bcc38495", Name: "Michael Jordan"}])}>View Comparison</a>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h5">Bird vs Magic</CardTitle>
                          <p className="card-category">Who dominated the 80s?</p>
                        </CardHeader>
                        <CardBody className="text-center" style={{justifyContent: 'space-between', display : 'flex'}}>
                          <img className="center" src={require("assets/img/birdla01.jpg")} alt="Card image cap" />
                          <img className="center" src={require("assets/img/johnsma02.jpg")} alt="Card image cap" />
                        </CardBody>
                        <CardFooter>
                          <hr />
                          <div className="stats">
                            <a href="javascript:void(0)" onClick={() => this.props.setComparison([{id: "5e9a51d6332e4992bcc3956c", Name: 'Larry Bird'}, {id: "5e9a4680332e4992bcc384ae", Name: "Magic Johnson"}])}>View Comparison</a>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h5">Shaq vs Kareem</CardTitle>
                          <p className="card-category">Who is the greatest big man?</p>
                        </CardHeader>
                        <CardBody className="text-center" style={{justifyContent: 'space-between', display : 'flex'}}>
                          <img className="center" src={require("assets/img/onealsh01.jpg")} alt="Card image cap" />
                          <img className="center" src={require("assets/img/abdulka01.jpg")} alt="Card image cap" />
                        </CardBody>
                        <CardFooter>
                          <hr />
                          <div className="stats">
                            <a href="javascript:void(0)" onClick={() => this.props.setComparison([{id: "5e9a4680332e4992bcc38486", Name: "Shaquille O'Neal"}, {id: "5e9a4680332e4992bcc384b0", Name: "Kareem Abdul-Jabbar"}])}>View Comparison</a>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h5">Wilt vs Russell</CardTitle>
                          <p className="card-category">Who is the best Old School Player?</p>
                        </CardHeader>
                        <CardBody className="text-center" style={{justifyContent: 'space-between', display : 'flex'}}>
                          <img className="center" src={require("assets/img/chambwi01.jpg")} alt="Card image cap" />
                          <img className="center" src={require("assets/img/russebi01.jpg")} alt="Card image cap" />
                        </CardBody>
                        <CardFooter>
                          <hr />
                          <div className="stats">
                            <a href="javascript:void(0)" onClick={() => this.props.setComparison([{id: "5e9a4680332e4992bcc38491", Name: 'Wilt Chamberlain'}, {id: "5e9a4680332e4992bcc38515", Name: "Bill Russell"}])}>View Comparison</a>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    
                  </Row>
                </div>
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
