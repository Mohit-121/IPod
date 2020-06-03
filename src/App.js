import React from 'react';
import { faFastBackward, faFastForward, faCaretRight, faAppleAlt,faFingerprint, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ZingTouch from 'zingtouch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import $ from 'jquery';
import Music from './Music';

class App extends React.Component{
  constructor () {
    super();
    this.state = {
      isMenuClicked: false,
      isGameClicked: false,
      isMusicClicked: false,
      isSettingsClicked: false,
      songDisplay: false,
      zt:new ZingTouch.Region(document.body),
      date: new Date(),
      isPlayed: false,
      songId: 0,
      songs: [
        {
            id: 1,
            src:"/Assets/Songs/Charlie Puth - How Long.mp3",
            image_url:"/Assets/Images/how_long.jpg",
            song_name:"How Long",
            artist:"Charlie Puth"
        },
        {
            id: 2,
            src:"/Assets/Songs/Attention-9xtunes.in.mp3",
            image_url:"/Assets/Images/attention.jpg",
            song_name:"Attention",
            artist:"Charlie Puth"
        },
        {
            id: 3,
            src:"/Assets/Songs/Charlie Puth Ft. Selena Gomez - We Dont Talk Anymore.mp3",
            image_url:"/Assets/Images/we_don't_talk_anymore.jpg",
            song_name:"We don't talk Anymore",
            artist:"Charlie Puth(feat. Selena Gomez)"
        },
        {
          id: 4,
          src:"/Assets/Songs/Dua Lipa - New Rules (DawnFoxes.com).mp3",
          image_url:"/Assets/Images/new_rules.jpg",
          song_name:"New Rules",
          artist:"Dua Lipa"
      },
      {
          id: 5,
          src:"/Assets/Songs/Let Me Love You - DJ Snake Ft Justin Bieber (DJJOhAL.Com).mp3",
          image_url:"/Assets/Images/let_me_love_you.jpg",
          song_name:"Let me love you",
          artist:"Justin Bieber"
      },
      {
        id: 6,
        src:"../Assets/Songs/Avicii ft. Rita Ora - Lonely Together (Alan Walker Remix)(MyMp3Maza.in).mp3",
        image_url:"/Assets/Images/Lonely_together.jpg",
        song_name:"Lonely Together",
        artist:"Avicii ft.Rita Ora"
    },
    {
        id: 7,
        src:"../Assets/Songs/Rita_Ora_Anywhere.mp3",
        image_url:"/Assets/Images/Rita_Ora_-_Anywhere.jpg",
        song_name:"Anywhere",
        artist:"Rita Ora"
    },
    {
        id: 8,
        src:"/Assets/Songs/Rockabye (feat. Sean Paul & Anne-Marie) (Mp3beet.Com) - 192Kbps.mp3",
        image_url:"/Assets/Images/rockabye.jpg",
        song_name:"Rockabye",
        artist:"AnneMarie feat. Sean Paul"
    },
    {
        id: 9,
        src:"/Assets/Songs/Camila_Cabello_-_Havana_Audio_ft_Young_Thug[ListenVid.com].mp3",
        image_url:"/Assets/Images/havana.jpg",
        song_name:"Havana",
        artist:"Camila Cabello"
    },
    {
        id: 10,
        src:"/Assets/Songs/Taylor Swift - Look What You Made Me Do (Mp3Goo.com).mp3",
        image_url:"/Assets/Images/taylor_swift.jpg",
        song_name:"Look what you made me do",
        artist:"Taylor Swift"
    },
    {
        id: 11,
        src:"/Assets/Songs/Shape of You - Ed Sheeran (DJJOhAL.Com).mp3",
        image_url:"/Assets/Images/shape_of_you.jpg",
        song_name:"Shape of you",
        artist:"Ed Sheeran"
    },
    {
        id: 12,
        src:"/Assets/Songs/the-weeknd-hurt-you-feat-gesaffelstein.mp3",
        image_url:"/Assets/Images/hurt_you.jpg",
        song_name:"Hurt You",
        artist:"The Weeknd"
    }
    ]
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
      isSettingsClicked: false,
      songDisplay: false,
      isPlayed: false
    });
  }

  // Go to the next item using click
  nextItem = () => {
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);
    let actElt=$('.active');
    let nextElt=$('.active').next();
    if(nextElt.length!==0){
      $(nextElt)[0].scrollIntoView();
      actElt.removeClass('active');
      nextElt.addClass('active');
    }
  }

  // Go to the prev item using click
  prevItem = () => {
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);
    let actElt=$('.active');
    let prevElt=$('.active').prev();
    if(prevElt.length!==0){
      $(prevElt)[0].scrollIntoView();
      actElt.removeClass('active');
      prevElt.addClass('active');
    }
  }

  // goes back one page in the application
  backClick = () => {
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);
    let {isGameClicked,isMusicClicked,isSettingsClicked,isMenuClicked,songDisplay,isPlayed}=this.state;

    // Find the point right now the ipod is at and navigate forward or back likewise
    if(!isGameClicked && !isMenuClicked && !isSettingsClicked && !isMusicClicked) return;
    if(isMenuClicked) isMenuClicked=false;
    else if(isGameClicked || isSettingsClicked){
      isGameClicked=false;
      isSettingsClicked=false;
      isMenuClicked=true;
    }
    else if(isPlayed){
      isPlayed=false;
      songDisplay=true;
    }
    else if(isMusicClicked && songDisplay) songDisplay=false;
    else if(isMusicClicked){
      isMusicClicked=false;
      isMenuClicked=true;
    }

    this.setState({
      isMenuClicked: isMenuClicked,
      isGameClicked: isGameClicked,
      isMusicClicked: isMusicClicked,
      isSettingsClicked: isSettingsClicked,
      songDisplay: songDisplay,
      isPlayed: isPlayed
    });
  }

  // Ok button to select the currently active item
  okClick = () => {
    let {isGameClicked,isMusicClicked,isSettingsClicked,isMenuClicked,songDisplay,songs,isPlayed,songId}=this.state;
    this.state.zt.unbind(document.getElementsByClassName('menu-region')[0]);

    // Find the active selection and accordingly set state
    let selection=$('.active').prop('id');
    isMenuClicked=false;
    if(selection==='list-games-list') isGameClicked=true;
    if(selection==='list-music-list') isMusicClicked=true;
    if(selection==='list-settings-list') isSettingsClicked=true;
    if(selection==='back'){
      isMusicClicked=false;
      isMenuClicked=true;
    }
    if(selection==='all-songs-list' || selection==='favourite-list' || selection==='playlist'){
      songDisplay=true;
    }

    songs.map(song =>{
      if(song.id===parseInt(selection)){
        songDisplay=false;
        isPlayed=true;
        songId=song.id;
      }
      return 0;
    });

    this.setState({
      isMenuClicked: isMenuClicked,
      isGameClicked: isGameClicked,
      isMusicClicked: isMusicClicked,
      isSettingsClicked: isSettingsClicked,
      songDisplay: songDisplay,
      isPlayed: isPlayed,
      songId: songId
    },()=>{
      if(selection==='back'){
        $('#list-home-list').removeClass('active');
        $('#list-music-list').addClass('active');
      }
    });
  }

  playClick = (index) =>{
    this.setState({
      songDisplay: false,
      isPlayed: true,
      songId: index
    });
  }

  render() {
    const {isMenuClicked,isGameClicked,isMusicClicked,isSettingsClicked,songDisplay,isPlayed,songId,date}=this.state;
    return (
      <div className="App">
        <h1 style={{marginBottom:'20px'}}><FontAwesomeIcon icon={faAppleAlt} /> My IPod</h1>
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
               <h3 style={{color:'#ffffff',fontFamily:'cursive'}}>Enter your password</h3>
               <h2 style={{margin:'20px',color:'#ffffff',fontFamily:'monospace',fontSize:'30px'}}>
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
              <img src="https://www.collinsdictionary.com/images/full/dice_393025615_1000.jpg" alt="games"></img>
              <h3>Games</h3>
            </div>}

            {isMusicClicked && 
            <div className="music">
              <Music songDisplay={songDisplay} songs={this.state.songs} isPlayed={isPlayed} index={songId} playClick={this.playClick}/>
            </div>}

            {isSettingsClicked && 
            <div className="settings">
              <img src="https://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Settings-icon.png" alt="settings"></img>
              <h3>Settings</h3>
            </div>}
          </div>

          <div className="box">
            <div className="menu-region" draggable="false" onClick={()=>{this.rotateEvent()}}>
              <h3 className="item1" onClick={() => this.menuDisplay()}>Menu</h3>
              <h3 className="item2" onClick={() =>this.nextItem()}><FontAwesomeIcon icon={faFastForward} /></h3>
              <h3 className="item3" onClick={() => this.prevItem()}><FontAwesomeIcon icon={faFastBackward} /></h3>
              <h3 className="item4" onClick={() => this.backClick()}><FontAwesomeIcon icon={faChevronLeft} /> Back</h3>
              <button className="okbutton" onClick={()=>{this.okClick()}}><b>OK</b></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
