import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalWeatherService } from './local-weather.service';
import weatherSunny from '@iconify/icons-mdi/weather-sunny';
import weatherNight from '@iconify/icons-mdi/weather-night';
import weatherPartlyCloudy from '@iconify/icons-mdi/weather-partly-cloudy';
import weatherNightPartlyCloudy from '@iconify/icons-mdi/weather-night-partly-cloudy';
import weatherCloudy from '@iconify/icons-mdi/weather-cloudy';
import weatherPouring from '@iconify/icons-mdi/weather-pouring';
import weatherRainy from '@iconify/icons-mdi/weather-rainy';
import weatherLightning from '@iconify/icons-mdi/weather-lightning';
import snowflake from '@iconify/icons-mdi/snowflake';
import weatherFog from '@iconify/icons-mdi/weather-fog';
const config = require("../../../config.json");


@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.scss']
})
export class LocalWeatherComponent implements OnInit {

  private iconMap = new Map();
  public weather: any;
  private position: { latitude: number, longitude: number } | null = null;
  constructor(private ws: LocalWeatherService, private cd: ChangeDetectorRef) { 
    this.iconMap.set('clear sky', [weatherSunny, weatherNight]);
    this.iconMap.set('few clouds', [weatherPartlyCloudy, weatherNightPartlyCloudy]);
    this.iconMap.set('scattered clouds', [weatherCloudy, weatherCloudy]);
    this.iconMap.set('broken clouds', [weatherCloudy, weatherCloudy]);
    this.iconMap.set('shower rain', [weatherPouring, weatherPouring]);
    this.iconMap.set('rain', [weatherRainy, weatherRainy]);
    this.iconMap.set('thunderstorm', [weatherLightning, weatherLightning]);
    this.iconMap.set('snow', [snowflake, snowflake]);
    this.iconMap.set('mist', [weatherFog, weatherFog]);
  }
  // http://api.openweathermap.org/data/2.5/weather?lat=39.6363&lon=-106.5242&appid=5a1f40482eda54720087aef159adb8fe&units=imperial
  ngOnInit(): void {
    this.getLocation();
    setInterval(this.getLocation.bind(this), 1000 * 60 * 60); // update every hour
    this.getLocation();
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    } else {
      console.error('No Location Available');
    }
  }

  public getWeatherIcon() {
    if (this.weather?.weather && this.weather.weather[0]?.description) {
      const icons = this.iconMap.get(this.weather.weather[0].description);
      if (icons) {
        return icons[0];
      }
    }
  }

  private setPosition(position) {
    this.position = position.coords;
    this.ws.getWeather(this.position, config.weatherApiKey).subscribe(res => this.setWeather(res));
  }

  private setWeather(result: any) {
    this.weather = result;
    this.cd.markForCheck();
  }

  public getTemp() {
    return Math.round(this.weather?.main?.temp) + '°';
    
  }
}