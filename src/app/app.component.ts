import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-forecast';
}
