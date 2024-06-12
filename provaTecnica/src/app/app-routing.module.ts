import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LandingComponent } from './landing/landing.component'
import { DetailComponent } from './detail/detail.component'
const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
