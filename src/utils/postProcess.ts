import * as fs from 'fs'
import * as path from 'path'
import * as shell from 'shelljs'

import { CliOptions } from '../@types/global'

export default function postProcess(options: CliOptions) {
    const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'))

    if (!isNode || !options.runInstall) return false

    shell.cd(options.targetPath)

    const result = shell.exec('yarn install')

    if (result.code !== 0) return false
    
    return true;
}