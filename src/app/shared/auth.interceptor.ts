import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

import { HttpInterceptorFn } from "@angular/common/http";

import { AuthService } from "./auth.service";

export const loggerInterceptor : HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    let modifiedReq = req;

    if (auth.isAuthenticated()) {
        const token = auth.token || '';

        modifiedReq = req.clone({
            params: req.params.set('auth', token)
        });
    }

    return next(modifiedReq).pipe(
        catchError(error => {
            if (error.status === 401) {
                auth.logout();
                router.navigate(["/admin", "login"]);
            }
            return throwError(error);
        })
    );
};