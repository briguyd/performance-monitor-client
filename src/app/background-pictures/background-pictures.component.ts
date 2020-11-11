import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent, keyframes
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-background-pictures',
  templateUrl: './background-pictures.component.html',
  styleUrls: ['./background-pictures.component.scss'],
  animations: [
    // danceAnimation
    trigger('dancingVillager', [
      state('normal', style({
        transform: 'rotate(0deg) scale(1)'
      })),
      state('tiltLeft', style({
        transform: 'rotate(-90deg) scale(1)'
      })),
      state('tiltRight', style({
        transform: 'rotate(90deg) scale(1)'
      })),
      state('slightShrink', style({
        transform: 'scale(.5)'
      })),
      state('disappear', style({
        transform: 'scale(0.01)'
      })),
      transition('* => *', [
        animate('5s')
      ]),
      // transition('* => tiltRight', [
      //   animate('5s')
      // ]),
      // transition('* => slightShrink', [
      //   animate('5s')
      // ]),
      // transition('* => disappear', [
      //   animate('5s')
      // ]),
      transition('disappear => *', [
        animate('5s', keyframes([
          style({ transform: 'scale(0.1)', offset: 0.1}),
          style({ transform: 'scale(0.5)', offset: 0.5})
        ]))
      ])
    ])
  ]
})
export class BackgroundPicturesComponent implements OnInit {
  @ViewChild('backgroundHost') backgroundHost: ElementRef;

  public villagers;
  public remainingVillagers;
  public count = 0;
  public displayedVillagers = [];

  constructor(private http: HttpClient, private zone: NgZone, private el: ElementRef,
    private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getVillagersList().subscribe((villagers) => this.setVillagerList(villagers));
    setInterval(() => this.updateAnimations(), 5000);
  }

  setVillagerList(villagers: any) {
    this.villagers = villagers.images;
    this.remainingVillagers = this.villagers.slice();
    this.displayVillagers();
  }

  updateAnimations() {
    for (const row of this.displayedVillagers) {
      for (const villager of row) {
        const rand = Math.random();
        if (rand > 0.80) {
          villager.state = 'tiltLeft'
        } else if (rand > .6) {
          villager.state = 'tiltRight';
        } else 
        if (rand > 0.5) {
          villager.state = 'normal';
        } 
        else if (rand > .3) {
          villager.state = 'disappear';
        }
      }
    }
  }

  onAnimationEvent(event: AnimationEvent, villager) {

    if (event.toState === 'disappear') {
      villager.image = this.getRandomVillager();
      this.cdRef.detectChanges();
    }
  }

  displayVillagers() {
    let villagerIndex = 0;
    // this.displayedVillagers = [[{image: this.getRandomVillager(), state: 'hiddenVillager'}]];
    for (let i = 0; i < (this.backgroundHost.nativeElement.offsetHeight / 64) - 1; i++) {
      const row = [];
      for (let j = 0; j < (this.backgroundHost.nativeElement.offsetWidth / 64) - 1; j++) {
        row.push({image: this.getRandomVillager(), state: 'hiddenVillager'});
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
