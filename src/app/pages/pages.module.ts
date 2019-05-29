import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorComponent } from "./error/error.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LandPageComponent } from './land-page/land-page.component';

@NgModule({
  declarations: [ErrorComponent, PageNotFoundComponent, LandPageComponent],
  imports: [CommonModule]
})
export class PagesModule {}
