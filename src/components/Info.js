import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Tickets from './Tickets';
import './Info.scss';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


class Info extends Component {
  render() {
    const { TicketsTravels, routerProps , getFile} = this.props;
    const getId = routerProps.match.params.id;

    const boardingPass = TicketsTravels.find(ticket => ticket.serialNumber === getId);

    if (boardingPass) {
        if (boardingPass.organizationName === 'Renfe') {
        return (
          <React.Fragment>
            
            

            <div className="info-section clearfix">

                <Container fluid={true} className="info-section__card" style={{backgroundColor: `${boardingPass.labelColor}`}}>
                  <Row>
                    <Col>
                    <Link className="btn__back" to="/"> <i className="fas fa-angle-left fa-2x"/></Link>
                    <img src={`data:image/png;base64,${boardingPass.logo}`} alt="Organization logo" className="info-section__logo" />


                      <div className="info-section__card__content">
                      <p >{boardingPass.originName}</p>
                      <p>{boardingPass.destinationName}</p>
                      </div>
                      
                    </Col>
                  </Row>
                </Container>

                <Container className="train-info">
                  <Row>
                    <Col>
                      <div className="train-info__train">
                          <h2>{boardingPass.train}</h2>
                          <p>Train</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>{boardingPass.seat}</h3>
                      <p>Seat</p>
                    </Col>
                    <Col>
                      <h3>{boardingPass.carriage}</h3>
                      <p>Carriage</p>
                    </Col>
                    <Col>
                      <h3>{boardingPass.trainClass}</h3>
                      <p>Class</p>
                    </Col>
                  </Row>
                </Container>
                
                <Container className="info-user">
                  <Row>
                    <Col xs="8">
                        <div className="info-user__name">
                            <p>Name</p>
                            <h3>{boardingPass.passengerName}</h3>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="info-user__name">
                            <p>Departure</p>
                            <h3>{boardingPass.departureDate}</h3>
                        </div>
                    </Col>
                  </Row>
                </Container>

                <Container className="info-time">
                  <Row>
                    <Col>
                      <p style={{color: `${boardingPass.labelColor}`}}>{boardingPass.departureTime}</p>
                    </Col>
                    <Col>
                      <p style={{color: `${boardingPass.labelColor}`}}>{boardingPass.arrivalTime}</p>
                    </Col>
                  </Row>
                </Container>

                <Container className="info__code">
                  <Row>
                    <Col>
                      <div>
                      <Link className="info__code__link" to={`/QrCode/${getId}`}>
                      <div className="info__code__qr">
                        <QRCode value={boardingPass.qrCode}
                          bgColor="#FFFF"
                          fgColor="#000"              
                          size={300}
                          includeMargin={true}
                          className="info__code__qr__size"
                          
                        />
                      </div>
                    </Link>
                      </div>
                    </Col>
                  </Row>
                </Container>

                <Container>
                  <Row>
                    <Col>
                    <Link to={`/secondPage/${getId}`}>
                  <div className="detail__btn-wrapper">
                    <button
                      className="detail__btn-more"
                      type="button"
                      name="add_img"
                    >
                      <i class="fas fa-info-circle fa-2x" style={{color: `${boardingPass.labelColor}`}}></i>
                    </button>
                  </div>
                </Link>
                    </Col>
                  </Row>
                </Container>

              
            </div>

          </React.Fragment >

        );
      } else if(boardingPass.organizationName === 'Ryanair' ) {
        return (
          <React.Fragment>
            
            
            <div className="info-section clearfix">

                <Container fluid={true} className="info-section__card" style={{backgroundColor: `${boardingPass.backColor}`}}>
                  <Row>
                    <Col>
                    <Link className="btn__back" to="/"> <i className="fas fa-angle-left fa-2x"/></Link>
                    <img src={`data:image/png;base64,${boardingPass.logo}`} alt="Organization logo" className="info-section__logo" />


                      <div className="info-section__card__content">
                      <p >{`${boardingPass.originName}RID`}</p>
                      <p>{`${boardingPass.destinationName}RTO`}</p>
                      </div>
                      
                    </Col>
                  </Row>
                </Container>

                <Container className="train-info">
                  <Row>
                    <Col>
                      <div className="train-info__train">
                          <h2>{boardingPass.plain}</h2>
                          <p>Flight</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3>{boardingPass.seat}</h3>
                      <p>Seat</p>
                    </Col>
                    <Col>
                      <h3>{boardingPass.gate.substring(11,16)}</h3>
                      <p>Gate</p>
                    </Col>
                    
                  </Row>
                </Container>
                
                <Container className="info-user">
                  <Row>
                    <Col xs="8">
                        <div className="info-user__name">
                            <p>Name</p>
                            <h3>{boardingPass.name}</h3>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="info-user__name">
                            <p>Departure</p>
                            <h3>{boardingPass.departureDate.substring(0,11)}</h3>
                        </div>
                    </Col>
                  </Row>
                </Container>

                <Container className="info-time">
                  <Row>
                    <Col>
                      <p style={{color: `${boardingPass.labelColor}`}}>{boardingPass.departureTime}</p>
                    </Col>
                    <Col>
                      <p style={{color: `${boardingPass.labelColor}`}}>{boardingPass.arrivalTime}</p>
                    </Col>
                  </Row>
                </Container>

                <Container className="info__code">
                  <Row>
                    <Col>
                      <div>
                      <Link className="info__code__link" to={`/QrCode/${getId}`}>
                      <div className="info__code__qr">
                        <QRCode value={boardingPass.qrCode}
                          bgColor="#FFFF"
                          fgColor="#000"              
                          size={300}
                          includeMargin={true}
                          className="info__code__qr__size"
                        />
                      </div>
                    </Link>
                      </div>
                    </Col>
                  </Row>
                </Container>

                <Container>
                  <Row>
                    <Col>
                    <Link to={`/secondPage/${getId}`}>
                  <div className="detail__btn-wrapper">
                    <button
                      className="detail__btn-more"
                      type="button"
                      name="add_img"
                    >
                      <i class="fas fa-info-circle fa-2x" style={{color: `${boardingPass.labelColor}`}}></i>
                    </button>
                  </div>
                </Link>
                    </Col>
                  </Row>
                </Container>

              
            </div>

          </React.Fragment >

        );
      }
  }   
  else{
    return(
      <div>
        <p className='warning__messagge'>nooooo</p>
        <Link to='/' className='link-go-secondPage-error'> urca </Link>
      </div>
    )
  };
}
}
Info.propTypes = {
  getFile: PropTypes.func.isRequired, 
  TicketsTravels: PropTypes.arrayOf(PropTypes.object).isRequired,
  routerProps: PropTypes.objectOf(PropTypes.object).isRequired
}

export default Info;
