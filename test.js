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

// Dummy CSV strings from https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html
const csvStrings = [
    `"Day of Week", "Number of Crashes"
    "Sunday is the best ""day""", "13664"
    "Monday is the worst ""day""", "17279"
    "Tuesday", "17337"
    "Wednesday", "17394"
    "Thursday", "17954"
    "Friday", "19147"
    "Saturday", "15714"`
]

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

function testStringify() {
    console.log(`\n[[ no options ]]]\n${CSV.stringify(objects)}\n[[[ no options ]]]`)
    optionsArray.forEach(options => {
        console.log(options)
        console.log(
            `\n[[[ ${options.identifier} ]]]\n${CSV.stringify(objects, options.options)}\n[[[ ${options.identifier} ]]]`
        )
    })
}

function testParse() {
    console.log(CSV.parse(csvStrings[0], {seperator:',', isSurrounded:true}))
    // console.log(CSV.parse(csvStrings[1], {seperator:',', isSurrounded:false}))
}

testParse()
testStringify()