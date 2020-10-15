import { Component } from '@angular/core';
import { OpenhwmonClientService } from './openhwmon-client.service';
// import villagers from '../assets/villagers/villagers.json';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  subscription: Subscription;
  result: any;
  title = 'performance-monitor-client';
  public villagers;
  constructor(private hwMon: OpenhwmonClientService, private http: HttpClient) {
    this.hwMon.getHWStatus('localhost', 8086).subscribe((result) => this.result = result);

    this.getVillagersList().subscribe((villagers) => this.villagers = villagers);

    const source = interval(10000);
    this.subscription = source.subscribe(() => this.hwMon.getHWStatus('localhost', 8086).subscribe((result) => this.result = result));

  }

  getVillagersList() {
    return this.http.get('assets/villagers/villagers.json');
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
}
