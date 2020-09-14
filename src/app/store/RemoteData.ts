import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Patient from './Patient';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type Patients = LoadingPatients | LoadedPatients | ErrorPatients;

export class LoadingPatients {
  status: 'loading' = 'loading';
  map(f: (p: Patient.Patient) => Patient.Patient): LoadingPatients {
    return new LoadingPatients();
  }
}

export class LoadedPatients {
  status: 'loaded' = 'loaded';
  patients: Array<Patient.Patient>;

  map(f: (p: Patient.Patient) => Patient.Patient): LoadedPatients {
    return new LoadedPatients(this.patients.map(f));
  }

  getNotDone(
    nameFilter: String,
    arrhythmiasFilter: Set<Patient.Arrhythmia>
  ): Array<Patient.Patient> {
    let filter = filterFunction(nameFilter, arrhythmiasFilter);
    return this.patients.filter(
      (p) => p.status != Patient.Status.Done && filter(p)
    );
  }

  getDone(
    nameFilter: String,
    arrhythmiasFilter: Set<Patient.Arrhythmia>
  ): Array<Patient.Patient> {
    let filter = filterFunction(nameFilter, arrhythmiasFilter);
    return this.patients.filter(
      (p) => p.status === Patient.Status.Done && filter(p)
    );
  }
  constructor(patients) {
    this.patients = patients;
  }
}

function filterFunction(
  nameFilter: String,
  arrhythmiasFilter: Set<Patient.Arrhythmia>
): (p: Patient.Patient) => boolean {
  let nameFilterLower = nameFilter.toLowerCase();
  if (arrhythmiasFilter.size === 0) {
    return (p) => p.name.toLowerCase().includes(nameFilterLower);
  } else {
    return (p) =>
      p.name.toLowerCase().includes(nameFilterLower) &&
      intersect(p.arrhythmias, arrhythmiasFilter).size > 0;
  }
}

function intersect<T>(s1: Set<T>, s2: Set<T>): Set<T> {
  let res : Set<T> = new Set();
  for (let x of s1) {
    if (s2.has(x)) {
      res.add(x);
    }
  }
  return res;
}

export class ErrorPatients {
  status: 'error' = 'error';
  map(f: (p: Patient.Patient) => Patient.Patient): ErrorPatients {
    return new ErrorPatients();
  }
}

@Injectable({
  providedIn: 'root',
})
export class RemotePatientsService {
  constructor(private http: HttpClient) {}

  fetchPatients(): Observable<LoadedPatients | ErrorPatients> {
    return this.http
      .get('http://localhost:3000/cards')
      .pipe(map(patients_decode));
  }
}

function patients_decode(json: Object): LoadedPatients | ErrorPatients {
  if (!Array.isArray(json)) {
    return new ErrorPatients();
  }

  let patients: Array<Patient.Patient> = [];
  for (let i = 0; i < json.length; ++i) {
    let patientFromJson = json[i];
    let patient = Patient.decode(patientFromJson);
    if (patient === null) {
      return new ErrorPatients();
    }

    patients.push(patient);
  }
  return new LoadedPatients(patients);
}
