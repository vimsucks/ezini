[![Build Status](https://travis-ci.org/vimsucks/ezini.svg?branch=master)](https://travis-ci.org/vimsucks/ezini)


An very easy to use ini file parser and serializer for node.js

## Installation
```
npm install --save ezini
```

## Usage
```javascript
const ini = require("ezini");
```

### `parse(str, options, callback)`
```javascript
ini.parse(str, options, (obj) => {
    console.log(obj)
})
```
where `options` is a simple object, for now it only support one option `{preserveQuotes: true}`

or you can use the  synchronize version `parseSync(str, options)`

> In order to keep backward compatibility, the second parameter `options` can also be assigned a callback function (e.g. `parse(str, callback)`)

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
str = fs.readFileSync("foobar.ini"), "utf-8")
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

but if `perserveQuotes` is set to `true`, like this:
```javascript
str = fs.readFileSync("foobar.ini"), "utf-8")
ini.parse(strINI, {preserveQuotes: true}, (obj) => {
    console.log(obj)
})
```

the output will be like this
```javascript
{ owner: 
   { name: 'John Do',
     organization: 'Acme eProducts',
     rich: true,
     richStr: '"true"' },
  database: 
   { server: '192.0.2.42',
     port: 143,
     portStr: '"143"',
     file: '"acme payroll.dat"' } }
```

You can also stringify the the first output object like this:
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
