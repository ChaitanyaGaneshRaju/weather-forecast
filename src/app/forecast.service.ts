import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { observable, Observable, Subject} from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  weathercastOf="home";

  constructor( private httpClient:HttpClient ) { }

  getWeathercastOf(){
    return this.weathercastOf;
  }

  setWeathercastOf(weathercastOf:string){
    this.weathercastOf=weathercastOf;
    this.componentMethodCallSource.next(weathercastOf);
  }

  getWeatherForeCast(){
    return new Observable(observer=>{
      navigator.geolocation.getCurrentPosition(position=>{
        observer.next(position)
      },error=>{
        observer.next(error)
      }
      )
    }).pipe(map((value:any)=>{
      return new HttpParams()
      .set('lon',value.coords.longitude)
      .set('lat',value.coords.latitude)
      .set('units','imperial')
      .set('appid','a6fca6cfbb275d13c0b9d720759db73c')
    }),switchMap((values)=>{
      return this.httpClient.get('https://api.openweathermap.org/data/2.5/forecast', {params:values} )
    }))
  }
}

