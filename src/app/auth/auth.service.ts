import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from './auth.interface';
import { Observable, tap } from 'rxjs';
import { Read, RegionsInterface, SensorsInterface } from '../data/interfaces/regions.interface';
import { Sensor} from '../data/sensor.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null

  get isAuth(){
    if(!this.token){
      this.token = localStorage.getItem('token')
    }
    return !!this.token
  }

  constructor(private http:HttpClient) { }

  login(payload:{email:string, password: string}){
    return this.http.post<AuthInterface>(`http://localhost:8080/auth/sign-in`,payload).pipe(
      tap(value => {
        this.saveToken(value)
      })
    )
  }

  autorization(payload:{name:string, password: string, email:string}){
    return this.http.post('http://localhost:8080/auth/sign-up', payload)
  }

  getRegions():Observable<RegionsInterface>{
    return this.http.get<RegionsInterface>('http://localhost:8080/regions')
  }

  saveToken(res: AuthInterface) {
    this.token = res.token
    localStorage.setItem('token', this.token)
  }

  getRegionById(id:string):Observable<SensorsInterface>{
    return this.http.get<SensorsInterface>(`http://localhost:8080/sensors/query?regionID=${id}`)
  }

  getSensors(page: number):Observable<Sensor[]>{
    return this.http.get<Sensor[]>(`http://localhost:8080/sensors?page=${page}&limit=10`)
  }

  getSensor(id:string):Observable<Read>{
    return this.http.get<Read>(`http://localhost:8080/sensors/alt/${id}/readings`)
  }

}
