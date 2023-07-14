import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { JwtTokenService } from '../services/jwtToken.service';
import { StoreTokenService } from '../services/storeToken.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  userId;
  errorMessage: string;
  constructor(
    private router: Router,
    private injector: Injector,
    private tokenService: StoreTokenService,
  ) {
    // this.commonService.getUser();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(request).pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {

            }
          },
          (error: HttpErrorResponse) => {
            if (error instanceof HttpErrorResponse) {
              // this.router.navigate(['auth']);
            }
          }
        )
      );
    } else {
      let service = this.injector.get(JwtTokenService);
      // this.userId = service.getDecodeToken("userId");
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            // id: `${this.userId}`,
          },
        });

    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.router.navigate(['auth']);
          }

        }
      )
    );
  }
}
