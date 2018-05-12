#!/usr/bin/env node
const gitBranch = require('git-branch')
const rasper = require('rasper')
const { exec } = require('child_process')

const { error, log } = console
const { argv, exit } = process
const options = argv[0].match(/node/i) ? rasper(argv.slice(2)) : exit(2)
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
	exec(`git init`)
	exec(`git commit --allow-empty -m 'Initial commit'`)
	exit(2)
}

if (command === 'start') {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else exec(`git checkout -b feature/${argument} master`)
	exit(2)
}

if (command === 'finish') {
	gitBranch().then(branch => {
		if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
		else if (branch === 'master' || !branch.indexOf(/feature\//)) error(`[error] Branch should be a feature branch e.g.: $ gitfit finish <new-tag>`)
		else {
			exec(`git checkout master`)
			exec(`git merge --no-ff ${branch}`)
			exec(`git tag -a ${argument} -m ''`)
			exec(`git branch -d ${branch}`)
		}
		exit(2)
	})
}
