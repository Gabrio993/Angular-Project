export interface Corso {
  id: string;
  name: string;
  description: string;
  instructor: string;
  length: number;
  capacity: number;
}
export interface Prenotazione {
  courseId: string;
  name: string;
  capacity: number;
}
