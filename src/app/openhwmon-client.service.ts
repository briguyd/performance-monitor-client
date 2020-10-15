import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenhwmonClientService {
  private corsHeaders: HttpHeaders;
  constructor(private _http: HttpClient) { 
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    
  }

  public getHWStatus(host: string, port: number): Observable<any> {
    return this._http
      .get<any>(
        'http://' + host + ':' + port + '/data.json', {headers: this.corsHeaders}
      )
      .pipe(catchError((e) => this.handleError(e)));
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(error || 'Server error');
  }
}
