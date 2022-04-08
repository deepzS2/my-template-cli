#!/usr/bin/env node

import { constructYargs } from './args'
import execute from './execute'

const yargs = constructYargs(process.argv.slice(2))
execute(yargs)
