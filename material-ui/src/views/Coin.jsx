import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
  
const Coin = () => {
    return(
        <Card className="container">
            <Card.Meta>x1.0 multiplier</Card.Meta>
            <Card.Description>
                <h1>500 Coins</h1>
                <hr></hr>
                Current reward upon completion.
            </Card.Description>
        </Card>
    )
}

export default Coin;