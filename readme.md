<a align="center" href="https://github.com/cjpatoilo/gitfit"><img width="100%" src="https://cjpatoilo.com/gitfit/artwork.png" alt="Gitfit - Git Feature Branch Tooling."></a>

> Git Feature Branch Tooling.

[![Travis Status](https://travis-ci.org/cjpatoilo/gitfit.svg?branch=master)](https://travis-ci.org/cjpatoilo/gitfit?branch=master)
[![AppVeyor Status](https://ci.appveyor.com/api/projects/status/2dv8bbpsk492edfe?svg=true)](https://ci.appveyor.com/project/cjpatoilo/gitfit)
[![Codacy Status](https://img.shields.io/codacy/grade/52941e3f3d6c4eecabb3759e63f4bf58/master.svg)](https://www.codacy.com/app/cjpatoilo/gitfit/dashboard)
[![Dependencies Status](https://david-dm.org/cjpatoilo/gitfit/status.svg)](https://david-dm.org/cjpatoilo/gitfit)
[![Version Status](https://badge.fury.io/js/gitfit.svg)](https://www.npmjs.com/package/gitfit)
[![Download Status](https://img.shields.io/npm/dt/gitfit.svg)](https://www.npmjs.com/package/gitfit)
[![Gitter Chat](https://img.shields.io/badge/gitter-join_the_chat-4cc61e.svg)](https://gitter.im/cjpatoilo/gitfit)


## Why it's awesome

The core idea behind the Feature Branch Workflow is that all feature development should take place in a dedicated branch instead of the master branch. This encapsulation makes it easy for multiple developers to work on a particular feature without disturbing the main codebase. It also means the master branch will never contain broken code, which is a huge advantage for continuous integration environments.

-- Inspired by [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) (@atlassian).


## Install

**Install with npm**

```sh
$ npm i -g gitfit
```

**Install with Yarn**

```sh
$ yarn global add gitfit
```

**Run with npx (without installing)**

```sh
$ npx gitfit
```


## Usage

```
	Usage:

		$ gitfit <command> [<options>]

	Options:

		-h, --help              Display help information
		-v, --version           Output version
		init                    Initializy repository
		start                   Start new feature branch
		finish                  Finish feature branch
		publish                 Publish master branch or feature branch

	Examples:

		$ gitfit init
		$ gitfit start <feature-name>
		$ gitfit finish <new-tag> [<main_branch>] # default: master
		$ gitfit publish [<remote-branch>]  # default: current branch
```


## Contributing

Want to contribute? Follow these [recommendations](.github/contributing.md).


## License

Designed with ♥ by [CJ Patoilo](https://twitter.com/cjpatoilo). Licensed under the [MIT License](license).
