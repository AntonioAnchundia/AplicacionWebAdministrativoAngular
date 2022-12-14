import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-technological',
  templateUrl: './technological.component.html',
  styleUrls: ['./technological.component.css']
})
export class TechnologicalComponent implements OnInit {
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  // responsive

  
  public getScreenWidth: any;
  public getScreenHeight: any;
  mostarSideNav: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  
  }
  // autocomplete
  // ********************************************************************************
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // ********************************************************************************
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

}
