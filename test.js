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
    {
        headerOne: "some data",
        headerTwo: '"I already have some "double quotes", can you handle this?"',
        headerThree: "kimi",
    },
]

// Dummy CSV files can be downloaded from https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html maybe?

// Dummy options
const optionsArray = [
    {
        identifier: "default",
        options:{
            seperator: ",",
            isSurrounded: true
        }
    },{
        identifier: "not surrounded and seperated with '|'",
        options:{
            seperator: "|",
            isSurrounded: false
        }
    },{
        identifier: "seperated with ';'",
        options:{
            seperator: ";",
        }
    },{
        identifier: "not surrounded",
        options:{
            isSurrounded: false
        }
    }
]

console.log(
    `\n[[ no options ]]]\n${CSV.stringify(objects)}\n[[[ no options ]]]`
)
optionsArray.forEach(options => {
    console.log(options)
    console.log(
        `\n[[[ ${options.identifier} ]]]\n${CSV.stringify(objects, options.options)}\n[[[ ${options.identifier} ]]]`
    )
})