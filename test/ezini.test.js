const ini = require("../ezini")
const fs = require("fs")
const path = require("path")
require("should")

const iniFolder = path.join(path.dirname(__filename), "ini")

const objINI = { owner: { name: "John Do", organization: "Acme eProducts" },
	database: { server: "192.0.2.42", port: 143, file: "acme payroll.dat" } }
const strINI = fs.readFileSync(path.resolve(__dirname, "ini/standard.ini"), "utf-8")

describe('empty str parsing', () => {
	it('output should equal an empty Object', () => {
		ini.parseSync("").should.eql({})
	});
});

describe("empty line ini parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "empty_line.ini"), "utf-8")
		ini.parseSync(str).should.eql(objINI)
	})
})

describe("commented ini parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "commented.ini"), "utf-8")
		ini.parseSync(str).should.eql(objINI)
	})
})

describe("inline-commented ini parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "inline_commented.ini"), "utf-8")
		ini.parseSync(str).should.eql(objINI)
	})
})

describe("commented ini with empty line parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "commented_empty_line.ini"), "utf-8")
		ini.parseSync(str).should.eql(objINI)
	})
})

describe("start with properties ini parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "start_with_properties.ini"), "utf-8")
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.author = "vimsucks"
		ini.parseSync(str).should.eql(obj)
	})
})

describe("ini syntax error parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "syntax_error.ini"), "utf-8")
		ini.parseSync(str).should.eql(objINI)
	})
})

describe("ini with boolean value parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "boolean.ini"), "utf-8")
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.owner.isRich = true
		ini.parseSync(str).should.eql(obj)
	})
})

describe("ini with quoted number parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "quoted_number.ini"), "utf-8")
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.database.portStr = "143"
		ini.parseSync(str).should.eql(obj)
	})
})

describe("ini with quoted boolean parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "quoted_boolean.ini"), "utf-8")
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.owner.isRich = "true"
		ini.parseSync(str).should.eql(obj)
	})
})

describe("empty line ini async parsing", () => {
	it("output object should equal given object", (done) => {
		const str = fs.readFileSync(path.join(iniFolder, "empty_line.ini"), "utf-8")
		ini.parse(str, (obj) => {
			obj.should.eql(objINI)
			done()
		})
	})
})

describe("composite str parsing", () => {
	it("output object should equal given object", () => {
		const str = fs.readFileSync(path.join(iniFolder, "composite.ini"), "utf-8")
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.owner.rich = true
		obj.owner.richStr = "true"
		obj.database.portStr = "143"
		ini.parseSync(str).should.eql(obj)
	})
})

describe("parsed object stringify", () => {
	it("output string should equal given string", () => {
		ini.stringifySync(objINI).should.equal(strINI)
	})
})

describe("parsed start-with-properties object stringify", () => {
	it("output string should equal given string", () => {
		const str = fs.readFileSync(path.join(iniFolder, "start_with_properties.ini"), "utf-8")
		ini.stringifySync(ini.parseSync(str)).should.equal(`author=vimsucks\n${strINI}`)
	})
})

describe("parsed object async stringify", () => {
	it("output string should equal given string", (done) => {
		ini.stringify(objINI, (str) => {
			str.should.equal(strINI)
			done()
		})
	})
})

describe("object with quoted number & boolean async stringify", () => {
	it("output string should equal given string", (done) => {
		const obj = JSON.parse(JSON.stringify(objINI))
		obj.database.foo = "true"
		obj.database.bar = "123"
		ini.stringify(obj, (str) => {
			str.should.equal(`${strINI}foo="true"\nbar="123"\n`)
			done()
		})
	})
})
