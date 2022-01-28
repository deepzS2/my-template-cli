export interface CliOptions {
  projectName: string
  templateName: string
  templatePath: string
  targetPath: string
  useTypescript: boolean
  runInstall: boolean
}

export interface Args {
  [x: string]: unknown
  _: (string | number)[]
  $0: string
}

