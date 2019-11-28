import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Tickets.scss';
import PropTypes from 'prop-types';

import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class Tickets extends Component {
  constructor(props) {
    super(props);

    this.field = React.createRef();
    this.fileChoosen = this.fileChoosen.bind(this);
  }

  fileChoosen() {
    this.field.current.click();
  }

  render() {
    const {getFile, TicketsTravels} = this.props;
    return (
      <div className="lista">

        <div className="header__list">
          <img className="logo__img" src="https://triporate.com/wp-content/uploads/2018/08/triporate-h.svg"></img>
        </div>

        <div className="list">
        <ul className="list__cards">
          {TicketsTravels
            .map((ticket, index) => {
             if (ticket.organizationName === "Renfe") {
                return (
                  <li key={ticket.serialNumber} 
                  className="cards"
                  >
                    <Link className="card__link" to={`/info/${ticket.serialNumber}`}>

                   <div className="cards__logo clearfix" style={{backgroundColor: `${ticket.labelColor}`}}>
                      <div className="cards__logo__img">
                        <img src={`data:image/png;base64,${ticket.logo}`} alt="Organization logo" className="" />
                      </div>
                        <p className="cards__logo__organization"
                        style={{color: `#fff`}}
                        >{ticket.organizationName}</p>

                        <p 
                          className="cards__logo__date"
                          style={{color: `#fff`}}
                          >{ticket.departureDate}</p>
                     </div> 

                     <div className="cards__time" >
                       <Container>
                         <Row>
                           <Col xs="5">
                            <p 
                            className="cards__departure"
                            
                            >{ticket.departureTime}</p>
                           </Col>
                           <Col xs="2">
                           <div className="cards__icon">️
                                <i 
                                  className="fas fa-train "
                                  
                                ></i>
                            </div>
                           </Col>
                           <Col xs="5">
                           <p 
                            className="cards__arrival"
                          >{ticket.arrivalTime}</p>
                           </Col>
                         </Row>
                       </Container>
                     </div>

                     <div className="cards__city" >
                       <Container>
                         <Row>
                           <Col xs="5">
                            <p 
                            className="cards__city__origin"
                            >{ticket.originName}</p>
                           </Col>
                           <Col cs="2">
                            
                           </Col>
                           <Col xs="5">
                           <p 
                          className="cards__city__arrival"
                          >{ticket.destinationName}</p>
                           </Col>
                         </Row>
                       </Container>
                     </div>
                     
                     </Link>
                  </li>
                )
              } else if(ticket.organizationName === "Ryanair") {
                return (
                  <li key={ticket.serialNumber} 
                  className="cards"
                  >
                    <Link className="card__link" to={`/info/${ticket.serialNumber}`}>

                   <div className="cards__logo clearfix" style={{backgroundColor: `${ticket.backColor}`}}>
                      <div className="cards__logo__img">
                        <img src={`data:image/png;base64,${ticket.logo}`} alt="Organization logo" className="logo--ryanair" />
                      </div>
                        <p className="cards__logo__organization" style={{color: `#fff`}}>{ticket.organizationName} </p>

                        <p 
                          className="cards__logo__date"
                          style={{color: `#fff`}}
                          >{ticket.departureDate}</p>
                     </div> 

                     <div className="cards__time" >
                       <Container>
                         <Row>
                           <Col xs="5">
                            <p 
                            className="cards__departure"
                            
                            >{ticket.departureDate.substring(11,16)}</p>
                           </Col>
                           <Col xs="2">
                           <div className="cards__icon">️
                                <i class="fas fa-plane"></i>
                            </div>
                           </Col>
                           <Col xs="5">
                           <p 
                            className="cards__arrival"
                            style={{ color: `${ticket.labelColor}` }}
                          >{ticket.arrivalTime}</p>
                           </Col>
                         </Row>
                       </Container>
                     </div>

                     <div className="cards__city" >
                       <Container>
                         <Row>
                           <Col xs="5">
                            <p 
                            className="cards__city__origin"
                            >{ticket.originName}</p>
                           </Col>
                           <Col cs="2">
                            
                           </Col>
                           <Col xs="5">
                           <p 
                          className="cards__city__arrival"
                          >{ticket.destinationName}</p>
                           </Col>
                         </Row>
                       </Container>
                     </div>
                     
                     </Link>
                  </li>   
                   
                )
              }
              else {
                return (<div>Error</div>)
              }

            }
            )
          }
        </ul>
        <div className="list__btn-wrapper">
          <button
            className="list__btn"
            type="button"
            name="add_img"
            onClick={this.fileChoosen}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <input
          type="file"
          ref={this.field}
          name="image"
          id="img-selector"
          className="list__input"
          onChange={getFile}
        />

      </div>

        </div>
        
    );
  }
}

Tickets.propTypes = {
  getFile: PropTypes.func.isRequired, 
  TicketsTravels: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Tickets;
