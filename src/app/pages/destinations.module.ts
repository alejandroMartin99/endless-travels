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
import { JapanFullMapDialogComponent } from './destinations/japan/components/itinerary/japan-full-map/japan-full-map-dialog.component';
import { PragaItineraryComponent } from './destinations/pragabudapest/components/itinerary/praga_itinerary.component';
import { PragaBudapestCalendarComponent } from './destinations/pragabudapest/components/itinerary/calendar/PragaBudapestCalendar.component';
import { PragaBudapestRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/praga_recomendations.component';
import { RestaurantRecomendationsComponent as PragaRestaurantRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/restaurantes/restaurant-recomendations.component';
import { AccommodationRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/alojamiento/accommodation-recomendations.component';
import { TransportRecomendationsComponent as PragaTransportRecomendationsComponent } from './destinations/pragabudapest/components/recomendations/transporte/transport-recomendations.component';
import { InitPragabudapestComponent } from './destinations/pragabudapest/components/init/init-pragabudapest.component';
import { PragaBudapestPriceComponent } from './destinations/pragabudapest/components/price/price.component';
import { PoloniaComponent } from './destinations/polonia/polonia.component';
import { PoloniaItineraryComponent } from './destinations/polonia/components/itinerary/polonia_itinerary.component';
import { PoloniaCalendarComponent } from './destinations/polonia/components/itinerary/calendar/PoloniaCalendar.component';
import { InitPoloniaComponent } from './destinations/polonia/components/init/init-polonia.component';
import { PoloniaRecomendationsComponent } from './destinations/polonia/components/recomendations/polonia_recomendations.component';
import { PoloniaPriceComponent } from './destinations/polonia/components/price/price.component';
import { LisboaSintraComponent } from './destinations/lisboasintra/lisboasintra.component';
import { InitLisboaSintraComponent } from './destinations/lisboasintra/components/init/init-lisboasintra.component';
import { LisboaRecomendationsComponent } from './destinations/lisboasintra/components/recomendations/lisboa_recomendations.component';
import { LisboaItineraryComponent } from './destinations/lisboasintra/components/itinerary/lisboa_itinerary.component';
import { LisboaCalendarComponent } from './destinations/lisboasintra/components/itinerary/calendar/LisboaCalendar.component';
import { LisboaPriceComponent } from './destinations/lisboasintra/components/price/price.component';
import { NorgeComponent } from './destinations/norge/norge.component';
import { NorgeMapComponent } from './destinations/norge/components/norge-map.component';
import { NorgeDrawerComponent } from './destinations/norge/components/norge-drawer.component';
import { NorgeDayItineraryComponent } from './destinations/norge/components/norge-day-itinerary.component';

@NgModule({
  declarations: [
    JapanComponent,
    PragabudapestComponent,
    PoloniaComponent,
    CopenhagueComponent,
    LisboaSintraComponent,
    NorgeComponent,
    NorgeMapComponent,
    NorgeDrawerComponent,
    NorgeDayItineraryComponent,
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
    JapanFullMapDialogComponent,
    PragaItineraryComponent,
    PragaBudapestCalendarComponent,
    PragaBudapestRecomendationsComponent,
    PragaRestaurantRecomendationsComponent,
    AccommodationRecomendationsComponent,
    PragaTransportRecomendationsComponent,
    InitPragabudapestComponent,
    PragaBudapestPriceComponent,
    PoloniaItineraryComponent,
    PoloniaCalendarComponent,
    InitPoloniaComponent,
    PoloniaRecomendationsComponent,
    PoloniaPriceComponent,
    InitLisboaSintraComponent,
    LisboaRecomendationsComponent,
    LisboaItineraryComponent,
    LisboaCalendarComponent,
    LisboaPriceComponent,
  ],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    RouterLink,
    NgChartsModule
  ],
  exports:[
    RouterModule,
    RouterLink,
  ]
})
export class DestinationsModule { }