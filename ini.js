"use strict"
const os = require("os")

function parse(str, callback) {
    process.nextTick(() => {
        var output = parseSync(str)
        callback(output)
    })
}

function parseSync(str) {
    var output = {}
    var section = null

    var lines = str.split(os.EOL)
    lines.forEach((line) => {
        // skip if empty or comment line
        // remove comment
        line = line.replace(/;.*/, "")
        if (line.trim().length ===0)  return
        // if this line is section
        var match = line.match(/^\[(.*)\]$/)
        if (match && match[1] !== undefined) {
            section = match[1].trim()
            output[section]={}
        } else {
            match = line.match(/^(.*)\=(.*)$/)
            if (match && match[1] !== undefined && match[2] != undefined) {
                if (section === null) {
                    output[match[1].trim()]=match[2].trim().replace(/^"|"$/g, "")
                } else {
                    output[section][match[1].trim()]=match[2].trim().replace(/^"|"$/g, "")
                }
            } else {
                return
            }
        }
    })
    return output
}

function stringify(obj, callback) {
    process.nextTick(() => {
        var str = stringifySync(obj)
        callback(str)
    })
}

function stringifySync(obj) {
    var output = ""
    var firstOccur = true

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "string") {
            output += key + "=" + obj[key] + os.EOL
        // } else if (typeof obj[key] === "object") {
        } else {
            if (firstOccur) {
                firstOccur = false
            } else {
                output += os.EOL
            }
            output += "[" + key + "]" + os.EOL
            Object.keys(obj[key]).forEach((innerKey) => {
                output += innerKey + "=" + obj[key][innerKey] + os.EOL
            })
        }
    })
    return output.substring(0, output.length - 1)
}

exports.parse = parse
exports.parseSync = parseSync
exports.stringify = stringify
exports.stringifySync = stringifySync
