import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JapanComponent } from './destinations/japan/japan.component';
import { PragabudapestComponent } from './destinations/pragabudapest/pragabudapest.component';
import { CopenhagueComponent } from './destinations/copenhague/copenhague.component';
import { DestinationsRoutingModule } from './destinations-routing.module';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../components/shared.module';
import { LandingComponent } from './landing/landing.component';
import { RecomendationsComponent } from './destinations/japan/components/recomendations/recomendations.component';
import { TransportRecomendationsComponent } from './destinations/japan/components/recomendations/transporte/transport-recomendations.component';
import { RestaurantRecomendationsComponent } from './destinations/japan/components/recomendations/restaurantes/restaurant-recomendations.component';

@NgModule({
  declarations: [
    JapanComponent,
    PragabudapestComponent,
    CopenhagueComponent,
    LandingComponent,
    RecomendationsComponent,
    TransportRecomendationsComponent,
    RestaurantRecomendationsComponent
    
  ],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    RouterLink,

  ],
  exports:[
    RouterModule,
    RouterLink,
  ]
})
export class DestinationsModule { }