const os = require("os")

function parseSync(str) {
	const output = {}
	let section = null

	const lines = str.split(os.EOL)
	lines.forEach((rawLine) => {
		// skip if empty or comment line
		// remove comment
		const line = rawLine.replace(/;.*/, "")
		if (line.trim().length === 0) return
		// if this line is section
		let match = line.match(/^\[(.*)\]$/)
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
					value = Boolean(value)
				} else if (!isNaN(value)) {
					// if value is a number
					value = Number(value)
				} else {
					value = value.replace(/^"|"$/g, "")
				}
				if (section === null) {
					output[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "")
					output[key] = value
				} else {
					output[section][key] = value
				}
			}
		}
	})
	return output
}

function parse(str, callback) {
	process.nextTick(() => {
		const output = parseSync(str)
		callback(output)
	})
}

function stringifySync(obj) {
	let output = ""
	let firstOccur = true

	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "string") {
			output += `${key}=${obj[key]}`
			output += os.EOL
			// } else if (typeof obj[key] === "object") {
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
					if (!isNaN(Number(value)) || value.toLowerCase() === "true" || value.toLowerCase() === "false") {
						value = `"${value}"`
					}
				}
				output += `${innerKey}=${value}`
				output += os.EOL
			})
		}
	})
	return output.substring(0, output.length - 1)
}

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
