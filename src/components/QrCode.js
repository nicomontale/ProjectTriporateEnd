import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './QrCode.scss';
import QRCode from 'qrcode.react';
import Tickets from './Tickets';
import PropTypes from 'prop-types';

class QrCode extends Component {
  render() {
    const { TicketsTravels, routerProps, getFile } = this.props;
    const getId = routerProps.match.params.id;

    const boardingPass = TicketsTravels.find(item => item.serialNumber === getId);

    return (
      <React.Fragment>
        
        <div className="qr-section">
          <div className="qr-section__wrapper">
            <Link className="qr-section__link" to={`/info/${routerProps.match.params.id}`}>
            <i className="fas fa-angle-left qr-back fa-2x"></i>
            </Link>
          </div>
          <div className="qr-section__code">
            <QRCode
              value={boardingPass.qrCode}
              bgColor="#FFFF"
              fgColor="#000"
              size={300}
              includeMargin={true}
              className="qr-section__info"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

QrCode.propTypes = {
  getInputFile: PropTypes.func.isRequired, 
  routerProps: PropTypes.objectOf(PropTypes.object).isRequired,
  TicketsTravels: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default QrCode;
