import { Component, HostBinding } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BuildParams, WebsiteService } from "../website/website.service"
import { JsonPipe } from "@angular/common"

@Component({
  selector: "app-build",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: "./build.component.html",
  styleUrl: "./build.component.css"
})
export class BuildComponent {
  @HostBinding("class") hostClass = "section"

  params: BuildParams = {
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

  formGroup: FormGroup<{ [p: string]: FormControl }>
  protected readonly Object = Object

  constructor(protected service: WebsiteService) {
    this.formGroup = this.initForm(this.params)
  }

  onSubmit() {
    const params = this.formGroup.value as BuildParams
    const newTimeFormat = params.timeFormat as any
    if (typeof newTimeFormat === "string") {
      params.timeFormat = JSON.parse(newTimeFormat)
    }
    this.service.build(params)
  }

  protected initForm(params: BuildParams) {
    const group: { [key: string]: FormControl } = {}
    Object.entries(params).forEach(([key, value]) => {
      const str = Array.isArray(value) ? value.join(",") : typeof value === "object" ? JSON.stringify(value) : value
      group[key] = new FormControl(str)
    })
    return new FormGroup(group)
  }
}
