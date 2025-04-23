import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-japan',
  templateUrl: './japan.component.html',
  styleUrl: './japan.component.css'
})
export class JapanComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  selectedTabIndex = 2;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicialización básica
  }

  // Usa OnTabChanged para controlar el cambio de pestañas
  onTabChanged(event: any): void {
    // Evitar ciclos de detección innecesarios
    this.selectedTabIndex = event.index;
    this.cdr.detectChanges();
  }
}