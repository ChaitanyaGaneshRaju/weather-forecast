import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {

  weatherData:any[]=[];
  forecastDetails:any;

  primaryDisplay=true;
  secondaryDisplay=false;

  selectedIndex:number | undefined;

  constructor(private forecastService:ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getWeatherForeCast().pipe(
      pluck('list')
    )
    .subscribe(data=>{
      this.futureForecast(data)
    })
  }

  futureForecast(data:any){
    for(let i = 0; i < data.length; i = i+8){
      this.weatherData.push(data[i])
    }
  }

  togglefoDetails(data:any,index:number){
    this.toggle();
    this.forecastDetails = data;
    this.selectedIndex = index;
  }

  showDetails(data:any,index:number){
    this.forecastDetails=data;
    this.selectedIndex=index;
  }

  toggle(){
    this.primaryDisplay=!this.primaryDisplay;
    this.secondaryDisplay=!this.secondaryDisplay;
  }

}
