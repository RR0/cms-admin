import { APP_BASE_HREF } from "@angular/common"
import { CommonEngine } from "@angular/ssr"
import express from "express"
import cors from "cors"
import { fileURLToPath } from "node:url"
import { dirname, join, resolve } from "node:path"
import bootstrap from "./src/main.server"
import { Config } from "./src/app/config/config"
import { BuildParams } from "./src/app/website/website.service"

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express()
  const serverDistFolder = dirname(fileURLToPath(import.meta.url))
  const browserDistFolder = resolve(serverDistFolder, "../browser")
  const indexHtml = join(serverDistFolder, "index.server.html")

  const commonEngine = new CommonEngine()

  server.set("view engine", "html")
  server.set("views", browserDistFolder)
  server.use(cors())

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get("**", express.static(browserDistFolder, {
    maxAge: "1y",
    index: "index.html"
  }))

  // All regular routes use the Angular engine
  server
    .get("/config", (req, res) => {
      const config: Config = {
        contentRoots: [
          "croyance/**/*.html",
          "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
          "time/**/*.html",
          "book/**/*.html",
          "droit/**/*.html",
          "org/**/*.html",
          "people/**/*.html",
          "place/**/*.html",
          "politique/**/*.html",
          "science/**/*.html",
          "tech/**/*.html",
          "udb/*.html",
          "js/**/*.html"
        ],
        copies: [
          "favicon.ico", "manifest.json", "opensearch.xml", "apple-touch-icon.png", "apple-touch-icon_400x400.png", "screenshot1.jpg",
          "rr0.css", "map.css", "diagram.css", "print.css", "figure.css", "section.css", "table.css", "nav.css",
          // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
          "**/*.cmmn", "**/*.bpmn",
          "tech/info/soft/reseau/protocole/index.js", "tech/info/soft/reseau/protocole/ports.json", "tech/info/soft/reseau/protocole/index.css",
          "tech/info/soft/data/doc/index.js", "tech/info/soft/data/doc/index.json", "tech/info/soft/data/doc/index.css",
          "people/index.js", "people/index.css", "people/witness/index.css",
          "search/SearchComponent.mjs", "search/index.json", "search/search.css",
          "source/index.css", "note/index.css",
          "link.css", "quote.css",
          "time/DualRangeComponent.mjs",
          "index/index.js", "lang/form.js", "lang/form.css", "lang/speech.js", "lang/speech.css",
          "croyance/divin/theisme/mono/livre/islam/coran/index.js"
        ],
        mail: "rr0@rr0.org",
        baseUrl: "https://rr0.org/",
        description: "UFO data for french-reading people*",
        nonIndexedPages: ["404.html", "Referencement.html"]
      }
      const buildParams: BuildParams = {
        outDir: "out",
        lang: "fr",
        timeFormat: {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit"
        },
        mapsApiKey: ""
      }
      res.json({config, buildParams})
    })
    .get("**", (req, res, next) => {
      const {protocol, originalUrl, baseUrl, headers} = req

      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{provide: APP_BASE_HREF, useValue: baseUrl}]
        })
        .then((html) => res.send(html))
        .catch((err) => next(err))
    })

  return server
}

function run(): void {
  const port = process.env["PORT"] || 4000

  // Start up the Node server
  const server = app()
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

run()
