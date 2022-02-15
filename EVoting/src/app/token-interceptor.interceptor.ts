import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AuthenthicationService } from './servicies/authenthication.service';
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthenthicationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   console.log("Request Body"+request.body);
    if (this.authService.getJwtToken()) {
      request = this.addToken(request , this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(errors => {
     //errors instanceof HttpResponse &&
      if (   errors.status === 401) {
        return this.handle401Error(request, next);
      } else {
          return throwError(errors);
        }
        }));
  }
  addToken(request : HttpRequest<any>, token:string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  handle401Error(request : HttpRequest<any>, next : HttpHandler) {
    if(!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token:any)=>
        {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request,token.jwt));
        })
      );
    }
    else{
    return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt =>{
          return next.handle(this.addToken(request,jwt))
         })
      );
    }
  }
}
