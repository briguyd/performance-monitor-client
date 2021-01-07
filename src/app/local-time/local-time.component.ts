import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-time',
  templateUrl: './local-time.component.html',
  styleUrls: ['./local-time.component.scss']
})
export class LocalTimeComponent implements OnInit {

  public time;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateClock();
    setInterval(this.updateClock.bind(this), 1000);
  }

  private updateClock() {
    this.time = new Date().toLocaleTimeString();
    this.cd.markForCheck();
  }

}
