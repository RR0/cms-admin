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
  protected readonly Object = Object

  constructor(protected websiteService: WebsiteService) {
    this.formGroup = this.initForm(websiteService.configuration)
  }

  save() {
    this.websiteService.configuration = this.formGroup.value as Config
    console.log(this.websiteService.configuration)
  }

  protected initForm(config: Config) {
    const group: { [key: string]: FormControl } = {}
    Object.entries(config).forEach(([key, value]) => {
      const str = Array.isArray(value) ? value.join(",") : value
      group[key] = new FormControl(str)
    })
    return new FormGroup(group)
  }
}
