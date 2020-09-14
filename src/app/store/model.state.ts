import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  GetPatients,
  StatusClicked,
  NameFilterUpdated,
  ArrhythmiaToogled,
} from '../store/model.actions';
import { Injectable } from '@angular/core';

import * as Patient from '../store/Patient';
import * as Remote from '../store/RemoteData';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Model {
  patients: Remote.Patients;
  nameFilter: String;
  arrhythmiasFilter: Set<Patient.Arrhythmia>;
}

@State<Model>({
  name: 'cardTriage',
  defaults: {
    patients: new Remote.LoadingPatients(),
    nameFilter: '',
    arrhythmiasFilter: new Set(),
  },
})
@Injectable()
export class TriageState {
  constructor(private patientsService: Remote.RemotePatientsService) {}

  @Selector()
  static getModel(model: Model) {
    return model;
  }

  @Action(GetPatients)
  getPatients(store: StateContext<Model>) {
    return this.patientsService
      .fetchPatients()
      .pipe(
        map((patients) => {
          console.debug(patients.status);
          if (patients.status == 'error') {
            console.debug('error during decoding');
          } else if (patients.status == 'loaded') {
            console.debug('a');
            console.debug(
              'loaded ',
              patients.patients.length,
              ' patients from API'
            );
          }
          return store.patchState({ patients: patients });
        })
      )
      .catch((err, _) => {
        console.debug('error during http request!');
        store.patchState({ patients: new Remote.ErrorPatients() });
        return Observable.empty();
      });
  }

  @Action(StatusClicked)
  statusClicked(store: StateContext<Model>, action: StatusClicked) {
    store.patchState({
      patients: store.getState().patients.map((p) => {
        if (p.id == action.patientId) {
          return Patient.withStatus(p, action.status);
        } else return p;
      }),
    });
  }

  @Action(NameFilterUpdated)
  nameFilterUpdated(store: StateContext<Model>, action: NameFilterUpdated) {
    store.patchState({ nameFilter: action.nameFilter });
  }

  @Action(ArrhythmiaToogled)
  arrhythmiaToogled(store: StateContext<Model>, action: ArrhythmiaToogled) {
      console.log("arryhtmia toogled", action);
    let arrhythmiasFilter = new Set([...store.getState().arrhythmiasFilter]);
    if (arrhythmiasFilter.has(action.arrhythmia)) {
      arrhythmiasFilter.delete(action.arrhythmia);
    } else {
      arrhythmiasFilter.add(action.arrhythmia);
    }
    store.patchState({ arrhythmiasFilter: arrhythmiasFilter });
  }
}
