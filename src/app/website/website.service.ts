import { Injectable } from "@angular/core"
import { Config } from "../config/config"

export interface BuildParams {
  timeFormat: Intl.DateTimeFormatOptions
}

@Injectable({
  providedIn: "root"
})
export class WebsiteService {

  configuration: Config = {
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
    description: "UFO data for french-reading people",
    nonIndexedPages: ["404.html", "Referencement.html"]
  }

  build(params: BuildParams) {
    console.log(params)
  }
}
