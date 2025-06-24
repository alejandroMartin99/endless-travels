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
import { KyotoDaysComponent } from './destinations/japan/components/itinerary/Kyoto-days.component';
import { NgChartsModule } from 'ng2-charts';
import { ImagePopupComponent } from '../components/image-popup/image-popup.component';
import { InitJapanComponent } from './destinations/japan/components/inicio/init-japan.component';
import { JapanPriceComponent } from './destinations/japan/components/price/price.component';

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
    IdiomaRecomendationsComponent,
    KyotoDaysComponent,
    ImagePopupComponent,
    InitJapanComponent,
    JapanPriceComponent
    
  ],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    RouterLink,
    NgChartsModule,

  ],
  exports:[
    RouterModule,
    RouterLink,
  ]
})
export class DestinationsModule { }