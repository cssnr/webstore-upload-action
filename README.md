[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/webstore-upload-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-upload-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/webstore-upload-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-upload-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/webstore-upload-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/webstore-upload-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/webstore-upload-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/webstore-upload-action/blob/master/src)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/webstore-upload-action/release.yaml?logo=norton&logoColor=white&label=release)](https://github.com/cssnr/webstore-upload-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/webstore-upload-action/test.yaml?logo=norton&logoColor=white&label=test)](https://github.com/cssnr/webstore-upload-action/actions/workflows/test.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/webstore-upload-action/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/webstore-upload-action/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/webstore-upload-action?logo=github&label=updated)](https://github.com/cssnr/webstore-upload-action)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/webstore-upload-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/webstore-upload-action)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/webstore-upload-action?logo=buffer&label=repo%20size)](https://github.com/cssnr/webstore-upload-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/webstore-upload-action?logo=devbox)](https://github.com/cssnr/webstore-upload-action?tab=readme-ov-file#readme)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/webstore-upload-action?logo=southwestairlines)](https://github.com/cssnr/webstore-upload-action/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues/cssnr/webstore-upload-action?logo=codeforces&logoColor=white)](https://github.com/cssnr/webstore-upload-action/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/webstore-upload-action?logo=livechat&logoColor=white)](https://github.com/cssnr/webstore-upload-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/webstore-upload-action?style=flat&logo=forgejo&logoColor=white)](https://github.com/cssnr/webstore-upload-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/webstore-upload-action?style=flat&logo=gleam&logoColor=white)](https://github.com/cssnr/webstore-upload-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=apachespark&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Web Store Upload Action

<a title="Web Store Upload Action" href="https://actions.cssnr.com/" target="_blank">
<img alt="Web Store Upload Action" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/cssnr/webstore-upload-action/refs/heads/master/.github/assets/logo.svg"></a>

- [Features](#Features)
- [Steps](#Steps)
- [Inputs](#Inputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Upload and Publish Web Extensions to the Google Chrome Web Store v2 using Service Account Credentials, JSON, or Token.

```yaml
- name: 'Web Store Upload Action'
  uses: cssnr/webstore-upload-action@master
  with:
    zip_file: chrome-extension.zip
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    json_data: ${{ secrets.WEBSTORE_JSON }}
    submit: true # default false
```

## Features

- Works With Service Accounts
- Provide JSON Data, File, Credentials or Token
- Uses the Google Chrome [Web Store API v2](https://developer.chrome.com/docs/webstore/api/reference/rest)

## Steps

1. Follow all the steps on this page only:
   - <https://developer.chrome.com/docs/webstore/service-accounts>
2. Download the Service Account JSON file.
3. Open the file and copy the contents.
4. Add the contents as the value to a GitHub Secret.
5. Set the `json` input to the secret.

To get your Publisher ID, see: <https://developer.chrome.com/docs/webstore/using-api#obtain_your_publisher_id>

## Inputs

> [!TIP]  
> Only provide `json` OR `file` OR `client_email`/`private_key` OR `token`

| Input            |  Req.   | Default | Input&nbsp;Description       |
| :--------------- | :-----: | :-----: | :--------------------------- |
| **extension_id** | **Yes** |    -    | Chrome Extension ID          |
| **publisher_id** | **Yes** |    -    | Chrome Publisher ID          |
| **zip_file**     | **Yes** |    -    | Chrome Extension ZIP File    |
| **submit**       |    -    | `false` | Submit Extension for Review  |
| **json_data**    |    -    |    -    | Service Account JSON Data    |
| **json_file**    |    -    |    -    | Service Account JSON File    |
| **client_email** |    -    |    -    | Service Account Client Email |
| **private_key**  |    -    |    -    | Service Account Private Key  |
| **token**        |    -    |    -    | Generated Bearer Token       |
| **summary**      |    -    | `true`  | Add Summary to Job           |

There are 4 ways to provide authentication.
Either provide the service account credentials JSON data (as a string),
a path to the JSON file, or the `client_email` and `private_key` from the JSON file.

Alternatively, if you have already generated a Bearer Token, you can provide only that.

#### publisher_id

You can get the Publisher ID from your Developer Dashboard.

- https://developer.chrome.com/docs/webstore/using-api#obtain_your_publisher_id

## Examples

If you added the Credentials JSON file contents as a secret.

```yaml
- name: 'Web Store Upload Action'
  uses: cssnr/webstore-upload-action@master
  with:
    zip_file: chrome-extension.zip
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    json_data: ${{ secrets.WEBSTORE_JSON }}
```

If you have a path to the Credentials JSON file.

```yaml
- name: 'Web Store Upload Action'
  uses: cssnr/webstore-upload-action@master
  with:
    zip_file: chrome-extension.zip
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    json_file: service-account-credentials.json
```

If you are only providing the email and key.

```yaml
- name: 'Web Store Upload Action'
  uses: cssnr/webstore-upload-action@master
  with:
    zip_file: chrome-extension.zip
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    email: ${{ secrets.CLIENT_EMAIL }}
    key: ${{ secrets.PRIVATE_KEY }}
```

If you already generated a bearer token.

```yaml
- name: 'Web Store Upload Action'
  uses: cssnr/webstore-upload-action@master
  with:
    zip_file: chrome-extension.zip
    extension_id: ifefifghpkllfibejafbakmflidjcjfp
    publisher_id: 019dc0fc-fc68-74d0-9f66-0021d757685b
    token: ${{ env.BEARER_TOKEN }}
```

## Tags

The following rolling [tags](https://github.com/cssnr/webstore-upload-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                             | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/webstore-upload-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/webstore-upload-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/webstore-upload-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/webstore-upload-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/webstore-upload-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/webstore-upload-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/webstore-upload-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

# Support

If you run into any issues or need help getting started, please do one of the following:

- [Report an Issue](https://github.com/cssnr/webstore-upload-action/issues)
- [Q&A Discussion](https://github.com/cssnr/webstore-upload-action/discussions/categories/q-a)
- [Request a Feature](https://github.com/cssnr/webstore-upload-action/issues/new?template=1-feature.yaml)
- [Chat with us on Discord](https://discord.gg/wXy6m2X8wY)

[![Features](https://img.shields.io/badge/features-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/cssnr/webstore-upload-action/issues/new?template=1-feature.yaml)
[![Issues](https://img.shields.io/badge/issues-red?style=for-the-badge&logo=southwestairlines&logoColor=white)](https://github.com/cssnr/webstore-upload-action/issues)
[![Discussions](https://img.shields.io/badge/discussions-blue?style=for-the-badge&logo=livechat&logoColor=white)](https://github.com/cssnr/webstore-upload-action/discussions)
[![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wXy6m2X8wY)

# Contributing

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

[![Actions Tools](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/actions/actions-tools.png)](https://actions-tools.cssnr.com/)

Additionally, you can support other [GitHub Actions](https://actions.cssnr.com/) I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy Action](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)
- [Actions Up Action](https://github.com/cssnr/actions-up-action?tab=readme-ov-file#readme)
- [Rhysd Actionlint Action](https://github.com/cssnr/actionlint-action?tab=readme-ov-file#readme)
- [Zensical Action](https://github.com/cssnr/zensical-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Homebrew Action](https://github.com/cssnr/homebrew-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [TOML Action](https://github.com/cssnr/toml-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [JSON Key Value Check Action](https://github.com/cssnr/json-key-value-check-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Create Pull Action](https://github.com/cssnr/create-pull-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)
- [Get Commit Action](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

- [cssnr/create-files-action](https://github.com/cssnr/create-files-action?tab=readme-ov-file#readme) - Create various files from templates.
- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action?tab=readme-ov-file#readme) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action?tab=readme-ov-file#readme) - Convert env file to json or vice versa.
- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action?tab=readme-ov-file#readme) - Sync files to a remote host with rsync.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action?tab=readme-ov-file#readme) - Update release notes.
- [smashedr/combine-release-notes-action](https://github.com/smashedr/combine-release-notes-action?tab=readme-ov-file#readme) - Combine release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [javascript-action](https://github.com/smashedr/javascript-action?tab=readme-ov-file#readme) - JavaScript
- [typescript-action](https://github.com/smashedr/typescript-action?tab=readme-ov-file#readme) - TypeScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Dockerfile Python
- [test-action-uv](https://github.com/smashedr/test-action-uv?tab=readme-ov-file#readme) - Dockerfile Python UV
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker Image Python

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

<a href="https://github.com/cssnr/webstore-upload-action">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cssnr/webstore-upload-action&type=date&legend=bottom-right&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cssnr/webstore-upload-action&type=date&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cssnr/webstore-upload-action&type=date&legend=bottom-right" />
 </picture>
</a>
