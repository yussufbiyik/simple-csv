// I have not tested this so don't judge.

const quoteRegex = /"/gmi;

function surroundWithDoubleQuote(string, isSurroundedWithDoubleQuote) {
    // Surround already existing double quotes with another set of double quotes..
    // ..so it doesn't cause any problems. 
    string.replace(quoteRegex, '""'); 
    if(isSurroundedWithDoubleQuote) return `"${string}"`;
    return string;
}

function findObjectWithLongestKeys(objects) {
    // some code
}

exports.parse = function (csvFile) {
    // Parse a csv file then return an object
}

exports.stringify = function (objects, options) {
    // Turn an object to a CSV file
    const seperator = options.seperator ? options.seperator : ",";
    const isSurroundedWithDoubleQuote = options.isSurroundedWithDoubleQuote ? options.isSurroundedWithDoubleQuote : false;
    // Headers are generated based on the object with the longest length of keys.
    const headers = Object.keys(findObjectWithLongestKeys(objects)).map(key => surroundWithDoubleQuote(key, isSurroundedWithDoubleQuote)).join(seperator);
    let csv = headers;
    // Get values of each object and add them to the csv string
    for (let index = 0; index < objects.length; index++) {
        const object = objects[index];
        const data = Object.values(object).map(value => surroundWithDoubleQuote(value, isSurroundedWithDoubleQuote)).join(seperator);
        csv += `\n${data}`;
        if(index === objects.length - 1) {
            return csv;
        }
    }
}