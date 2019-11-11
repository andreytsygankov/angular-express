import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {OktaAuthService} from "@okta/okta-angular";
import {StorageService} from "./storage.service";
// import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public oktaAuth: OktaAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.oktaAuth.getAccessToken();
    const token = StorageService.getItem('okta-token-storage');

    if (token) {
      const headers = {Authorization: `Bearer ${token.accessToken.accessToken}`};

      if (!request.headers.has('Contents')) {
        headers['Content-Type'] = 'application/json';
      }

      request = request.clone({
        setHeaders: {...headers}
      });
    }

    return next.handle(request);
  }
}
