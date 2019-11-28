import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import './SecondPage.scss';
import PropTypes from 'prop-types';
import Tickets from './Tickets';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


class SecondPage extends Component {

  render() {
    const {TicketsTravels, routerProps, getFile} = this.props;
  
    const getId = routerProps.match.params.id;
    const boardingPass = TicketsTravels.find(item => item.serialNumber === getId);

    if (boardingPass) {
       if(boardingPass.organizationName === 'Renfe') {
        return(
          <Fragment>
            
            
          <div className="second-page"
              style={{ backgroundColor: `${boardingPass.labelColor}` }}
            >
              
            <div className="second-page__header">
            <Link className="second-page__header__link" to = {`/info/${routerProps.match.params.id}`}>
              <i className="fas fa-angle-left fa-2x "></i>
            </Link>  
                <img src={`data:image/png;base64,${boardingPass.logo}`} 
                alt="Organization logo" 
                className="second-page__header__logo"/>
              </div>

              <Container className="second-page__content">
                <Row>
                  <Col>
                    <div className="second-page__text">
                      <div className="dividi-cose">
                        <p>Ticket</p>
                        <h2>{boardingPass.ticketNumber}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Serial number</p>
                        <h2>{boardingPass.serialNumber}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Plain</p>
                        <h2>{boardingPass.plain}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Fee</p>
                        <h2>{boardingPass.fee}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Train class</p>
                        <h2>{boardingPass.trainClass}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Destination name</p>
                        <h2>{boardingPass.destinationName}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Date</p>
                        <h2>{boardingPass.departureDate}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Time</p>
                        <h2>{boardingPass.departureTime}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Passenger name</p>
                        <h2>{boardingPass.passengerName}</h2>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>

          </div>
          </Fragment>
        )
      }
      else if(boardingPass.organizationName === 'Ryanair') {
        return(
          <Fragment>
            <div className="second-page"
              style={{ backgroundColor: `${boardingPass.labelColor}` }}
            >
              
            <div className="second-page__header">
            <Link className="second-page__header__link" to = {`/info/${routerProps.match.params.id}`}>
              <i className="fas fa-angle-left fa-2x"></i>
            </Link>  
                <img src={`data:image/png;base64,${boardingPass.logo}`} 
                alt="Organization logo" 
                className="second-page__header__logo"/>
              </div>

              <Container className="second-page__content">
                <Row>
                  <Col>
                    <div className="second-page__text">
                      
                      <div className="dividi-cose">
                        <p>Serial number</p>
                        <h2>{boardingPass.serialNumber}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Plain</p>
                        <h2>{boardingPass.plain}</h2>
                      </div>
                      
                      <div className="dividi-cose">
                        <p style={{fontSize: `.8rem`}}>Organization name</p>
                        <h2>{boardingPass.organizationName}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Destination name</p>
                        <h2>{boardingPass.destinationName}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Date</p>
                        <h2>{boardingPass.departureDate}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Time</p>
                        <h2>{boardingPass.departureDate.substring(11,16)}</h2>
                      </div>
                      <div className="dividi-cose">
                        <p>Passenger name</p>
                        <h2>{boardingPass.name}</h2>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>

          </div>
          </Fragment>
        )
      }
    }  
      else{
        return(
          <div>
            <p className="warning_messagge">nooo</p>
            <Link to="/" className="link-go-SecondPage-error"> ok </Link>
          </div>
        )
      };
  }
}

SecondPage.propTypes = {
  getFile: PropTypes.func.isRequired, 
  TicketsTravels: PropTypes.arrayOf(PropTypes.object).isRequired,
  routerProps: PropTypes.objectOf(PropTypes.object).isRequired
}

export default SecondPage;
