const quoteRegex = /"/gm;

function surroundWithDoubleQuote(string, isSurronded) {
    // Surround already existing double quotes with another set of double quotes..
    // ..so it doesn't cause any problems. 
    string = string.replace(quoteRegex, '""'); 
    if(isSurronded) return `"${string}"`;
    return string;
}

function findObjectWithLongestKeys(objects) {
    const objectWithLongestKeys = objects.map((object, index) => {return {index:index, length: Object.keys(object).length}}).reduce((previous, current) => previous.length > current.length ? previous : current);
    return objects[objectWithLongestKeys.index]
}

exports.parse = function (csvFile) {
    // Parse a csv file then return an object
}

exports.stringify = function (objects, options) {
    // Turn an object to a CSV file
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