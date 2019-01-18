import table from './table.json'; 

let data = JSON.parse(JSON.stringify(table)); // parse json data into workable form

// returns the item associated with the given id
function getById(id) {
    if (id < 0 || id > data.length - 1) {
        return null;
    } else {
        return data[id];
    } // if
} // getById

// searches data with the given query (in the form of an array of keywords)
function search(query) {
    let results = [];

    table.forEach((row, index) => {
        let category = row.category;
        let keywords = row.keywords;

        for (let i = 0;i < query.length;i++) {
            let key = query[i];
    
            if (category.includes(key) || keywords.includes(key)) {
                results.push(index);
                break;
            } // if
        } // for
    });

    return results;
} // search

export default {
    getById,
    search
};