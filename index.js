#!/usr/bin/env node
const { resolve } = require('path')
const { execFile, exec } = require('child_process')
const rasper = require('rasper')
const branch = require('current-git-branch')
const { error, log } = console
const options = process.argv[0].match(/node/i) ? rasper(process.argv.slice(2)) : process.exit(2)
const command = options._[0]
const argument = options._[1]

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
	execFile('git', ['init', `commit --allow-empty -m 'Initial commit`], err => err ? process.exit(2) : log(`[info] Gitfit initialized`))
}

if (command.match(/start/)) {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else execFile('git', [`checkout -b feature/${argument} master`], err => err ? process.exit(2) : log(`[info] Gitfit started feature`))
	process.exit(2)
}

if (command.match(/finish/)) {
	if (!branch.match('feature/')) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	else if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	else execFile('git', ['checkout master', `merge --no-ff feature/${branch}`, `tag -a ${argument}`, `branch -d feature/${branch}`], err => err ? process.exit(2) : log(`[info] Gitfit finished feature`))
	process.exit(2)
}
