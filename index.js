#!/usr/bin/env node
const { execSync } = require('child_process')
const gitBranch = require('git-branch')
const rasper = require('rasper')
const pkg = require('./package.json')

const { error, log } = console
const { argv, exit } = process
const options = argv[0].match(/node/i) ? rasper(argv.slice(2)) : exit(2)
options.command = options._[0]
options.argument = options._[1]

if (options.help) {
	help()
	exit(2)
}

if (options.version) {
	version(pkg.version)
	exit(2)
}

switch (options.command) {
	case 'init':
		init()
		exit(2)
		break
	case 'start':
		start(options.argument)
		exit(2)
		break
	case 'finish':
		gitBranch().then(branch => finish(branch, options.argument))
		exit(2)
		break
	case 'publish':
		gitBranch().then(branch => publish(branch))
		exit(2)
		break
	default:
		help()
		exit(2)
}

function help() {
	log(`
Usage:

	$ gitfit <command> [<options>]

Options:

	-h, --help              Display help information
	-v, --version           Output version
	init                    Create Initializy repository
	start                   Start new feature branch
	finish                  Finish feature branch
	publish                 Publish master branch or feature branch

Examples:

	$ gitfit init
	$ gitfit start <feature-name>
	$ gitfit finish <new-tag>
	$ gitfit publish
	`)
}

function version(version) {
	log(`v${version}`)
}

function init() {
	execSync(`git init`, { stdio: 'inherit' })
	execSync(`git commit --allow-empty -m 'Initial commit'`, { stdio: 'inherit' })
}

function start(argument) {
	if (!argument) error(`[error] Feature name is required\n[info] $ gitfit start <feature-name>`)
	else execSync(`git checkout -b feature/${argument} master`, { stdio: 'inherit' })
}

function finish(branch, argument) {
	if (!argument) error(`[error] Tag is required\n[info] $ gitfit finish <new-tag>`)
	else if (branch === 'master' || !branch.indexOf(/feature\//)) error(`[error] Branch should be a feature branch e.g.: $ gitfit finish <new-tag>`)
	else {
		execSync(`git checkout master`, { stdio: 'inherit' })
		execSync(`git merge --no-ff ${branch} -m "Merge branch '${branch}'"`, { stdio: 'inherit' })
		execSync(`git tag -a ${argument} -m ''`, { stdio: 'inherit' })
		execSync(`git branch -D ${branch}`, { stdio: 'inherit' })
	}
}

function publish(branch) {
	execSync(`git push origin ${branch.indexOf(/feature\//) ? branch : 'master'}`, { stdio: 'inherit' })
	execSync(`git push origin --tags`, { stdio: 'inherit' })
}
