import * as fs from 'fs'
import * as path from 'path'
import { render } from './utils/template';

const SKIP_FILES = ['node_modules', '.template.json']

export default function createDirectoryContents(templatePath: string, projectName: string) {
    const filesToCreate = fs.readdirSync(templatePath)

    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file)
        const stats = fs.statSync(origFilePath)
    
        if (SKIP_FILES.indexOf(file) > -1) return
        
        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, 'utf8')
            contents = render(contents, { projectName });

            const writePath = path.join(process.cwd(), projectName, file)
            fs.writeFileSync(writePath, contents, 'utf8')
        } else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(process.cwd(), projectName, file));
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
}