import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components

class Info extends React.Component {
  render() {
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
    );
  }
}

export default Info;
