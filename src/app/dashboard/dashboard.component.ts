import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../store/model.state';
import { NameFilterUpdated, ArrhythmiaToogled } from "../store/model.actions";
import { Store } from '@ngxs/store';
import * as Patient from '../store/Patient';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(){}

  public Arrhythmia = Patient.Arrhythmia;

  @Input() model: Model;    
  nameFilterChanged = (nameFilter: String) => this.store.dispatch(new NameFilterUpdated(nameFilter));
}

@Component({
  selector: 'arrhythmia-selector',
  templateUrl: './arrhythmia-selector.component.html',
  styleUrls: [],
})
export class ArrhythmiaSelectorComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {}

  @Input() active: boolean;
  @Input() arrhythmia: Patient.Arrhythmia;
  click = () => this.store.dispatch(new ArrhythmiaToogled(this.arrhythmia));
}
