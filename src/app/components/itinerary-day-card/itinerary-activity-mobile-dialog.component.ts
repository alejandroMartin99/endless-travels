import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ItineraryActivityMobileDialogItem {
  name: string;
  description: string;
  images: string[];
}

export interface ItineraryActivityMobileDialogData {
  activities: ItineraryActivityMobileDialogItem[];
  activityIndex: number;
  onActivityChange?: (index: number) => void;
}

@Component({
  selector: 'app-itinerary-activity-mobile-dialog',
  templateUrl: './itinerary-activity-mobile-dialog.component.html',
  styleUrls: ['./itinerary-activity-mobile-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ItineraryActivityMobileDialogComponent {
  activityIndex: number;
  imageIndex = 0;
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(
    private dialogRef: MatDialogRef<ItineraryActivityMobileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItineraryActivityMobileDialogData,
  ) {
    this.activityIndex = data.activityIndex;
  }

  get current() {
    return this.data.activities[this.activityIndex];
  }

  get total(): number {
    return this.data.activities.length;
  }

  close(): void {
    this.dialogRef.close(this.activityIndex);
  }

  changeActivity(delta: number): void {
    const next = this.activityIndex + delta;
    if (next < 0 || next >= this.total) return;
    this.activityIndex = next;
    this.imageIndex = 0;
    this.data.onActivityChange?.(next);
  }

  changeImage(delta: number): void {
    const imgs = this.current.images ?? [];
    const next = this.imageIndex + delta;
    if (next < 0 || next >= imgs.length) return;
    this.imageIndex = next;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    const dist = this.touchEndX - this.touchStartX;
    if (Math.abs(dist) < 40) return;
    if (dist > 0) this.changeImage(-1);
    else this.changeImage(1);
  }
}
