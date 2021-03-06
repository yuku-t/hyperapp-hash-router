#!/usr/bin/env node

const fs = require("fs")
const marked = require("marked")
const prettier = require("prettier")

const html = marked(fs.readFileSync("./README.md").toString())

function postprocess(html) {
  return html
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;")
    .replace(/(<img[^>]+>)/g, "$1</img>{' '}")
}

const content = `// This file was generated by ./scripts/generate-readme.js
import { h } from "hyperapp"

import { Link } from "../../../src"

export default function Readme() {
  return (
    <div class="content">
      ${postprocess(html)}
    </div>
  )
}
`

fs.writeFileSync("./src/docs/pages/Home.js", prettier.format(content, { semi: false }))
