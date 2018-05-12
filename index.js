#!/usr/bin/env node
const { exec } = require('child_process')
const rasper = require('rasper')
const { error, log } = console
const options = process.argv[0].match(/node/i) ? rasper(process.argv.slice(2)) : process.exit(2)
const command = options._[0]
const argument = options._[1]
const branch = exec(`git branch`)

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

if (options.version) {
	log(`v${version}`)
	process.exit(2)
}

if (command.match(/init/)) {
	exec(`git init && git commit --allow-empty -m 'Initial commit'`)
	process.exit(2)
}

if (command.match(/start/)) {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else exec(`git checkout -b feature/${argument} master'`)
	process.exit(2)
}

if (command.match(/finish/)) {
	if (!branch.match('feature/')) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	else if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	else exec(`git checkout master && git merge --no-ff feature/${branch} && git tag -a ${argument} && git branch -d feature/${branch}'`)
	process.exit(2)
}
