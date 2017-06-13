"use strict";

var ini = require("../ini");
var fs = require("fs");
var path = require("path");
require("should");

var iniFolder = path.join(path.dirname(__filename), "ini");

var objINI = { owner: { name: "John Do", organization: "Acme eProducts" },
	database: { server: "192.0.2.42", port: 143, file: "acme payroll.dat" } };
var strINI = fs.readFileSync(path.resolve(__dirname, "ini/standard.ini"), "utf-8");

describe("empty line ini parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "empty_line.ini"), "utf-8");
		ini.parseSync(str).should.eql(objINI);
	});
});

describe("commented ini parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "commented.ini"), "utf-8");
		ini.parseSync(str).should.eql(objINI);
	});
});

describe("inline-commented ini parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "inline_commented.ini"), "utf-8");
		ini.parseSync(str).should.eql(objINI);
	});
});

describe("commented ini with empty line parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "commented_empty_line.ini"), "utf-8");
		ini.parseSync(str).should.eql(objINI);
	});
});

describe("start with properties ini parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "start_with_properties.ini"), "utf-8");
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.author = "vimsucks";
		ini.parseSync(str).should.eql(obj);
	});
});

describe("ini syntax error parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "syntax_error.ini"), "utf-8");
		ini.parseSync(str).should.eql(objINI);
	});
});

describe("ini with boolean value parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "boolean.ini"), "utf-8");
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.owner.isRich = true;
		ini.parseSync(str).should.eql(obj);
	});
});

describe("ini with quoted number parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "quoted_number.ini"), "utf-8");
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.database.portStr = "143";
		ini.parseSync(str).should.eql(obj);
	});
});

describe("ini with quoted boolean parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "quoted_boolean.ini"), "utf-8");
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.owner.isRich = "true";
		ini.parseSync(str).should.eql(obj);
	});
});

describe("empty line ini async parsing", function () {
	it("output object should equal given object", function (done) {
		var str = fs.readFileSync(path.join(iniFolder, "empty_line.ini"), "utf-8");
		ini.parse(str, function (obj) {
			obj.should.eql(objINI);
			done();
		});
	});
});

describe("composite str parsing", function () {
	it("output object should equal given object", function () {
		var str = fs.readFileSync(path.join(iniFolder, "composite.ini"), "utf-8");
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.owner.rich = true;
		obj.owner.richStr = "true";
		obj.database.portStr = "143";
		ini.parseSync(str).should.eql(obj);
	});
});

describe("parsed object stringify", function () {
	it("output string should equal given string", function () {
		ini.stringifySync(objINI).should.equal(strINI);
	});
});

describe("parsed start-with-properties object stringify", function () {
	it("output string should equal given string", function () {
		var str = fs.readFileSync(path.join(iniFolder, "start_with_properties.ini"), "utf-8");
		ini.stringifySync(ini.parseSync(str)).should.equal("author=vimsucks\n" + strINI);
	});
});

describe("parsed object async stringify", function () {
	it("output string should equal given string", function (done) {
		ini.stringify(objINI, function (str) {
			str.should.equal(strINI);
			done();
		});
	});
});

describe("object with quoted number & boolean async stringify", function () {
	it("output string should equal given string", function (done) {
		var obj = JSON.parse(JSON.stringify(objINI));
		obj.database.foo = "true";
		obj.database.bar = "123";
		ini.stringify(obj, function (str) {
			str.should.equal(strINI + "foo=\"true\"\nbar=\"123\"\n");
			done();
		});
	});
});
//# sourceMappingURL=ini.test.js.map