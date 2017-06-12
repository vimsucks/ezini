[![Build Status](https://travis-ci.org/vimsucks/ezini.svg?branch=master)](https://travis-ci.org/vimsucks/ezini)


An very easy to user ini file parser and serializer for node.js

## Installation
```
npm install --save ezini
```

## Usage
```javascript
const ini = require("ezini");
```

### `parse(str, callback)`
```javascript
ini.parse(str, (obj) => {
    console.log(obj)
})
```
or use the  synchronize version `parseSync(str)`

### `stringify(obj, callback)`
```javascript
ini.stringify(obj, (str) => {
    console.log(str)
})
```
or use the  synchronize version `stringifySync(obj)`

## Example
Giving a example ini file `foobar.ini` which looks like this:
```ini
[owner]
name=John Do
organization=Acme eProducts
rich=true
richStr="true"


[database]
server=192.0.2.42
; use IP address in case network name resolution is not working
port=143
portStr="143"
file = "acme payroll.dat"
```
You can parse this ini file like this:
```javascript
str = fs.readFileSync(".foobar"), "utf-8")
ini.parse(strINI, (obj) => {
    console.log(obj)
})
```
and then `obj` would looks like this:
```javascript
{ owner: 
   { name: 'John Do',
     organization: 'Acme eProducts',
     rich: true,
     richStr: 'true' },
  database: 
   { server: '192.0.2.42',
     port: 143,
     portStr: '143',
     file: 'acme payroll.dat' } }
```
You can also stringify the object:
```javascript
ini.stringify(obj, (str) => {
    console.log(str)
})
```
`str` would looks like this:
```ini
[owner]
name=John Do
organization=Acme eProducts
rich=true
richStr="true"

[database]
server=192.0.2.42
port=143
portStr="143"
file=acme payroll.dat
```
