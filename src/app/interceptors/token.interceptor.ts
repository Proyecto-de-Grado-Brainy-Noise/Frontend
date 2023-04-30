import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import jwt_decode from "jwt-decode";

interface TokenPayload{
  role: string,
  name: string,
  sub: string,
  iat: number,
  exp: number
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  flag = 0;

  constructor(
      private http: HttpClient,
      private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem("Token");

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(request).pipe(catchError(error => {
        if (error.status == 401 || error.status == 403){
          this.flag++;
          sessionStorage.setItem("Token", sessionStorage.getItem("NewToken")!);

          if(this.flag > 1){
            sessionStorage.clear();
            this.router.navigate(["login"]);
            return throwError(() => new Error('Error al renovar el token'));
          }

          return this.http.get('http://api-gateway:9000/api/auth/renovate-token', { observe: 'response' }).pipe(
              switchMap((response: HttpResponse<any>) => {
                if (response.status == 200){
                  this.flag = 0;
                  sessionStorage.setItem("Token", response.body.token);
                  sessionStorage.setItem("NewToken", response.body.newToken);
                  const decodedToken = jwt_decode(response.body.token) as TokenPayload;
                  sessionStorage.setItem("name", decodedToken.name);
                  sessionStorage.setItem("role", decodedToken.role);
                  sessionStorage.setItem("email", decodedToken.sub);
                  const token = sessionStorage.getItem("Token");
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                  return next.handle(request);
                } else {
                  return throwError(() => new Error('Error al renovar el token'));
                }
              }),
              catchError((error)=> {
                return throwError(() => new Error('Error al renovar el token'));
              }));
        } else {
          return throwError(() => new Error('Error al renovar el token'));
        }
      }));
    }
    return next.handle(request);
  }
}
