# simple-csv (WIP)
Very simple module to work with CSV, inspired by the simpleness of built-in JSON object of JavaScript.
## Methods
### ```.stringify```
Returns a CSV string with the given objects and options. Amount of keys in an object does not matter, only things that matter are order of the keys and their names.
#### Parameters
```objects```
Source of the CSV string as an array of objects
```options```
Specifies the properties of the output
1.  ```seperator```
**Type:** string
Seperator that is going to be used to seperate the values.
2.  ```isSurrounded```
**Type:** Boolean
Specifies if the value is going to be surrounded with double quotes, is true by default.

---
### ```.parse```
Returns an array of objects by parsing a CSV string.
#### Parameters
```csv```
Source of the output object as a string containing CSV data.
```options```
Specifies the properties of the output
1.  ```seperator```
**Type:** string
Seperator that is going to be used to seperate the values.
2.  ```isSurrounded```
**Type:** Boolean
Specifies if the values are seperated by double quotes, if true, assumes that all the values are surrounded by double quotes, is true by default.