import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MidiasComponent } from './pages/midias/midias.component';

const routes: Routes = [
  { path: 'midias', component: MidiasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
