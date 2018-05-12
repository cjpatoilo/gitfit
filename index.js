#!/usr/bin/env node
const { exec } = require('child_process')
const rasper = require('rasper')
const { error, log } = console
const options = process.argv[0].match(/node/i) ? rasper(process.argv.slice(2)) : process.exit(2)

// help
if (options.help) {
	log(`
Usage:

	$ gitfit <command> [<options>]

Options:

	-h, --help              Display help information
	-v, --version           Output Initify version

Examples:

	$ gitfit init
	$ gitfit start <feature-name>
	$ gitfit finish <new-tag>
	`)
	process.exit(2)
}

// version
if (options.version) {
	log(`v${version}`)
	process.exit(2)
}

// init
if (options._[0].match(/init/)) {
	exec(`git init && git commit --allow-empty -m 'Initial commit'`)
	process.exit(2)
}

// start
if (options._[0].match(/start/)) {
	if (options._[1]) exec(`git checkout -b feature/${options._[1]} master'`)
	else error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	process.exit(2)
}

// finish
if (options._[0].match(/finish/)) {
	if (options._[1]) exec(`git checkout master && git merge --no-ff feature/${branch} && git tag -a ${newVersion} && git branch -d feature/${branch}'`)
	else error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	process.exit(2)
}
