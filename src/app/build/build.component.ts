import { Component, HostBinding } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-build",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./build.component.html",
  styleUrl: "./build.component.css"
})
export class BuildComponent {
  @HostBinding("class") hostClass = "section"
  outDir = "out"
  lang = "fr"
  timeFormat = JSON.stringify({
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  })

  onSubmit(buildForm: HTMLFormElement) {
    const timeFormat = JSON.parse(this.timeFormat)
  }
}
