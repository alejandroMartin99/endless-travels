import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JapanComponent } from './destinations/japan/japan.component';
import { PragabudapestComponent } from './destinations/pragabudapest/pragabudapest.component'; 
import { CopenhagueComponent } from './destinations/copenhague/copenhague.component';

const routes: Routes = [
  { path: 'japan', component: JapanComponent },
  { path: 'pragabudapest', component: PragabudapestComponent },
  { path: 'copenhague', component: CopenhagueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationsRoutingModule { }
