import * as Patient from './Patient';

export class GetPatients {
    static readonly type = "[Triage] Get patient from API";
}

export class StatusClicked {
    static readonly type = "[Triage] Status clicked";
    constructor(public patientId: Patient.PatientId, public status: Patient.Status){}
}

export class NameFilterUpdated {
    static readonly type = "[Triage] Name Filter Updated";
    constructor(public nameFilter: String){}
}

export class ArrhythmiaToogled {
    static readonly type = "[Triage] Arrhythmia toogled";
    constructor(public arrhythmia: Patient.Arrhythmia){}
}