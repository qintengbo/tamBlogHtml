import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteppingPitComponent } from './stepping-pit.component';

const routes: Routes = [
  {
    path: '',
    component: SteppingPitComponent,
    data: { title: '踩坑记' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SteppingPitRoutingModule { }
