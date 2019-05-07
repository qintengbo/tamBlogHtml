import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteppingPitComponent } from './stepping-pit.component';
import { SteppingPitRoutingModule } from './stepping-pit-routing.module';

@NgModule({
  declarations: [
    SteppingPitComponent
  ],
  imports: [
    CommonModule,
    SteppingPitRoutingModule
  ]
})
export class SteppingPitModule { }
