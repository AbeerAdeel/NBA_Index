import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import * as playerSelectors from '../managers/selector';
import Spinner from 'react-bootstrap/Spinner';
import Search from "components/Search";
import PlayerCard from "components/PlayerCard";
import PlayerInfo from "components/PlayerInfo";
import PlayerValue from "components/PlayerValue";
import StatsTable from "components/StatsTable";
import PlayerRec from "components/PlayerRec";

const PlayerQuery = gql`
    query Player($_id: ID!) {
        getCertainPlayer(_id: $_id) {
            _id
            Name
            PTS
            TRB
            AST
            Position
            PER
            WS
            imgFile
            MVP
            AllNBA
            NBAChamp
            AS
            AllDefensive
            ScoringChamp
            BLKChamp
            ASTChamp
            TRBChamp
            STLChamp
            SixthMan
            ROY
            DefPOY
            MostImproved
            College
            Weight
            Height
            Target
            avgSalary
            marketValue
            isActive
        }
    }
`;

const StatsQuery = gql`
    query CareerStats($Name: String!) {
        getPlayerStats(Name: $Name) {
            Year
            Team
            G
            GS
            FGP
            eFG
            FTP
            MP
            FG3
            TRB
            AST
            STL
            BLK
            TOV
            PTS
        }
    }
`;

const SimilarQuery = gql`
    query SimilarPlayers($Position: String, $Targets: [String]!, $Name: String!, $PER: Float, $Archetype: String) {
        getSimilarPlayers(Position: $Position, Targets: $Targets, Name: $Name, PER: $PER, Archetype: $Archetype) {
            _id
            Name
            Position
            imgFile
            Target
            PER
            Archetype
        }
    }
`;

class Player extends React.Component {
    render() {
        return (
            <div className="content">
                <Search />
                <br />
                <Query query={PlayerQuery} skip={!this.props.selectCurrentState.id} variables={{ _id: this.props.selectCurrentState.id }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }

                        const playerInfo = data.getCertainPlayer[0];
                        const img = playerInfo.imgFile ? require(`assets/img/${playerInfo.imgFile}`) : require('assets/img/person.jpg');

                        return (
                            <div>
                                <PlayerCard playerInfo={playerInfo} img={img} />
                                <PlayerInfo playerInfo={playerInfo} />
                                <PlayerValue playerInfo={playerInfo} />
                            </div>
                        )
                    }}
                </Query>

                <Query query={StatsQuery} skip={!this.props.selectCurrentState.name} variables={{ Name: this.props.selectCurrentState.name }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        if (data.getPlayerStats.length === 0) {
                            return <div></div>;
                        }
                        const playerStats = data.getPlayerStats[0];
                        return (
                            <StatsTable playerStats={playerStats} />
                        )
                    }}
                </Query>
                <br />
                <br />
                <Query query={SimilarQuery} variables={{ Position: this.props.selectCurrentState.position, Targets: this.props.selectCurrentState.targets, Name: this.props.selectCurrentState.name, PER: this.props.selectCurrentState.PER, Archetype: this.props.selectCurrentState.archetype }}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        const similarPlayers = data.getSimilarPlayers;

                        return (
                            <PlayerRec data={similarPlayers} name={this.props.selectCurrentState.name} history={this.props.history} />
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


Player.propTypes = {
    selectCurrentState: PropTypes.object
};

export default connect(mapStateToProps, null)(Player);
