import React from "react";
import formatDistanceToNow  from 'date-fns/formatDistanceToNow'


const Thumbnail = ({ props }) => {
    return (
        <div className="thumbnail-details" onClick={props.accessBlog}>
            <div className="tag--container">
                <h4 className="title">{props.title}</h4>
                <div className="tag">{props.category}</div> 
            </div>   
            <p><strong>{props.description}</strong></p>
            <p className="thumbnail--date">Posted: {formatDistanceToNow(new Date(props.createdAt), {addSuffix: true})}</p>
        </div>
    );
};


export default Thumbnail;