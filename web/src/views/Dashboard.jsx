import React from "react";
import _ from 'lodash'
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AutoComplete } from "material-ui";
import gql from 'graphql-tag'
import { Query } from 'react-apollo'


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
        // this.loadData = this.loadData.bind(this);
    }

    handleSubmit(value, data) {
        const player = data.filter(x => x.Name === value);
        const id = player[0].id
        const path = `player/${id}`;
        this.props.history.push(path);
    }


    render() {
        return (
            <>
                <div className="content">
                    <MuiThemeProvider>
                        <Query query={SearchQuery} skip={this.state.value === ""} variables={{ search: this.state.value }}>
                            {({ loading, error, data }) => {
                                const dataSource = data && data.getAllPlayers ? data.getAllPlayers.map(x => x.Name) : []
                                return <SearchBar
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    dataSource={dataSource}
                                    onChange={(value) => this.setState({ value: value })}
                                    onRequestSearch={() => this.handleSubmit(this.state.value, data.getAllPlayers)}
                                    style={{
                                        margin: '0',
                                        maxWidth: 1200
                                    }}
                                    placeholder="Search for a player..."
                                />
                            }}
                        </Query>
                    </MuiThemeProvider>
                    <br />
                    <br />
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
                                        <a href="">View more info...</a>
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
                                        <a href="">View more info...</a>
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
                                        <a href="">View more info...</a>
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
                                        <a href="">View more info...</a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}



export default Dashboard;
