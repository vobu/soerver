#!/usr/bin/env node
const yargs = require("yargs")

const argv = yargs
    .usage("Usage: $0 [options]")
    .help("h")
    .example(
        "$0 -p 8080 -d dist -x ./util/proxyrc.json",
        "serve directory 'dist' on port 8080 and read proxy config from file util/proxyrc.json"
    )
    .default("p", 4711)
    .alias("p", "port")
    .default("dir", "./")
    .alias("dir", "d")
    .default("proxyrc", "")
    .alias("proxyrc", "x").argv

const soerver = require("./lib/soerver")({ proxyFile: argv.proxyrc, serveDir: argv.dir })

let msg = ""
if (argv.proxyrc !== "") {
    msg += `🏎  proxy rules detected in ${argv.proxyrc}!\n`
}
msg += `🕺 at http://localhost:${argv.p} for ${argv.dir}`
soerver.listen(argv.p, () => console.log(msg))
