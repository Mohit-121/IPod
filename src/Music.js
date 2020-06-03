import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faAppleAlt,faBackward,faPause,faForward, faPlay } from "@fortawesome/free-solid-svg-icons";
import './Music.css';

class Music extends React.Component{
           
    render() {
        const {songDisplay,songs,isPlayed,index,playClick,pauseButtonHandler,isPaused,prevHandler,nextHandler}=this.props;
        const curSong=songs[index-1]
        return (
            <div className="Music">
                {!songDisplay && !isPlayed &&
                <div className="row">
                    <div className="col-7">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action dropdown-item active" id="all-songs-list" data-toggle="list" href="#all-songs-list" role="tab" aria-controls="allSongs">All Songs</a>
                            <a className="list-group-item list-group-item-action" id="favourite-list" data-toggle="list" href="#favourite-list" role="tab" aria-controls="myFavourites">My Favourite</a>
                            <a className="list-group-item list-group-item-action" id="playlist" data-toggle="list" href="#playlist" role="tab" aria-controls="playlist">PlayList</a>
                            <a className="list-group-item list-group-item-action" id="back" data-toggle="list" href="#back" role="tab" aria-controls="back">
                                <span style={{fontSize:'15px'}}><FontAwesomeIcon icon={faChevronLeft} /></span> Back
                            </a>
                        </div>
                    </div>
                </div>}

                {isPlayed &&
                <div className="music-player">
                    <h3><FontAwesomeIcon icon={faAppleAlt} /> IPod Player</h3>
                    <div className="image-details">
                        <div className="image-container">
                            <img src={curSong.image_url} alt={curSong.song_name}></img>
                        </div>
                        <div className="details">
                            <h4>{(index<10?"0"+index:index)+". "+(curSong.song_name.length>18?curSong.song_name.substring(0,18)+"...":curSong.song_name)}</h4>
                            <h5>-By {curSong.artist.length>10?curSong.artist.substring(0,10)+"...":curSong.artist}</h5>
                        </div>
                    </div>
                    <div className="player">
                        <h3 onClick={()=>prevHandler()}><FontAwesomeIcon icon={faBackward} /></h3>
                        &ensp;&ensp;<h3 onClick={()=>pauseButtonHandler()}><FontAwesomeIcon icon={isPaused?faPlay:faPause} /></h3>
                        &ensp;&ensp;<h3 onClick={()=>nextHandler()}><FontAwesomeIcon icon={faForward} /></h3>
                        &ensp;&ensp;
                        <div className="player-details">
                            <div className="player-div" id="scrolling-div">
                                <div className="finished"></div>
                            </div>
                            <div>
                                <span className='start-time'>0:00</span>
                                <span className='end-time' style={{float:'right'}}>0:00</span>
                            </div>
                        </div>
                    </div>
                </div>}

                {songDisplay &&
                <div className="songs-list">
                    <h3 style={{textAlign:'center'}}>All Songs</h3>
                    <div className="list-group" id="list-tab" role="tablist">
                        {
                            songs.map((song,index) =>(
                                <a className={"list-group-item list-group-item-action "+(index===0?"active":"")} id={song.id} data-toggle="list" href={"#"+song.id} 
                                    role="tab" aria-controls={song.id} key={index}>
                                    {(index+1)+" "+song.song_name} <button type="button" onClick={() =>{playClick(index+1)}} className="btn btn-success">Play</button>
                                </a>
                            ))
                        }
                    </div>
                </div>}
            </div>
        );
    }
}

export default Music;