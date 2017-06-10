var ini = require("../ini")


var testini = "\n\
；comments text\n\
fuck=233\n\
[owner]\n\
name=John Doe\n\
\n\
organization = Acme Widgets Inc.\n\
[database]\n\
; use IP address in case network name resolution is not working\n\
server=192.0.2.62\n\
port=143 ; 233\n\
file=\"payroll.dat\""

// console.log(testini)
conf = ini.parse(testini)
console.log(conf)
console.log(ini.stringify(conf))
// console.log(conf)

