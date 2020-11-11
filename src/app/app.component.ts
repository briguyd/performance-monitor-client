import { Component } from '@angular/core';
import { OpenhwmonClientService } from './openhwmon-client.service';
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
  constructor(private hwMon: OpenhwmonClientService) {
    this.hwMon.getHWStatus('localhost', 8086).subscribe((result) => this.result = result);


    const source = interval(10000);
    this.subscription = source.subscribe(() => this.hwMon.getHWStatus('localhost', 8086).subscribe((result) => this.result = result));

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
