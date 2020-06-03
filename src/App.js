import React from 'react';
import { faFastBackward, faFastForward, faStepForward, faCaretRight, faAppleAlt,faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ZingTouch from 'zingtouch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import $ from 'jquery';
import Music from './Music'

class App extends React.Component{
  constructor () {
    super();
    this.state = {
      isMenuClicked: false,
      isGameClicked: false,
      isMusicClicked: false,
      isSettingsClicked: false,
      zt:new ZingTouch.Region(document.body),
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval( () => this.tick(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  // Used to handle the rotation gesture on the menu region
  rotateEvent = () => {
    let prevDist=0;
    var myElement = document.getElementsByClassName('menu-region')[0];

    this.state.zt.bind(myElement, 'rotate', function(e){
      if(e.detail.distanceFromOrigin-prevDist>50){
          let actElt=$('.active');
          let nextElt=$('.active').next();
          if(nextElt.length!==0){
            actElt.removeClass('active');
            nextElt.addClass('active');
          }
          prevDist=e.detail.distanceFromOrigin;
      }else if(prevDist-e.detail.distanceFromOrigin>50){
        let actElt=$('.active');
        let prevElt=$('.active').prev();
        if(prevElt.length!==0){
          actElt.removeClass('active');
          prevElt.addClass('active');
        }
        prevDist=e.detail.distanceFromOrigin;
      }
    }, false);
  }

  // Toggler invoked whenever we click on menu to show and hide menu
  menuDisplay = () => {
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);
    this.setState({
      isMenuClicked: !this.state.isMenuClicked,
      isGameClicked: false,
      isMusicClicked: false,
      isSettingsClicked: false
    });
  }

  // Ok button to select the currently active item
  okClick = () => {
    let {isGameClicked,isMusicClicked,isSettingsClicked,isMenuClicked}=this.state;
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);

    // Find the active selection and accordingly set state
    let selection=$('.active').prop('id');
    console.log(selection);
    isMenuClicked=false;
    if(selection==='list-games-list') isGameClicked=true;
    if(selection==='list-music-list') isMusicClicked=true;
    if(selection==='list-settings-list') isSettingsClicked=true;
    if(selection==='back'){
      isMusicClicked=false;
      isMenuClicked=true;
    }

    this.setState({
      isMenuClicked: isMenuClicked,
      isGameClicked: isGameClicked,
      isMusicClicked: isMusicClicked,
      isSettingsClicked: isSettingsClicked
    },()=>{
      if(selection==='back'){
        $('#list-home-list').removeClass('active');
        $('#list-music-list').addClass('active');
      }
    });
  }

  render() {
    const {isMenuClicked,isGameClicked,isMusicClicked,isSettingsClicked,date}=this.state;
    return (
      <div className="App">
        <h1 style={{marginBottom:'20px'}}><FontAwesomeIcon icon={faAppleAlt} /> My Ipod</h1>
        <div className="cover">
          <div className="header">
            <div className="notification-bar"></div>
            <div className="camera"></div>
          </div>

          <div className="list">
            {!isMenuClicked && !isMusicClicked && !isGameClicked && !isSettingsClicked &&
              <div style={{display:'flex',flexDirection:'column-reverse',alignItems:'center',height:'250px',justifyContent:'space-between'}}>
               <h1 style={{margin:'20px',color:'#ffffff'}}><FontAwesomeIcon icon={faFingerprint} /></h1>
               <h3 style={{color:'#ffffff'}}>_&ensp;_&ensp;_&ensp;_</h3>
               <h3 style={{color:'#ffffff'}}>Enter your password</h3>
               <h2 style={{margin:'20px',color:'#ffffff'}}>
                 {date.toLocaleTimeString('en-US', {hour: '2-digit',hour12: 'true',minute:'2-digit'})}
               </h2>
              </div>}
            
            {isMenuClicked && 
            <div className="row">
              <div className="col-7">
                <div className="list-group" id="list-tab" role="tablist">
                  <a className="list-group-item list-group-item-action dropdown-item active" id="list-home-list" data-toggle="list" href="#list-home-list" role="tab" aria-controls="home">Home</a>
                  <a className="list-group-item list-group-item-action" id="list-games-list" data-toggle="list" href="#list-games-list" role="tab" aria-controls="games">Games</a>
                  <a className="list-group-item list-group-item-action" id="list-music-list" data-toggle="list" href="#list-music-list" role="tab" aria-controls="music">
                    Music <span style={{float:'right',fontSize:'20px'}}><FontAwesomeIcon icon={faCaretRight} /></span>
                  </a>
                  <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings-list" role="tab" aria-controls="settings">Settings</a>
                </div>
              </div>
            </div>}

            {isGameClicked && 
            <div className="games">
              <img src="https://lh3.googleusercontent.com/proxy/CCCcHeblZU9W1ivdoVgCwOe_YrQ-YkjmhNLfCdV_OKkq9lCbkfjCMMHsyf_bZR8mYyvuyXjKnV9s2O31BD0xGji_nN-foCEqsVs44VvR1aR8K-duwEAFH0xHwWRIh0G5nFUNJ3Y0AlLDxCoKoVhnsjvykJ4" alt="games"></img>
              <h3>Games</h3>
            </div>}

            {isMusicClicked && 
            <div className="music">
              <Music isMenuClicked={isMenuClicked} isGameClicked={isGameClicked} isMusicClicked={isMusicClicked}/>
            </div>}

            {isSettingsClicked && 
            <div className="settings">
              <img src="https://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Settings-icon.png" alt="games"></img>
              <h3>Settings</h3>
            </div>}
          </div>

          <div className="box">
            <div className="menu-region" draggable="false" onClick={()=>{this.rotateEvent()}}>
              <h3 className="item1" onClick={() => this.menuDisplay()}>Menu</h3>
              <h3 className="item2"><FontAwesomeIcon icon={faFastForward} /></h3>
              <h3 className="item3"><FontAwesomeIcon icon={faFastBackward} /></h3>
              <h3 className="item4"><FontAwesomeIcon icon={faStepForward} /></h3>
              <button className="okbutton" onClick={()=>{this.okClick()}}>OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
