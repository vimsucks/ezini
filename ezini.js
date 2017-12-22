const os = require("os")


/**
 * Parse a INI-format string to an object
 * @param {string} str INI-format string
 * @returns {Object} Object parsed from the given string
 */
function parseSync(str, options = {}) {
	const output = {}
	let section = null
	if (str.trim().length === 0) {
		return {}
	}
	const lines = str.split(os.EOL)
	lines.forEach((rawLine) => {
		// skip if empty or comment line
		// remove comment
		const line = rawLine.replace(/;.*/, "")
		if (line.trim().length === 0) return
		// if this line is section
		let match = line.match(/^\[(.*)]$/)
		if (match && match[1] !== undefined) {
			section = match[1].trim()
			output[section] = {}
		} else {
			match = line.match(/^(.*)=(.*)$/)
			if (match && match[1] !== undefined && match[2] !== undefined) {
				// if value is a boolean value
				const key = match[1].trim()
				let value = match[2].trim()
				if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
					value = !!value
				} else if (!isNaN(value)) {
					// if value is a number
					value = +value
				} else if (!options.preserveQuotes) {
					// regard value as string
					value = value.replace(/^"|"$/g, "")
				}

				if (section === null) {
					output[key] = value
				} else {
					output[section][key] = value
				}
			}
		}
	})

	return output
}

/**
 * Async wrapper of function parseSync
 * @param {string} str INI-format string
 * @param callback Callback after parsing complete,
 *     should have one parameter: obj(the parsed object)
 */
function parse(str, options, callback) {
	if (typeof options === 'function') {
		callback = options
		options = {}
	}
	process.nextTick(() => {
		const output = parseSync(str, options)
		callback(output)
	})
}

/**
 * Stringify an object to an ini-format string
 * @param {Object} obj Object to be stringify
 * @returns {string} INI-format string which is stringified from given object
 */
function stringifySync(obj) {
	let output = ""
	let firstOccur = true

	Object.keys(obj).forEach((key) => {
		if ([ "string", "number", "boolean" ].includes(typeof obj[key])) {
			output += `${key}=${obj[key]}`
			output += os.EOL
		} else {
			if (firstOccur) {
				firstOccur = false
			} else {
				output += os.EOL
			}

			output += `[${key}]`
			output += os.EOL
			Object.keys(obj[key]).forEach((innerKey) => {
				let value = obj[key][innerKey]
				if (typeof value === "string") {
					// if value can ber converted to number or boolean,
					// but it should be a string,
					// so keep the quotes to indicate its type
					if (!isNaN(value) || value.toLowerCase() === "true" || value.toLowerCase() === "false") {
						value = `"${value}"`
					}
				}

				output += `${innerKey}=${value}`
				output += os.EOL
			})
		}
	})

	return output
}

/**
 * Async wrapper of function stringifySync
 * @param {Object} obj Object to be stringify
 * @param callback Callback after parsing complete,
 *     should have one parameter: str(stringified from given object)
 */
function stringify(obj, callback) {
	process.nextTick(() => {
		const str = stringifySync(obj)
		callback(str)
	})
}


exports.parse = parse
exports.parseSync = parseSync
exports.stringify = stringify
exports.stringifySync = stringifySync
