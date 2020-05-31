import React from "react";
import PropTypes from "prop-types";
import {
    CardTitle,
    Col
} from "reactstrap";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class StatsTable extends React.Component {
    createData(Year, Team, G, GS, MP, PTS, AST, TRB, BLK, STL, TOV, FGP, FG3, FTP, eFG) {
        return { Year, Team, G, GS, MP, PTS, AST, TRB, BLK, STL, TOV, FGP, FG3, FTP, eFG };
    }

    generateRows(stats) {
        const length = stats['Year'].length;
        const rows = [];
        for (let index = 0; index < length; index++) {
            const row = this.createData(stats.Year[index], stats.Team[index], stats.G[index], stats.GS[index], stats.MP[index], stats.PTS[index], stats.AST[index], stats.TRB[index], stats.BLK[index], stats.STL[index], stats.TOV[index], stats.FGP[index], stats.FG3[index], stats.FTP[index], stats.eFG[index])
            rows.push(row)
        }
        return rows;
    }

    render() {
        const rows = this.generateRows(this.props.playerStats);
        return (
            <Col xs="12" style={{ marginTop: '30px' }}>
                <CardTitle tag="h5">Career Stats (Per Game)</CardTitle>
                <TableContainer component={Paper}>
                    <Table style={{ minWidth: '650px', marginBottom: '15px', marginTop: '15px' }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">Team</TableCell>
                                <TableCell align="right">G</TableCell>
                                <TableCell align="right">GS</TableCell>
                                <TableCell align="right">MP</TableCell>
                                <TableCell align="right">PTS</TableCell>
                                <TableCell align="right">AST</TableCell>
                                <TableCell align="right">TRB</TableCell>
                                <TableCell align="right">BLK</TableCell>
                                <TableCell align="right">STL</TableCell>
                                <TableCell align="right">TOV</TableCell>
                                <TableCell align="right">FG%</TableCell>
                                <TableCell align="right">3P%</TableCell>
                                <TableCell align="right">FT%</TableCell>
                                <TableCell align="right">eFG%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="right">{row.Year}</TableCell>
                                    <TableCell align="right">{row.Team}</TableCell>
                                    <TableCell align="right">{row.G}</TableCell>
                                    <TableCell align="right">{row.GS}</TableCell>
                                    <TableCell align="right">{row.MP}</TableCell>
                                    <TableCell align="right">{row.PTS}</TableCell>
                                    <TableCell align="right">{row.AST}</TableCell>
                                    <TableCell align="right">{row.TRB}</TableCell>
                                    <TableCell align="right">{row.BLK}</TableCell>
                                    <TableCell align="right">{row.STL}</TableCell>
                                    <TableCell align="right">{row.TOV}</TableCell>
                                    <TableCell align="right">{row.FGP}</TableCell>
                                    <TableCell align="right">{row.FG3}</TableCell>
                                    <TableCell align="right">{row.FTP}</TableCell>
                                    <TableCell align="right">{row.eFG}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Col>
        );
    }
}

StatsTable.propTypes = {
    playerStats: PropTypes.object
};

export default StatsTable;