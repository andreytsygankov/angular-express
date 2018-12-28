import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {OktaAuthModule, OktaAuthService, OktaCallbackComponent} from '@okta/okta-angular';
import {ProductsService} from "./products/products.service";



@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        FormsModule,
        OktaAuthModule.initAuth({
            issuer: 'https://dev-159175.oktapreview.com/oauth2/default',
            redirectUri: 'http://localhost:4200/implicit/callback',
            clientId: '0oailisx18ZcWlvCb0h7'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
