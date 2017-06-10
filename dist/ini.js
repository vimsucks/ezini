"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var os = require("os");

function parse(str) {
    var output = {};
    var section = null;

    var lines = str.split(os.EOL);
    lines.forEach(function (line) {
        // skip if empty or comment line
        // remove comment
        line = line.replace(/;.*/, "");
        if (line.trim().length === 0) return;
        // if this line is section
        var match = line.match(/^\[(.*)\]$/);
        if (match && match[1] !== undefined) {
            section = match[1].trim();
            output[section] = {};
        } else {
            match = line.match(/^(.*)\=(.*)$/);
            if (match && match[1] !== undefined && match[2] != undefined) {
                if (section === null) {
                    output[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
                } else {
                    output[section][match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
                }
            }
        }
    });
    return output;
}

function stringify(ini) {
    var output = "";
    var firstOccur = true;

    Object.keys(ini).forEach(function (key) {
        if (typeof ini[key] === "string") {
            output += key + "=" + ini[key] + os.EOL;
        } else if (_typeof(ini[key]) === "object") {
            if (firstOccur) {
                firstOccur = false;
            } else {
                output += os.EOL;
            }
            output += "[" + key + "]" + os.EOL;
            Object.keys(ini[key]).forEach(function (innerKey) {
                output += innerKey + "=" + ini[key][innerKey] + os.EOL;
            });
        }
    });
    return output.substring(0, output.length - 1);
}

exports.parse = parse;
exports.stringify = stringify;
//# sourceMappingURL=ini.js.map