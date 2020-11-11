import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-network-monitor',
  templateUrl: './network-monitor.component.html',
  styleUrls: ['./network-monitor.component.scss']
})
export class NetworkMonitorComponent implements OnInit {

  @Input() hwData;

  uploadSpeed;
  downloadSpeed;

  constructor() { }

  ngOnInit(): void {
    this.setNetworkUsage();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setNetworkUsage();
  }

  setNetworkUsage() {
    if (this.hwData?.Children) {
      for (const child of this.hwData.Children) {
        if (child.Text === 'Throughput') {
          for (const loadChild of child.Children) {
            if (loadChild.Text === 'Upload Speed') {
              this.uploadSpeed = loadChild.Value;
            } else if (loadChild.Text === 'Download Speed') {
              this.downloadSpeed = loadChild.Value;
            }
          }
        }
      }
    }
  }

}
