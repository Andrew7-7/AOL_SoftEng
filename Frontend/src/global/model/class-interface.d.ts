export interface IClass {
  id: string;
  classId: number;
  course: Map;
  student: Array;
  tutorEmail: string;
  totalDone: number;
  totalSession: number;
  sessions: Array;
}
