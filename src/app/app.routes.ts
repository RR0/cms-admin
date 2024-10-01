import { Routes } from "@angular/router"
import { ConfigComponent } from "./config/config.component"
import { BuildComponent } from "./build/build.component"

export const routes: Routes = [
  {path: "config", component: ConfigComponent},
  {path: "build", component: BuildComponent}
]
