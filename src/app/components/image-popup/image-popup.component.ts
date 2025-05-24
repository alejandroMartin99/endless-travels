// image-popup.component.ts
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-image-popup',
  template: `
    <div class="image-popup-overlay" 
         *ngIf="isOpen" 
         (click)="closePopup()"
         [@fadeInOut]>
      
      <!-- Contenedor principal del popup -->
      <div class="image-popup-container" 
           (click)="$event.stopPropagation()"
           [@slideInOut]>
        
        <!-- Header con botones de control -->
        <div class="image-popup-header">
          <div class="image-popup-title">{{title || 'Imagen'}}</div>
          <div class="image-popup-controls">
            <button mat-icon-button 
                    class="control-btn" 
                    (click)="zoomOut()" 
                    [disabled]="zoomLevel <= minZoom"
                    title="Alejar">
              <mat-icon>zoom_out</mat-icon>
            </button>
            
            <span class="zoom-indicator">{{Math.round(zoomLevel * 100)}}%</span>
            
            <button mat-icon-button 
                    class="control-btn" 
                    (click)="zoomIn()" 
                    [disabled]="zoomLevel >= maxZoom"
                    title="Acercar">
              <mat-icon>zoom_in</mat-icon>
            </button>
            
            <button mat-icon-button 
                    class="control-btn" 
                    (click)="resetZoom()"
                    title="Restablecer zoom">
              <mat-icon>refresh</mat-icon>
            </button>
            
            <button mat-icon-button 
                    class="control-btn" 
                    (click)="downloadImage()"
                    title="Descargar imagen">
              <mat-icon>download</mat-icon>
            </button>
            
            <button mat-icon-button 
                    class="control-btn close-btn" 
                    (click)="closePopup()"
                    title="Cerrar">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </div>
        
        <!-- Contenedor de la imagen con scroll -->
        <div class="image-popup-content" 
             #imageContainer
             (wheel)="onWheel($event)"
             (mousedown)="startDrag($event)"
             (mousemove)="onDrag($event)"
             (mouseup)="endDrag()"
             (mouseleave)="endDrag()">
          
          <img [src]="imageSrc" 
               [alt]="alt || 'Imagen ampliada'"
               class="popup-image"
               [style.transform]="getTransform()"
               (load)="onImageLoad()"
               #popupImage
               draggable="false" />
        </div>
        
        <!-- Footer con información adicional -->
        <div class="image-popup-footer" *ngIf="description">
          <p>{{description}}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./image-popup.component.scss'],
  animations: [
    // Aquí irían las animaciones de Angular si las usas
  ]
})
export class ImagePopupComponent {
  @Input() imageSrc: string = '';
  @Input() alt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isOpen: boolean = false;
  
  @Output() closed = new EventEmitter<void>();
  
  // Propiedades de zoom y pan
  zoomLevel: number = 1;
  minZoom: number = 0.1;
  maxZoom: number = 5;
  zoomStep: number = 0.2;
  
  // Propiedades de arrastre
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  
  Math = Math; // Para usar Math.round en el template
  
  constructor() {}
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isOpen) return;
    
    switch(event.key) {
      case 'Escape':
        this.closePopup();
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.zoomIn();
        break;
      case '-':
        event.preventDefault();
        this.zoomOut();
        break;
      case '0':
        event.preventDefault();
        this.resetZoom();
        break;
    }
  }
  
  closePopup(): void {
    this.isOpen = false;
    this.resetZoom();
    this.closed.emit();
  }
  
  zoomIn(): void {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
    }
  }
  
  zoomOut(): void {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, this.minZoom);
      this.adjustTranslation();
    }
  }
  
  resetZoom(): void {
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
  }
  
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const delta = event.deltaY > 0 ? -this.zoomStep : this.zoomStep;
    const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel + delta));
    
    if (newZoom !== this.zoomLevel) {
      this.zoomLevel = newZoom;
      this.adjustTranslation();
    }
  }
  
  startDrag(event: MouseEvent): void {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.translateX;
      this.dragStartY = event.clientY - this.translateY;
      event.preventDefault();
    }
  }
  
  onDrag(event: MouseEvent): void {
    if (this.isDragging && this.zoomLevel > 1) {
      this.translateX = event.clientX - this.dragStartX;
      this.translateY = event.clientY - this.dragStartY;
      event.preventDefault();
    }
  }
  
  endDrag(): void {
    this.isDragging = false;
  }
  
  adjustTranslation(): void {
    // Limitar la traducción para evitar que la imagen se mueva demasiado
    const maxTranslate = 100 * (this.zoomLevel - 1);
    this.translateX = Math.max(-maxTranslate, Math.min(maxTranslate, this.translateX));
    this.translateY = Math.max(-maxTranslate, Math.min(maxTranslate, this.translateY));
  }
  
  getTransform(): string {
    return `scale(${this.zoomLevel}) translate(${this.translateX / this.zoomLevel}px, ${this.translateY / this.zoomLevel}px)`;
  }
  
  onImageLoad(): void {
    // Resetear propiedades cuando se carga una nueva imagen
    this.resetZoom();
  }
  
  downloadImage(): void {
    if (!this.imageSrc) return;
    
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = this.imageSrc;
    link.download = this.getImageFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  private getImageFileName(): string {
    if (this.title) {
      return `${this.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    }
    
    // Extraer nombre del archivo de la URL
    const urlParts = this.imageSrc.split('/');
    const fileName = urlParts[urlParts.length - 1];
    return fileName || 'imagen.jpg';
  }
}