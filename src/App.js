import React, { Component } from 'react';
import './App.css';
import api from './api';
import Card from './components/card';

class App extends Component {
    state = {
        searchResults: [], // array of tuples (int: item index, bool: is the item bookmarked)
        favourites: []     // array of indexes of favourited items
    };

    // searches the database with the given query and stores results
    handleSearch = (e) => {
        e.preventDefault();
        let queryStr = e.target[0].value.toLowerCase().trim(); // format input

        // do nothing if user doesn't input anything
        if (queryStr !== "") {
            let query = queryStr.split(' ');       // separate keywords in the query string
            let searchResults = api.search(query); // query results (in the form of a list of indexes
            this.setState({ searchResults });
        } // if
    } // handleSearch

    // renders the list of results of the most recent search in the form of a list of Cards
    renderSearchResults = () => {
        let list = this.state.searchResults.map(id => {
            let row = api.getById(id);

            if (row) {
                return (
                  <Card key={id} row={row} id={id} isFavourite={this.state.favourites.includes(id)}
                        favourite={this.favourite} unfavourite={this.unfavourite} />
                );
            } else {
                return (<div key={id}></div>);
            } // if
        });

        return list;
    } // renderSearchResults
    
    // renders the list of favourites in the form of a list of Cards
    renderFavourites = () => {
        let list = this.state.favourites.map(id => {
            let row = api.getById(id);

            if (row) {
                return (
                  <Card key={id} row={row} id={id} isFavourite={true}
                        favourite={this.favourite} unfavourite={this.unfavourite} />
                );
            } else {
                return (<div key={id}></div>);
            } // if
        });

        return list;
    } // renderFavourites

    // adds a new item to the favourite list, then prompt a re-render
    favourite = (id) => {
        this.setState({ favourites: [...this.state.favourites, id] });
    } // favourite

    // remove an item from the favourite list, then prompt a re-render
    unfavourite = (id) => {  
        // remove the index of the unfavourited item from favourites
        let newFavourites = this.state.favourites.filter(rowId => rowId !== id);

        // update state, and prompt re-render
        this.setState({ favourites: newFavourites });
    } // unfavourite

    render() {
        return (
            <div>
                <div className="banner"><strong>Toronto Waste Lookup</strong></div>
                <div className="searchBar">
                    <form onSubmit={this.handleSearch}>
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>

                <div>{this.renderSearchResults()}</div>
                <div className="favs">
                    <h1>Favourites</h1>
                    {this.state.favourites.length >= 1 && this.renderFavourites()}
                </div>
            </div>
        );
    } // render
} // App

export default App;
