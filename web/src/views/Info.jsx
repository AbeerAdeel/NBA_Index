import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Info extends React.Component {
  render() {
    return (
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-stats">
                <CardHeader>
                  <CardTitle tag="h3">Info</CardTitle>
                </CardHeader>
                <CardBody>
                  <div>
                    <p>This is an all in one basketball analytics website for inquries about player projections, classifications, etc.  You will also find here every player that has played in the NBA with their info as well as their awards for better knowledge of that player.</p>
                    <h5>Current Features</h5>
                    <ul>
                      <li>Classifcation system of how good a players career was using a 94% accurate Deep Learning Tensorflow Model</li>
                      <li>Information of every player in NBA History</li>
                      <li>Determing if players are getting paid accordingly based off of a linear regression model.</li>
                      <li>Ability to compare past and present players to settle hot debates.</li>
                    </ul>
                    <h5>Features to Potentialy Come</h5>
                    <ul>
                      <li>Stat projections for current basketball players</li>
                    </ul>
                    <br/>
                    <p><b>All data/images were retrieved by Basketball Reference and Kaggle. Will leave this project open source on Github if anyone has other ideas for other basketball inquires. </b> </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Info;
