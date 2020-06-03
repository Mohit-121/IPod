import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faAppleAlt,faBackward,faPause,faForward } from "@fortawesome/free-solid-svg-icons";
import './Music.css';

class Music extends React.Component{
    render() {
        const {songDisplay}=this.props;
        return (
            <div className="Music">
                {!songDisplay &&
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

                {songDisplay &&
                <div className="music-player">
                    <h3><FontAwesomeIcon icon={faAppleAlt} /> IPod Player</h3>
                    <div className="image-details">
                        <div className="image-container">
                            <img src="https://a10.gaanacdn.com/images/albums/4/2098804/crop_175x175_2098804.jpg" alt="hurtyou"></img>
                        </div>
                        <div className="details">
                            <h4>01. Hurt you</h4>
                            <h5>-By Weekend</h5>
                        </div>
                    </div>
                    <div className="player">
                        <h3><FontAwesomeIcon icon={faBackward} /></h3>
                        &ensp;&ensp;<h3><FontAwesomeIcon icon={faPause} /></h3>
                        &ensp;&ensp;<h3><FontAwesomeIcon icon={faForward} /></h3>
                        &ensp;&ensp;
                        <div className="player-div">
                            <div className="finished"></div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Music;