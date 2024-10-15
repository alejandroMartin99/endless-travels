import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ItineraryDayCardComponent } from './itinerary-day-card/itinerary-day-card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ToolbarComponent,
    ItineraryDayCardComponent,
    // Agrega aquí otros componentes que quieras agrupar
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ToolbarComponent,
    ItineraryDayCardComponent,
    // Exporta los componentes que quieras usar en otros módulos
  ]
})
export class SharedModule { }