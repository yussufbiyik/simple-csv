const quoteRegex = /"/gm;

function surroundWithDoubleQuote(string, isSurrounded) {
    if(isSurrounded === true) {
        // Surround already existing double quotes with another set of double quotes
        // so it doesn't cause any problem. 
        string = string.replace(quoteRegex, '""'); 
        return `"${string}"`
    };
    return string;
}

function findObjectWithLongestKeys(objects) {
    // Use .map to create an object containing the index and key length of each object
    // Compare objects by using .reduce
    const objectWithLongestKeys = objects.map((object, index) => {return {index:index, length: Object.keys(object).length}}).reduce((previous, current) => previous.length > current.length ? previous : current);
    return objects[objectWithLongestKeys.index]
}

// Return an object by parsing a CSV string
exports.parse = function (csv, options) {
    // some code
}

/**
 * Returns a CSV string with the given objects and options.
 * Amount of keys in an object does not matter, only things that matter are order of the keys and their names.
 * @param {array} objects Source of the CSV string as an array of objects  
 * @param {object=} [options={seperator:",", isSurrounded: true}] Specifies the properties of the output
 * @param {string} options.seperator Seperator that is going to be used to seperate the values
 * @param {Boolean} options.isSurrounded Specifies if the value is going to be surrounded with double quotes
 * @returns {string} string with CSV data
 */
exports.stringify = function (objects, options) {
    let seperator = ","
    let isSurrounded = true
    if(options) {
        seperator = options.seperator ? options.seperator : seperator;
        isSurrounded = (options.isSurrounded == false) ? options.isSurrounded : isSurrounded;
    }
    // Headers are generated based on the object with the longest length of keys.
    const headers = Object.keys(findObjectWithLongestKeys(objects)).map(key => surroundWithDoubleQuote(key, isSurrounded)).join(seperator);
    let csv = headers;
    // Get values of each object and add them to the csv string
    for (let index = 0; index < objects.length; index++) {
        const object = objects[index];
        const data = Object.values(object).map(value => surroundWithDoubleQuote(value, isSurrounded)).join(seperator);
        csv += `\n${data}`;
        if(index === objects.length - 1) {
            return csv;
        }
    }
}