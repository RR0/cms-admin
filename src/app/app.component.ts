import { Component, Inject, PLATFORM_ID } from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"
import { isPlatformBrowser } from "@angular/common"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isBrowser: boolean;
  title = 'with-angular';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  async ngOnInit() {
    if (this.isBrowser) {
    /*  const fetchCall = await fetch('http://localhost:4000/api/data');
      const fetchResp = await fetchCall.json();
      console.log(fetchResp);*/
      // Do something
    }
  }
}
