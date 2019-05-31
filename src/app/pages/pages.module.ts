import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorComponent } from "./error/error.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

@NgModule({
  declarations: [ErrorComponent, PageNotFoundComponent, LandingPageComponent],
  imports: [CommonModule]
})
export class PagesModule {}
