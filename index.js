#!/usr/bin/env node
const gitBranch = require('git-branch')
const rasper = require('rasper')
const { exec } = require('child_process')

const { error, log } = console
const { argv, exit } = process
const { help, version, _ } = argv[0].match(/node/i) ? rasper(argv.slice(2)) : exit(2)
const command = _[0]
const argument = _[1]

if (help) {
	help()
	exit(2)
}

if (version) {
	semver()
	exit(2)
}

if (command) {
	switch () {
		case 'init':
			init()
			exit(2)
			break
		case 'start':
			start(argument)
			exit(2)
			break
		case 'finish':
			finish(branch, argument)
			exit(2)
			break
		case 'publish':
			publish(branch)
			exit(2)
			break
		default:
			help()
			exit(2)
	}
}

function help() {
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
}

function semver() {
	log(`v${version}`)
}

function init() {
	exec(`git init`)
	exec(`git commit --allow-empty -m 'Initial commit'`)
}

function start(argument) {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else exec(`git checkout -b feature/${argument} master`)
}

function finish(branch, argument) {
	gitBranch().then(branch => {
		if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
		else if (branch === 'master' || !branch.indexOf(/feature\//)) error(`[error] Branch should be a feature branch e.g.: $ gitfit finish <new-tag>`)
		else {
			exec(`git checkout master`)
			exec(`git merge --no-ff ${branch} -m "Merge branch '${branch}'"`)
			exec(`git tag -a ${argument} -m ''`)
			exec(`git branch -D ${branch}`)
		}
	})
}

function publish(branch) {
	exec(`git push origin ${branch.indexOf(/feature\//) ? branch : 'master'}`)
	exec(`git push origin --tags`)
}
