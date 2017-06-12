"use strict"
const ini = require("../ini"),
    fs = require("fs"),
    path = require("path"),
    should = require("should")

var ini_folder = path.join(path.dirname(__filename), "ini")

var objINI = { owner: { name: 'John Do', organization: 'Acme eProducts' },
    database: { server: '192.0.2.42', port:143, file: 'acme payroll.dat' } }

var strINI ="[owner]\n\
name=John Do\n\
organization=Acme eProducts\n\
\n\
[database]\n\
server=192.0.2.42\n\
port=143\n\
file=acme payroll.dat"

describe("empty line ini parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "empty_line.ini"), "utf-8")
        ini.parseSync(str).should.eql(objINI)
    })
})

describe("commented ini parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "commented.ini"), "utf-8")
        ini.parseSync(str).should.eql(objINI)
    })
})

describe("inline-commented ini parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "inline_commented.ini"), "utf-8")
        ini.parseSync(str).should.eql(objINI)
    })
})

describe("commented ini with empty line parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "commented_empty_line.ini"), "utf-8")
        ini.parseSync(str).should.eql(objINI)
    })
})

describe("start with properties ini parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "start_with_properties.ini"), "utf-8")
        var obj = JSON.parse(JSON.stringify(objINI))
        obj.author="vimsucks"
        ini.parseSync(str).should.eql(obj)
    })
})

describe("ini syntax error parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "syntax_error.ini"), "utf-8")
        ini.parseSync(str).should.eql(objINI)
    })
})

describe("ini with boolean value parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "boolean.ini"), "utf-8")
        var obj = JSON.parse(JSON.stringify(objINI))
        obj.owner.isRich=true
        ini.parseSync(str).should.eql(obj)
    })
})

describe("ini with quoted number parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "quoted_number.ini"), "utf-8")
        var obj = JSON.parse(JSON.stringify(objINI))
        obj.database.portStr="143"
        ini.parseSync(str).should.eql(obj)
    })
})

describe("ini with quoted boolean parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "quoted_boolean.ini"), "utf-8")
        var obj = JSON.parse(JSON.stringify(objINI))
        obj.owner.isRich="true"
        ini.parseSync(str).should.eql(obj)
    })
})

describe("empty line ini async parsing", () => {
    it("output object should equal given object", (done) => {
        var str = fs.readFileSync(path.join(ini_folder, "empty_line.ini"), "utf-8")
        ini.parse(str, (obj) => {
            obj.should.eql(objINI)
            done()
        })
    })
})

describe("composite str parsing", () => {
    it("output object should equal given object", () => {
        var str = fs.readFileSync(path.join(ini_folder, "composite.ini"), "utf-8")
        var obj = JSON.parse(JSON.stringify(objINI))
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
        var str = fs.readFileSync(path.join(ini_folder, "start_with_properties.ini"), "utf-8")
        ini.stringifySync(ini.parseSync(str)).should.equal("author=vimsucks\n" + strINI)
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
        var obj = JSON.parse(JSON.stringify(objINI))
        obj.database.foo = "true"
        obj.database.bar = "123"
        ini.stringify(obj, (str) => {
            str.should.equal(strINI + "\nfoo=\"true\"\n" + "bar=\"123\"")
            done()
        })
    })
})

