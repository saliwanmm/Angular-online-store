import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(
        private auth: AuthService,
        private router: Router,
    ) {console.log("Interseptor has created BRO!")}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedReq = req;

        if (this.auth.isAuthenticated()) {
            const token = this.auth.token || '';
            console.log("here is token: " + token);

            modifiedReq = req.clone({
                params: req.params.set('auth', token)
            });
        }
        console.log("Interseptor has created BRO!");
        return next.handle(modifiedReq)
        .pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.auth.logout()
                    this.router.navigate(["/admin", "login"])
                }
                return throwError(error)
            })
        )
    }
}