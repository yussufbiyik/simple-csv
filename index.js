const quoteRegex = /"/gm;

function surroundWithDoubleQuote(string, isSurronded) {
    // Surround already existing double quotes with another set of double quotes
    // so it doesn't cause any problem. 
    string = string.replace(quoteRegex, '""'); 
    if(isSurronded) return `"${string}"`;
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

// Returns a CSV string with the given objects and options
exports.stringify = function (objects, options) {
    let = seperator = ","
    let = isSurronded = true
    if(options) {
        seperator = options.seperator ? options.seperator : seperator;
        isSurronded = options.isSurronded ? options.isSurronded : isSurronded;
    }
    // Headers are generated based on the object with the longest length of keys.
    const headers = Object.keys(findObjectWithLongestKeys(objects)).map(key => surroundWithDoubleQuote(key, isSurronded)).join(seperator);
    let csv = headers;
    // Get values of each object and add them to the csv string
    for (let index = 0; index < objects.length; index++) {
        const object = objects[index];
        const data = Object.values(object).map(value => surroundWithDoubleQuote(value, isSurronded)).join(seperator);
        csv += `\n${data}`;
        if(index === objects.length - 1) {
            return csv;
        }
    }
}