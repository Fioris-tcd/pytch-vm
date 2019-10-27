"use strict";


////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const reqskulpt = require('../../support/run/require-skulpt').requireSkulpt;

before(() => {
    // Inject 'Sk' object into global namespace.
    reqskulpt(false);

    // Connect read/write to filesystem and stdout.
    Sk.configure({
        read: (fname => fs.readFileSync(fname, { encoding: "utf8" })),
        output: (args) => { process.stdout.write(args); },
    });


    ////////////////////////////////////////////////////////////////////////////////
    //
    // Test helpers

    global.import_local_file = (fname => {
        let code_text = fs.readFileSync(fname, { encoding: "utf8" });
        return Sk.importMainWithBody("<stdin>", false, code_text, true);
    });

    global.assert = require("assert");
});