import fetch from 'node-fetch'
// @ts-ignore - for google-auth-library
if (!globalThis.fetch) globalThis.fetch = fetch
import * as core from '@actions/core'
import axios from 'axios'
import { existsSync, readFileSync } from 'node:fs'
import { JWT } from 'google-auth-library'
import { Webstore } from './webstore.js'

// Inputs
const inputs = {
  extID: core.getInput('extension_id', { required: true }),
  pubID: core.getInput('publisher_id', { required: true }),
  zipFile: core.getInput('zip_file', { required: true }),

  submit: core.getBooleanInput('submit'),

  jsonData: core.getInput('json_data'),
  jsonFile: core.getInput('json_file'),

  email: core.getInput('client_email'),
  key: core.getInput('private_key'),

  token: core.getInput('token'),

  summary: core.getBooleanInput('summary'),
} as const

type Inputs = typeof inputs

async function main() {
  const version: string = process.env.GITHUB_ACTION_REF
    ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
    : '\u001b[33;1mSource'
  core.info(`🏳️ Starting Web Store Upload Action - ${version}`)

  core.startGroup('Inputs')
  console.log(inputs)
  core.endGroup() // Inputs

  // // Debug
  // core.startGroup('Debug: github.context')
  // console.log(github.context)
  // core.endGroup() // Debug github.context
  // core.startGroup('Debug: process.env')
  // console.log(process.env)
  // core.endGroup() // Debug process.env

  // // Debug Path
  // const __filename = fileURLToPath(import.meta.url)
  // core.debug(`__filename: ${__filename}`)
  // const __dirname = path.dirname(__filename)
  // core.debug(`__dirname: ${__dirname}`)
  // const src = path.resolve(__dirname, '../src')
  // core.debug(`src: ${src}`)

  // Inputs
  if (inputs.zipFile && !existsSync(inputs.zipFile)) {
    return core.setFailed(`Unable to locate zip file: ${inputs.zipFile}`)
  }

  const token = await getToken(inputs)
  if (!token) {
    return core.setFailed('Unable to get Access Token.')
  }
  // console.log('token:', token)

  const api = new Webstore(inputs.pubID, inputs.extID, token)

  // const extension = await api.getExtension()
  // console.log('extension:', extension)
  // console.log('extension JSON:', JSON.stringify(extension, null, 2))

  const file = readFileSync(inputs.zipFile)
  const upload = await api.uploadFile(file)
  core.startGroup('Upload')
  console.log(upload)
  core.endGroup() // Upload

  let publish
  if (inputs.submit) {
    publish = await api.publishExtension()
    core.startGroup('Publish')
    console.log(publish)
    core.endGroup() // Publish
  } else {
    core.info('Skipping Submit for Review...')
  }

  // Summary
  if (inputs.summary) {
    core.info('📝 Writing Job Summary')
    try {
      await addSummary(inputs, upload, publish)
    } catch (e) {
      console.log(e)
      if (e instanceof Error) core.warning(`Error writing Job Summary ${e.message}`)
    }
  }

  core.info(`✅ \u001b[32;1mFinished Success`)
}

async function getToken(inputs: Inputs) {
  if (inputs.token) return inputs.token

  let email = inputs.email
  let key = inputs.key
  if (inputs.jsonData || inputs.jsonFile) {
    core.info('Parsing Credentials from JSON...')
    const json = inputs.jsonData || readFileSync(inputs.jsonFile, 'utf8')
    const data = JSON.parse(json)
    email = data.client_email
    key = data.private_key
  }
  console.log('email:', email.slice(16))
  console.log('key:', key.slice(0, 27))
  if (!email || !key) {
    throw new Error('You must provide the JSON or both key/email.')
  }

  // Token
  const scopes = ['https://www.googleapis.com/auth/chromewebstore']
  // const auth = new GoogleAuth({ keyFile: inputs.jsonData, credentials: data, scopes })
  const client = new JWT({ email, key, scopes })
  core.info('Getting Access Token...')
  const token = await client.getAccessToken()
  console.log('token.token:', token.token?.slice(0, 32))
  return token.token
}

async function addSummary(inputs: Inputs, upload: any, publish: any) {
  const itemUrl = `https://chromewebstore.google.com/detail/${inputs.extID}`
  const packageUrl = `https://chrome.google.com/webstore/devconsole/${inputs.pubID}/${inputs.extID}/edit/package`
  const downloadUrl = `https://chrome.google.com/webstore/download/${inputs.extID}/revision/__DRAFT/package/main/crx/3`

  core.summary.addRaw('## Web Store Upload Action\n\n')
  core.summary.addRaw(
    `Uploaded Extension [${inputs.extID}](${itemUrl}) to the [Developer Console](${packageUrl}).\n\n`,
  )

  if (upload) {
    core.summary.addRaw(`\n\n:globe_with_meridians: Successfully Uploaded Extension.\n\n`)
    core.summary.addCodeBlock(JSON.stringify(upload, null, 2), 'json')
  }
  if (publish) {
    core.summary.addRaw(
      `\n\n:globe_with_meridians: Successfully Submitted Extension.\n\n`,
    )
    core.summary.addCodeBlock(JSON.stringify(publish, null, 2), 'json')
  }

  core.summary.addRaw('\n<details><summary>Details</summary>')
  core.summary.addTable([
    [
      { data: 'Item', header: true },
      { data: 'Value', header: true },
    ],
    [{ data: 'Extension ID' }, { data: inputs.extID }],
    [{ data: 'Publisher ID' }, { data: inputs.pubID }],
    [{ data: 'ZIP File' }, { data: inputs.zipFile }],
    [{ data: 'Store Item' }, { data: `${itemUrl}` }],
    [{ data: 'Dashboard' }, { data: `${packageUrl}` }],
    [{ data: 'Download' }, { data: `${downloadUrl}` }],
  ])
  core.summary.addRaw('</details>\n')

  const bad = ['jsonData', 'jsonFile', 'email', 'key', 'token']
  const cleanInputs = Object.fromEntries(
    Object.entries(inputs).filter(([key]) => !bad.includes(key)),
  )
  const yaml = Object.entries(cleanInputs)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')
  core.summary.addRaw('<details><summary>Inputs</summary>')
  core.summary.addCodeBlock(yaml, 'yaml')
  core.summary.addRaw('</details>\n')

  const text = 'View Documentation, Report Issues or Request Features'
  const link = 'https://github.com/cssnr/webstore-upload-action'
  core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
  await core.summary.write()
}

try {
  await main()
} catch (e) {
  console.log(e)
  if (axios.isAxiosError(e)) {
    console.log('isAxiosError...')
    const data = e.response?.data
    console.log('data:', data)
    const message = data?.error_detail || data?.message
    core.setFailed(message || `Unknown Axios Error: ${data?.status}`)
  } else if (e instanceof Error) {
    core.setFailed(e.message)
  } else {
    core.setFailed('Unknown Error.')
  }
}
