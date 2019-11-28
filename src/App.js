import React from 'react';
import './App.scss';
import {Route} from 'react-router-dom';
import Tickets from './components/Tickets';
import Info from './components/Info';
import QrCode from './components/QrCode';
import SecondPage from './components/SecondPage';
import JSZip from 'jszip';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      TicketsTravels:[],

    };
    this.getFile= this.getFile.bind(this);
    this.File = this.File.bind(this);
  }
  componentDidMount(){
    const ticket = (JSON.parse(localStorage.getItem('TicketsTravels')))
    if(ticket!== null){
      this.setState({TicketsTravels:ticket})
    }
  }
  Image = async (zip, filename) => {
    const content = await zip
    .file(filename)
    .async('base64');
    return content;
  }

  JsonData =async(zip, filename) => {
    let boardingCard = {};
    const content = await zip
    .file(filename)
    .async('string');
      const DATA = JSON.parse(content);   
      if(DATA.organizationName === "Renfe"){
        const organizationName = DATA.organizationName;
        const serialNumber = DATA.serialNumber;
        const qrCode = DATA.barcode.message;
        const backColor = DATA.backgroundColor;
        const foreColor = DATA.foregroundColor;
        const labelColor = DATA.labelColor;
        const ticketNumber = DATA.boardingPass.backFields[0].value;
        const bookingCode = DATA.boardingPass.secondaryFields[1].value;
        const originName = DATA.boardingPass.primaryFields[0].label;
        const destinationName = DATA.boardingPass.primaryFields[1].label;
        const departureDate = DATA.boardingPass.headerFields[0].value;
        const departureTime = DATA.boardingPass.primaryFields[0].value;
        const arrivalTime = DATA.boardingPass.primaryFields[1].value;
        const train = DATA.boardingPass.auxiliaryFields[0].value;
        const carriage = DATA.boardingPass.auxiliaryFields[1].value;
        const seat = DATA.boardingPass.auxiliaryFields[2].value;
        const trainClass = DATA.boardingPass.auxiliaryFields[3].value;
        const passengerName = DATA.boardingPass.secondaryFields[0].value;
        const fee = DATA.boardingPass.backFields[4].value;
        const price = DATA.boardingPass.backFields[5].value;
        const cercania = DATA.boardingPass.backFields[7].label;

        boardingCard = {
          'organizationName': organizationName,
          'serialNumber' : serialNumber,
          'qrCode': qrCode,
          'backColor': backColor,
          'foreColor': foreColor,
          'labelColor': labelColor,
          'originName': originName,
          'destinationName': destinationName ,
          'departureDate': departureDate,
          'departureTime': departureTime,
          'arrivalTime': arrivalTime,
          'train': train,
          'trainClass': trainClass,
          'seat': seat,
          'carriage': carriage,
          'ticketNumber': ticketNumber,
          'bookingCode': bookingCode, 
          'passengerName' : passengerName, 
          'fee' : fee, 
          'price' : price, 
          'cercania' : cercania, 
        }
        return boardingCard;
      } else if(DATA.organizationName === "Ryanair") {
         const organizationName = DATA.organizationName;
        const serialNumber = DATA.serialNumber;
        const qrCode = DATA.barcode.message;
        const backColor = DATA.backgroundColor;
        const foreColor = DATA.foregroundColor;
        const labelColor = DATA.labelColor;
        const destinationName = DATA.boardingPass.primaryFields[1].value;
        const originName= DATA.boardingPass.primaryFields[0].value;
        const departureDate=DATA.boardingPass.headerFields[0].value;
        const seat = DATA.boardingPass.secondaryFields[2].value;
        const gate = DATA.boardingPass.secondaryFields[0].value;
        const plain = DATA.boardingPass.auxiliaryFields[1].value;
        const name= DATA.boardingPass.auxiliaryFields[0].value;
        //const departureTime = DATA.boardingPass.headerFields[0].value.subString(0,3);

        boardingCard = {
          'organizationName': organizationName,
          'serialNumber' : serialNumber,
          'qrCode': qrCode,
          'backColor': backColor,
          'foreColor': foreColor,
          'labelColor': labelColor,
          'originName': originName,
          'destinationName': destinationName ,
          'departureDate': departureDate,
          //'departureTime': departureTime,
          'gate': gate,
          'plain': plain,
          'name': name,
          'seat': seat,
         
        }
        return boardingCard;
      }
      else {
        const serialNumber = DATA.serialNumber;
        const qrCode = DATA.barcode.message;
        const backColor = DATA.backgroundColor;
        const foreColor = DATA.foregroundColor;
        const labelColor = DATA.labelColor;
        const origin = DATA.boardingPass.primaryFields[0].value;
        const originName = DATA.boardingPass.primaryFields[0].label;
        const destination = DATA.boardingPass.primaryFields[1].value;
        const destinationName = DATA.boardingPass.primaryFields[1].label;
        const departureDate = DATA.relevantDate;
        const departureTime = DATA.boardingPass.backFields[4].value;;
        const plain = DATA.boardingPass.backFields[7].value;
        const flyingClass = DATA.boardingPass.backFields[12].value;
        const seat = DATA.boardingPass.secondaryFields[1].value;
        const passengerName = DATA.boardingPass.backFields[0].value;

        boardingCard = {
          'serialNumber': serialNumber,
          'qrCode': qrCode,
          'backColor': backColor,
          'foreColor': foreColor,
          'labelColor': labelColor,
          'origin': origin,
          'originName': originName,
          'destination': destination,
          'destinationName': destinationName ,
          'departureDate': departureDate,
          'departureTime': departureTime,
          'plain': plain,
          'flyingClass': flyingClass,
          'seat': seat,
          'passengerName': passengerName,
          
        }
        return boardingCard;
      }
      
  };

  File(file) {
    const JsonData = this.JsonData;
    const Image = this.Image;
    let json = {}; 
    JSZip.loadAsync(file)                                   
      .then( async(zip) => {      
        for(let zipEntry in zip.files){     
          switch (zipEntry) {
            case 'pass.json':
              json = await JsonData(zip, zipEntry);
              break;
            default:
              break;
          } 
        }
        for(let zipEntry in zip.files){   
          switch (zipEntry) {
            case 'logo.png':
              json['logo']= await Image(zip, zipEntry);
              break;
            case 'logo@2x.png':
              json['logoRetina'] = await Image(zip, zipEntry);
              break;
            case 'icon.png':
              json['icon'] = await Image(zip, zipEntry);
              break;
            case 'icon@x2.png':
              json['iconRetina'] = await Image(zip, zipEntry);  break;
            default:
              break;
          }  
        }
        this.setState(prevState => ({
          TicketsTravels: [...prevState.TicketsTravels, json]
        })) 
        localStorage.setItem('TicketsTravels', JSON.stringify(this.state.TicketsTravels));     
      }
    )     
  }

  getFile(event){
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        this.File(files[i]);
    }
  }
  render() {
    return (
      <div className="app">
        <Route exact path = "/" render = {routerProps => (
        <Tickets 
          getFile = {this.getFile}
          routerProps = {routerProps}
          TicketsTravels = {this.state.TicketsTravels}
        />)}/>

        <Route exact path="/Info/:id" render={routerProps => 
          <Info routerProps={routerProps} TicketsTravels = {this.state.TicketsTravels} getFile = {this.getFile}/>}></Route>

        <Route exact path = "/QrCode/:id" render = {routerProps => 
        (<QrCode routerProps = {routerProps} TicketsTravels = {this.state.TicketsTravels} getFile = {this.getFile}/>)
        }/>

        <Route exact path="/SecondPage/:id" render={routerProps => <SecondPage routerProps={routerProps} TicketsTravels = {this.state.TicketsTravels} getFile = {this.getFile}/>}/>
      </div>
    );
  }
}

export default App;
