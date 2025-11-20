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
import { JapanCalendarComponent } from './destinations/japan/components/itinerary/JapanCalendar/JapanCalendar.component';
import { PragaItineraryComponent } from './destinations/pragabudapest/components/itinerary/praga_itinerary.component';
import { PragaBudapestCalendarComponent } from './destinations/pragabudapest/components/itinerary/calendar/PragaBudapestCalendar.component';
import { PragaBudapestRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/praga_recomendations.component';
import { RestaurantRecomendationsComponent as PragaRestaurantRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/restaurantes/restaurant-recomendations.component';
import { AccommodationRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/alojamiento/accommodation-recomendations.component';
import { TransportRecomendationsComponent as PragaTransportRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/transporte/transport-recomendations.component';

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
    JapanPriceComponent,
    JapanCalendarComponent,
    PragaItineraryComponent,
    PragaBudapestCalendarComponent,
    PragaBudapestRecomendationsComponent,
    PragaRestaurantRecomendationsComponent,
    AccommodationRecomendationsComponent,
    PragaTransportRecomendationsComponent
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