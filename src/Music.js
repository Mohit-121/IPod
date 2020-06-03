import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

class Music extends React.Component{
    render() {
        return (
            <div className="Music">
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
                </div>
            </div>
        );
    }
}

export default Music;