import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  mostarSideNav: boolean = false;

  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  constructor() { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  
  }
 

}
