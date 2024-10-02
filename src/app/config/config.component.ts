import { Component, HostBinding } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { WebsiteService } from "../website/website.service"
import { Config } from "./config"

@Component({
  selector: "app-config",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./config.component.html",
  styleUrl: "./config.component.css"
})
export class ConfigComponent {

  @HostBinding("class") hostClass = "section"

  formGroup: FormGroup<{ [p: string]: FormControl }>

  readonly Object = Object

  constructor(protected websiteService: WebsiteService) {
    this.formGroup = this.initForm(websiteService.config)
  }

  protected initForm(config: Config) {
    const group: { [key: string]: FormControl } = {}
    Object.entries(config).forEach(([key, value]) => {
      const str = Array.isArray(value) ? value.join(",") : value
      group[key] = new FormControl(str)
    })
    return new FormGroup(group)
  }

  save() {
    this.websiteService.config = this.formGroup.value as Config
    console.log(this.websiteService.config)
  }
}
