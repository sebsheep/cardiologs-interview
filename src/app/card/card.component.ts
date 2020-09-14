import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Patient from '../store/Patient';
import { NgClass } from '@angular/common';
import { StatusClicked } from '../store/model.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./card.component.css'],
})
export class LoadingCardComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [],
})
export class CardComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {}

  public PatientStatus = Patient.Status;
  public Arrhythmia = Patient.Arrhythmia;
  @Input() patient: Patient.Patient;
  @Output() pendingClicked = () =>
    this.store.dispatch(
      new StatusClicked(this.patient.id, Patient.Status.Pending)
    );
  @Output() rejectedClicked = () =>
    this.store.dispatch(
      new StatusClicked(this.patient.id, Patient.Status.Rejected)
    );
  @Output() doneClicked = () =>
    this.store.dispatch(
      new StatusClicked(this.patient.id, Patient.Status.Done)
    );
}

@Component({
  selector: 'status-button',
  templateUrl: './status-button.component.html',
  styleUrls: [],
})
export class StatusButtonComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() active: boolean;
  @Input() activeClass: String;
  @Input() icon: String;
  @Output() click = new EventEmitter();
}

@Component({
  selector: 'arrhythmia',
  templateUrl: './arrhythmia.component.html',
  styleUrls: [],
})
export class ArrhythmiaComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() active: boolean;
}
