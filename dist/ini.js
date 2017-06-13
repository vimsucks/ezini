"use strict";

var os = require("os"

/**
 * Parse a INI-format string to an object
 * @param {string} str INI-format string
 * @returns {Object} Object parsed from the given string
 */
);function parseSync(str) {
	var output = {};
	var section = null;

	var lines = str.split(os.EOL);
	lines.forEach(function (rawLine) {
		// skip if empty or comment line
		// remove comment
		var line = rawLine.replace(/;.*/, "");
		if (line.trim().length === 0) return;
		// if this line is section
		var match = line.match(/^\[(.*)]$/);
		if (match && match[1] !== undefined) {
			section = match[1].trim();
			output[section] = {};
		} else {
			match = line.match(/^(.*)=(.*)$/);
			if (match && match[1] !== undefined && match[2] !== undefined) {
				// if value is a boolean value
				var key = match[1].trim();
				var value = match[2].trim();
				if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
					value = !!value;
				} else if (!isNaN(value)) {
					// if value is a number
					value = +value;
				} else {
					// regard value as string
					value = value.replace(/^"|"$/g, "");
				}

				if (section === null) {
					output[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
					output[key] = value;
				} else {
					output[section][key] = value;
				}
			}
		}
	});

	return output;
}

/**
 * Async wrapper of function parseSync
 * @param {string} str INI-format string
 * @param callback Callback after parsing complete,
 *     should have one parameter: obj(the parsed object)
 */
function parse(str, callback) {
	process.nextTick(function () {
		var output = parseSync(str);
		callback(output);
	});
}

/**
 * Stringify an object to an ini-format string
 * @param {Object} obj Object to be stringify
 * @returns {string} INI-format string which is stringified from given object
 */
function stringifySync(obj) {
	var output = "";
	var firstOccur = true;

	Object.keys(obj).forEach(function (key) {
		if (typeof obj[key] === "string") {
			output += key + "=" + obj[key];
			output += os.EOL;
		} else {
			if (firstOccur) {
				firstOccur = false;
			} else {
				output += os.EOL;
			}

			output += "[" + key + "]";
			output += os.EOL;
			Object.keys(obj[key]).forEach(function (innerKey) {
				var value = obj[key][innerKey];
				if (typeof value === "string") {
					// if value can ber converted to number or boolean,
					// but it should be a string,
					// so keep the quotes to indicate its type
					if (!isNaN(value) || value.toLowerCase() === "true" || value.toLowerCase() === "false") {
						value = "\"" + value + "\"";
					}
				}

				output += innerKey + "=" + value;
				output += os.EOL;
			});
		}
	});

	return output;
}

/**
 * Async wrapper of function stringifySync
 * @param {Object} obj Object to be stringify
 * @param callback Callback after parsing complete,
 *     should have one parameter: str(stringified from given object)
 */
function stringify(obj, callback) {
	process.nextTick(function () {
		var str = stringifySync(obj);
		callback(str);
	});
}

exports.parse = parse;
exports.parseSync = parseSync;
exports.stringify = stringify;
exports.stringifySync = stringifySync;
//# sourceMappingURL=ini.js.map