#!/usr/bin/env node
const { exec, exit } = require('shelljs')
const rasper = require('rasper')
const gitBranch = require('git-branch')
const { error, log } = console
const options = process.argv[0].match(/node/i) ? rasper(process.argv.slice(2)) : exit(2)
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
	exit(2)
}

if (options.version) {
	log(`v${version}`)
	exit(2)
}

if (command === 'init') {
	exec(`git init && git commit --allow-empty -m 'Initial commit'`, err => err && error(`[error] Gitfit init command has error`))
	exit(2)
}

if (command === 'start') {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else exec(`git checkout -b feature/${argument} master`, err => err && error(`[error] Gitfit start command has error`))
	exit(2)
}

if (command === 'finish') {
	gitBranch().then(branch => {
		if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
		else if (branch === 'master' || !branch.indexOf(/feature\//)) error(`[error] Branch should be a feature branch\n[info] $ gitfit finish <new-tag>`)
		else exec('git', ['checkout master', `merge --no-ff ${branch}`, `tag -a ${argument}`, `git branch -d ${branch}`], err => err && error(`[error] Gitfit finish command has error`))
		exit(2)
	})
}
