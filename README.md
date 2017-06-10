[![Build Status](https://travis-ci.org/vimsucks/ezini.svg?branch=master)](https://travis-ci.org/vimsucks/ezini)
An very easy to user ini file parser and serializer for node.js

## Installation
```bash
npm install --save ezini
```

## Usage
```node
const ini = require("ezini");
```
ezini has only two method

### parse(str)
Return an object which parsed from a ini-formated str

### stringify(obj)
Return an ini-formated string serialized from an Object

## Example
Giving a example ini file `foobar.ini` which looks like:
```ini
[owner]
name=John Do
organization=Acme eProducts

[database]
server=192.0.2.42
; use IP address in case network name resolution is not working
port=143 ; server port
file = "acme payroll.dat"
```
You can parse this ini file like this:
```javascript
strINI = fs.readFileSync(".foobar"), "utf-8")
obj = ini.parse(strINI)
```
and then `obj` whould looks like this:
```node
{ owner: { name: 'John Do', organization: 'Acme eProducts' },
database: { server: '192.0.2.42', port: '143', file: 'acme payroll.dat' } }
```
You can also stringify the object:
```node
str = ini.stringify(obj)
```
`str` looks like:
```ini
[owner]
name=John Do
organization=Acme eProducts

[database]
server=192.0.2.42
port=143
file=acme payroll.dat
```
