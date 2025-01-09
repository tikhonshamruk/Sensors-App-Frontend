import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) =>{
  console.log("SOMEtimE SDOMF SOMETIME I WILL BE HERE, I DONT KNOW WHEN EXACTLY")
    const authService = inject(AuthService);
    const token = authService.token

    const addToken = (req:HttpRequest<any>, token:string)=>{
      console.log("Im here", token)
        return  req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      if(!token) return next(req)

      console.log("I'm here, why are you lauthing, so hard!")
          return next(addToken(req,token))

        
}