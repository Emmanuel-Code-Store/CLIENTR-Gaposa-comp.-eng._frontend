export interface Session {
  uuid: string;
  name: string;
}

export interface SemesterTerm {
  uuid: string;
  name: string;
}

export interface LocalSubject {
  uuid: string;
  name: string;
  code: string;
}

export interface ClassArm {
  uuid: string;
  name: string;
}

export interface Allocation {
  id: string;
  session_uuid: string;
  semester_term_uuid: string;
  subject_uuid: string;
  classarm_uuid: string;
  class_subject_description?: string;
  createdAt: string;
  session_name?: string;
  term_name?: string;
  subject_name?: string;
  subject_code?: string;
  class_arm_name?: string;
}

// Subject type from backend
export interface Subject {
  id?: string;
  uuid?: string;
  name?: string;
  code?: string;
}

// Response from registerClassSubject API
export interface ClassSubjectResponse {
  id?: string;
  class_subject_id?: string;
  classSubject?: {
    id?: string;
    class_subject_id?: string;
  };
}


export interface ClassArmApi {
  id?: string;
  uuid?: string;
  name?: string;
}