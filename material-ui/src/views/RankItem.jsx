import React, { Component } from 'react';
import { Table } from 'reactstrap';

const RankItem = (props) => {
    let Rankings = props.rankings.map(rankItem => {
        return(
            <tr key={ rankItem.rank }>
                <td>{ rankItem.rank}</td>
                <td>{ rankItem.name}</td>
                <td>{ rankItem.city}</td>
                <td className="text-center">{ rankItem.earnings }</td>
            </tr>
        );
    })
    return(
        <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>City</th>
                        <th className="text-center">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      { Rankings }
                    </tbody>
                  </Table>
    )
}

export default RankItem;