import { Component, OnInit } from '@angular/core';
import { GetPatients } from './store/model.actions';
import { Store, Select } from '@ngxs/store';
import { Model, TriageState } from './store/model.state';

import { Observable } from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(TriageState.getModel) model: Observable<Model>;

  ngOnInit() {
    // Delay the data fetching to display the loading state :)
    setTimeout(() => this.store.dispatch(new GetPatients()), 3000);
  }
}
