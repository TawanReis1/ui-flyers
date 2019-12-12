import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrHelper } from './shared/helpers/toastr';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './views/clients/client-list/client-list.component';
import { ClientDetailsComponent } from './views/clients/client-details/client-details.component';
import { NewClientComponent } from './views/clients/new-client/new-client.component';
import { FlierListComponent } from './views/fliers/flier-list/flier-list.component';
import { FlierDetailsComponent } from './views/fliers/flier-details/flier-details.component';
import { NewFlierComponent } from './views/fliers/new-flier/new-flier.component';
import { LoginComponent } from './views/login/login.component';
import { AuthorizeGuard } from './shared/security/authorize-guard';
import { LoaderComponent } from './shared/helpers/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


export let options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localePt)



@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailsComponent,
    NewClientComponent,
    FlierListComponent,
    FlierDetailsComponent,
    NewFlierComponent,
    LoginComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    DpDatePickerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    AuthorizeGuard,
    ToastrHelper,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
