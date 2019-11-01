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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {OktaAuthModule, OktaAuthService, OktaCallbackComponent} from '@okta/okta-angular';
import {ProductsService} from "./services/products.service";
import {AuthInterceptor} from "./services/authInterceptor.service";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {API_PATH} from "./common/constants";

export function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({uri: `${API_PATH.baseUrl}/${API_PATH.graph}`}),
        cache: new InMemoryCache(),
    };
}

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
        }),
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    providers: [
        { provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink] },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
