import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) =>{
    const authService = inject(AuthService);
   let token = authService.token

    if(token === undefined || token === null){
    token = localStorage.getItem("token")
    }

    const addToken = (req:HttpRequest<any>, token:string)=>{
        return  req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      if(!token) return next(req)
          return next(addToken(req,token))       
}