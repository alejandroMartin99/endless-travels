import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'destinations',
    loadChildren: () => import('./pages/destinations.module').then(m => m.DestinationsModule)
  },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
