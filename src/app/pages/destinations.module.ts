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
import { HotelRecomendationsComponent } from './destinations/japan/components/recomendations/hoteles/hotel-recomendations.component';
import { ConectRecomendationsComponent } from './destinations/japan/components/recomendations/conectividad/conect-recomendations.component';
import { DineroRecomendationsComponent } from './destinations/japan/components/recomendations/dinero/dinero-recomendations.component';
import { IdiomaRecomendationsComponent } from './destinations/japan/components/recomendations/idioma/idioma-recomendations.component';

@NgModule({
  declarations: [
    JapanComponent,
    PragabudapestComponent,
    CopenhagueComponent,
    LandingComponent,
    RecomendationsComponent,
    TransportRecomendationsComponent,
    RestaurantRecomendationsComponent,
    HotelRecomendationsComponent,
    ConectRecomendationsComponent,
    DineroRecomendationsComponent,
    IdiomaRecomendationsComponent
    
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