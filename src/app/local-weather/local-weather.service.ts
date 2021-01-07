import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalWeatherService {

  private corsHeaders: HttpHeaders;
  constructor(private _http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

  }

  public getWeather(coords: { latitude: number, longitude: number }, apiKey: string): Observable<any> {
    return this._http
      .get<any>(
        `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${apiKey}`, { headers: this.corsHeaders }
      )
      .pipe(catchError((e) => this.handleError(e)));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(error || 'Server error');
  }
}
