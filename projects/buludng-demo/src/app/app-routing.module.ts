import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoDatatableComponent } from './components/demo-datatable/demo-datatable.component';

const routes: Routes = [
  { path: 'datatable', component: DemoDatatableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
