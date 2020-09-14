export type Patient = Patient$ & { _opaque: typeof Patient };
export type PatientId = number & { _opaque: typeof PatientId };

declare const Patient: unique symbol;
declare const PatientId: unique symbol;

type Patient$ = {
  id: PatientId;
  arrhythmias: Set<Arrhythmia>;
  name: string;
  status: Status;
  creationDate: Date;
};

export enum Status {
  Pending,
  Rejected,
  Done,
}

export enum Arrhythmia {
  AFib,
  AVBlock,
  Pause,
  PSVC,
  PVC,
}


function statusFromAPIString(s: string): Status | null {
  switch (s) {
    case 'PENDING':
      return Status.Pending;
    case 'REJECTED':
      return Status.Rejected;
    case 'DONE':
      return Status.Done;
    default:
      return null;
  }
}

function arrhythmiaFromAPIString(s: String): Arrhythmia | null {
    switch (s) {
        case "AFib":
            return Arrhythmia.AFib;
        case "AV Block":
            return Arrhythmia.AVBlock;
        case "Pause":
            return Arrhythmia.Pause;
        case "PSVC":
            return Arrhythmia.PSVC;
        case "PVC":
            return Arrhythmia.PVC;  
        default:
            return null;
    }
}

export function withStatus(patient: Patient, status: Status) : Patient {
    return {...patient, status: status} as Patient;
}

export function decode(json: any): Patient | null {
    let id = json.id;
    if(! (typeof id === 'number')) {
        return null;
    }
    let name = json.patient_name
    if(!(typeof name === 'string')) {
        return null;
    }


    // if created_at is not a field of json, new Date will return "Invalid Date"
    let creationDate = new Date(json.created_date);
    if(isNaN(creationDate.getTime())) {
        return null;
    }


    let status = statusFromAPIString(json.status || '');
    if(status === null) {
        return null;
    }
    

    let arrhythmias: Set<Arrhythmia> = new Set();
    if(!Array.isArray(json.arrhythmias)) {
        return null;
    }
    for(let arrhythmiaFromJson of json.arrhythmias) {
        let arrhythmia = arrhythmiaFromAPIString(arrhythmiaFromJson);
        if(arrhythmia === null) {
            return null;
        }
        arrhythmias.add(arrhythmia);
    }
    return { 
        id: id as PatientId,
        status,
        name,
        creationDate,
        arrhythmias,
    } as Patient;
}