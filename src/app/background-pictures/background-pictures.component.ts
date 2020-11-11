import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-background-pictures',
  templateUrl: './background-pictures.component.html',
  styleUrls: ['./background-pictures.component.scss'],
  animations: [
  ]
})
export class BackgroundPicturesComponent implements OnInit {
  @ViewChild('backgroundHost') backgroundHost: ElementRef;

  public villagers;
  public remainingVillagers;
  public count = 0;
  public displayedVillagers = [];

  constructor(private http: HttpClient, private zone: NgZone, private el: ElementRef) { }

  ngOnInit(): void {
    this.getVillagersList().subscribe((villagers) => this.setVillagerList(villagers));
  }

  setVillagerList(villagers: any) {
    this.villagers = villagers.images;
    this.remainingVillagers = this.villagers.slice();
    this.displayVillagers();
  }

  displayVillagers() {
    let villagerIndex = 0;
    for (let i = 0; i < (this.backgroundHost.nativeElement.offsetHeight / 64) - 1; i++) {
      const row = [];
      for (let j = 0; j < (this.backgroundHost.nativeElement.offsetWidth / 64) - 1; j++) {
        row.push(this.getRandomVillager());
        villagerIndex++;
      }
      this.displayedVillagers.push(row);
    }
  }

  getRandomVillager(): string {
    if (this.remainingVillagers.length === 0) {
      this.remainingVillagers = this.villagers.slice();
    }
    return this.remainingVillagers.splice(this.remainingVillagers.length * Math.random() | 0, 1);
    
  }

  getVillagersList() {
    return this.http.get('../assets/villagers/villagers.json');
  }

}
