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
            let query = queryStr.split(' '); // separate keywords in the query string
            let res = api.search(query);     // query results (in the form of a list of indexes)

            // converts indexes to tuples
            let tuples = res.map((id) => {
                return { id: id, isFavourite: this.state.favourites.includes(id) };
            });

            this.setState({ searchResults: tuples });
        } // if
    } // handleSearch

    // renders the list of results of the most recent search in the form of a list of Cards
    renderSearchResults = () => {
        let list = this.state.searchResults.map((tuple) => {
            let row = api.getById(tuple.id);

            if (row) {
                return (
                  <Card key={tuple.id} row={row} id={tuple.id} isFavourite={tuple.isFavourite}
                        favourite={this.favourite} unfavourite={this.unfavourite} />
                );
            } else {
                return (<div key={tuple.id}></div>);
            } // if
        });

        return list;
    } // renderSearchResults
    
    // renders the list of favourites in the form of a list of Cards
    renderFavourites = () => {
        let list = this.state.favourites.map((id) => {
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
        let newResults = JSON.parse(JSON.stringify(this.state.searchResults)); // creates deep copy

        // change the isFavourite flag of the item to be added to true
        newResults = newResults.map((tuple) => {
            if (tuple.id === id) {
                return { id: tuple.id, isFavourite: true };
            } else {
                return tuple;
            } // if
        });

        // update state, and prompt re-render
        this.setState({
            searchResults: newResults,
            favourites: [...this.state.favourites, id]
        });
    } // favourite

    // remove an item from the favourite list, then prompt a re-render
    unfavourite = (id) => {
        let newResults = JSON.parse(JSON.stringify(this.state.searchResults)); // creates deep copy
        let newFavourites = this.state.favourites.slice();                     // creates copy of array

        // change the isFavourite flag of the item to be removed to false
        newResults = newResults.map((tuple) => {
            if (tuple.id === id) {
                return { id: tuple.id, isFavourite: false };
            } else {
                return tuple;
            } // if
        });

        // remove the index of the unfavourited item from favourites
        newFavourites = newFavourites.filter((rowId) => {
            if (rowId !== id) {
                return true;
            } else {
                return false;
            } // if
        });

        // update state, and prompt re-render
        this.setState({
            searchResults: newResults,
            favourites: newFavourites
        });
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
