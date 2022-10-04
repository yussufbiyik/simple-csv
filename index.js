const quoteRegex = /"/gm;
const newLineRegex = /(\r\n|\r|\n)/gm;
const twoDoubleQuoteRegex = /""/gm;

function surroundWithDoubleQuote(string, isSurrounded) {
    if(isSurrounded === true) {
        // Surround already existing double quotes
        // with another set of double quotes
        // so it doesn't cause any problem.
        string = string.replace(quoteRegex, "\"\"");
        return `"${string}"`;
    }
    return string;
}

function findObjectWithLongestKeys(objects) {
    // Use .map to create an object
    // containing the index and key length of each object
    // Compare objects by using .reduce
    const objectWithLongestKeys = objects
        .map(function (object, index) {
            const returns = {};
            returns.index = index;
            returns.length = Object.keys(object).length;
            return returns;
        })
        .reduce(function (previous, current) {
            if(previous.length > current.length) {
                return previous;
            } else {
                return current;
            }
        });
    return objects[objectWithLongestKeys.index];
}

function unSurround(string) {
    return string
        .trim()
        .substring(1, string.trim().length-1)
        .replace(twoDoubleQuoteRegex, "\"");
}

/**
 * Returns an array of objects by parsing a CSV string.
 * @param {string} csv
 * Source of the output object as a string containing CSV data
 * @param {object=} [options={seperator:",", isSurrounded: true}]
 * Specifies the properties of the output
 * @param {string} options.seperator
 * Seperator that is used in the CSV to seperate the values
 * @param {Boolean} options.isSurrounded
 * Specifies if the values are seperated by double quotes,
 * if true, assumes that all the values are surrounded by double quotes,
 * is true by default
 * @returns {object[]}
 * Object containing parsed CSV data from the passed CSV string
 */
exports.parse = function (csv, options) {
    const seperator = ((options && options.seperator) ? options.seperator : ",");
    const isSurrounded = ((options && !options.isSurrounded) ? options.isSurrounded : true);
    const lines = csv.split(newLineRegex)
        .filter((line) => line.length>1)
        .map((line) => line.trim());
    const firstLine = lines.shift();
    lines.pop();
    const keys = firstLine
        .split(seperator)
        .map((key) => (isSurrounded === false) ? key.trim() : unSurround(key));
    const parsedCsvArray = [];
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const entries = line
            .split(seperator)
            .map((entry) => (isSurrounded == false) ? entry.trim() : unSurround(entry));
        const parsedCsvObject = {};
        keys.forEach((key, index) => {
            if(index <= entries.length-1) {
                parsedCsvObject[key] = entries[index];
            }
        })
        parsedCsvArray.push(parsedCsvObject);
    }
    return parsedCsvArray;
};

/**
 * Returns a CSV string with the given objects and options.
 * Amount of keys in an object does not matter,
 * only things that matter are order of the keys and their names.
 * @param {object[]} objects
 * Source of the CSV string as an array of objects
 * @param {object=} [options={seperator:",", isSurrounded: true}]
 * Specifies the properties of the output
 * @param {string} options.seperator
 * Seperator that is going to be used to seperate the values
 * @param {Boolean} options.isSurrounded
 * Specifies if the value is going to be surrounded with double quotes,
 * is true by default
 * @returns {string}
 * A string containing stringified object data from the passed array of objects.
 */
exports.stringify = function (objects, options) {
    const seperator = ((options && options.seperator) ? options.seperator : ",");
    const isSurrounded = ((options && !options.isSurrounded) ? options.isSurrounded : true);
    // Headers are generated based on
    // the object with the longest length of keys.
    const headers = Object.keys(findObjectWithLongestKeys(objects))
        .map((key) => surroundWithDoubleQuote(key, isSurrounded))
        .join(seperator);
    let csv = headers;
    // Get values of each object and add them to the csv string
    for (let index = 0; index < objects.length; index++) {
        const object = objects[index];
        const data = Object.values(object)
            .map((value) => surroundWithDoubleQuote(value, isSurrounded))
            .join(seperator);
        csv += `\n${data}`;
        if(index === objects.length - 1) {
            return csv;
        }
    }
};