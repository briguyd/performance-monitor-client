import { Component } from '@angular/core';
import { OpenhwmonClientService } from './openhwmon-client.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private storageKey = 'hwmon-connection';
  connected = false;
  host = 'localhost';
  port = 8086;

  subscription: Subscription;
  result: any;
  title = 'performance-monitor-client';
  constructor(private hwMon: OpenhwmonClientService) {


  }

  ngOnInit() {
    // To retrieve data from localstorage
    const storedSettings = JSON.parse(localStorage.getItem(this.storageKey));

    if (storedSettings && storedSettings.host && storedSettings.port) {
      this.port = storedSettings.port;
      this.host = storedSettings.host;
      this.connected = true;
      this.connectToStatus();
      console.log(this.port, this.host);
    }
  }

  disconnectFromMonitor() {
    this.connected = false;
    localStorage.removeItem(this.storageKey);
  }

  connectToStatus() {
    this.hwMon.getHWStatus(this.host, this.port).subscribe((result) => this.result = result);

    const source = interval(10000);
    this.subscription = source.subscribe(() => this.hwMon.getHWStatus(this.host, this.port).subscribe((result) => this.result = result));
    this.connected = true;
    
    localStorage.setItem(this.storageKey, JSON.stringify({ host: this.host, port: this.port }));
  }

  getComponentByIcon(iconName: string) {
    if (this.result?.Children && this.result.Children.length > 0) {
      for (const child of this.result.Children[0]?.Children) {

        if (child.ImageURL === iconName) {
          return child;
        }
      }
    }
  }

  getComponentByName(name: string) {
    if (this.result?.Children && this.result.Children.length > 0) {
      for (const child of this.result.Children[0]?.Children) {

        if (child.Text === name) {
          return child;
        }
      }
    }
  }
}
