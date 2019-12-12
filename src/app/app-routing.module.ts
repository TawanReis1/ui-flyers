import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './shared/security/authorize-guard';

import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginComponent } from './views/login/login.component';

import { FlierListComponent } from './views/fliers/flier-list/flier-list.component';
import { FlierDetailsComponent } from './views/fliers/flier-details/flier-details.component';
import { NewFlierComponent } from './views/fliers/new-flier/new-flier.component';

import { ClientListComponent } from './views/clients/client-list/client-list.component';
import { ClientDetailsComponent } from './views/clients/client-details/client-details.component';
import { NewClientComponent } from './views/clients/new-client/new-client.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, canActivate: [AuthorizeGuard],
    children: [
      { path: 'fliers', component: FlierListComponent },
      { path: 'fliers/:id', component: FlierDetailsComponent },
      { path: 'fliers/new/flier', component: NewFlierComponent },

      { path: 'clients', component: ClientListComponent },
      { path: 'clients/:id', component: ClientDetailsComponent },
      { path: 'clients/new/client', component: NewClientComponent },
    ]
  },
  {
    path: '', component: NavbarComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
