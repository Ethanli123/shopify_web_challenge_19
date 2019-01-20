import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Card extends Component {

    // converts str into a react component
    parseToReact = (str) => {
        // inner nested call returns an html string with all entities replaced
        // outer call converts html string to component
        return ReactHtmlParser(ReactHtmlParser(str)); 
    } // parseToReact

    // favourites or unfavourites the item when user clicks on star
    handleClick = (e) => {
        e.preventDefault();

        if (this.props.isFavourite) {
            this.props.unfavourite(this.props.id);
        } else {
            this.props.favourite(this.props.id);
        } // if
    } // handleClick

    render() {
        let color = this.props.isFavourite ? "#23975E" : "grey"; 

        return (
            <div className="card">
                <div className="cardLeft">
                    <div className="favButton" onClick={this.handleClick} style={{ color }}>★</div>
                    <p>{this.props.row.title}</p>
                </div>
                <div className="cardRight">{this.parseToReact(this.props.row.body)}</div>
            </div>
        )
    } // render
} // Card

export default Card;