const CSV = require('./index');

// Dummy data
const objects = [
    {
        headerOne: "some data",
        headerTwo: "some other data",
        headerThree: "kimi"
    },
    {
        headerOne: "some data",
        headerTwo: "some other data",
    },
    {
        headerOne: "some data",
        headerTwo: "some other data",
        headerThree: "kimi"
    },
    {
        headerOne: "some data",
    },
    {
        headerOne: "some data",
        headerTwo: "some other data",
        headerThree: "kimi",
        luckyOne: "I have 4 headers!"
    },
]

// Dummy options
const optionsAllSpecified = {
    seperator: ",",
    isSurronded: true
}
const optionsOnlySeperator = {
    seperator: ",",
}
const optionsOnlyQuotes = {
    isSurronded: true
}

const optionsArray = [
    {
        identifier: "default",
        options:{
            seperator: ",",
            isSurronded: true
        }
    },{
        identifier: "not surrounded and seperated with ';'",
        options:{
            seperator: ";",
            isSurronded: false
        }
    },{
        identifier: "seperated with ';'",
        options:{
            seperator: ";",
        }
    },{
        identifier: "not surrounded",
        options:{
            isSurronded: false
        }
    }
]

optionsArray.forEach(options => {
    console.log(
        `\n[[[${options.identifier}]]]\n${CSV.stringify(objects, options.options)}\n[[[${options.identifier}]]]`
    )
})