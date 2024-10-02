import { Injectable } from "@angular/core"
import { Config } from "../config/config"

export interface BuildParams {
  outDir: string
  lang: string
  timeFormat: Intl.DateTimeFormatOptions
  mapsApiKey: string
}

@Injectable({
  providedIn: "root"
})
export class WebsiteService {

  config: Config = {
    contentRoots: [],
    copies: [],
    mail: "",
    baseUrl: "",
    description: "",
    nonIndexedPages: []
  }

  build(params: BuildParams) {
    console.log("Building with params", params, "and configuration", this.config)
  }
}
