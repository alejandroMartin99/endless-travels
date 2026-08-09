import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JapanComponent } from './destinations/japan/japan.component';
import { PragabudapestComponent } from './destinations/pragabudapest/pragabudapest.component'; 
import { CopenhagueComponent } from './destinations/copenhague/copenhague.component';
import { PoloniaComponent } from './destinations/polonia/polonia.component';
import { LisboaSintraComponent } from './destinations/lisboasintra/lisboasintra.component';
import { NorgeComponent } from './destinations/norge/norge.component';

const routes: Routes = [
  { path: 'japan', component: JapanComponent },
  { path: 'pragabudapest', component: PragabudapestComponent },
  { path: 'polonia', component: PoloniaComponent },
  { path: 'copenhague', component: CopenhagueComponent },
  { path: 'lisboa-sintra', component: LisboaSintraComponent },
  { path: 'norge', component: NorgeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationsRoutingModule { }
