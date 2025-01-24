import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Corso, Prenotazione } from './corso-dettagli/corso.types';

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  private httpClient = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080';

  /**
   * Recupera l'elenco dei corsi dal server.
   * Effettua una richiesta GET all'endpoint '/courses'.
   * Se l'operazione ha successo, restituisce un array di oggetti 'Corso'.
   * Se si verifica un errore, registra l'errore nella console e genera un errore con il messaggio fornito.
   * @param errorMessage Stringa contenente il messaggio di errore personalizzato da utilizzare in caso di fallimento.
   * @returns Un Observable di un array di oggetti 'Corso'.
   */
  fetchCorsi(errorMessage: string) {
    return this.httpClient.get<Corso[]>(`${this.BASE_URL}/courses`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => {
          new Error(errorMessage);
        });
      })
    );
  }
  /**
   * Prenota un corso.
   * Effettua una richiesta POST all'endpoint '/bookings' con il corpo della richiesta contenente l'id, il nome
   * e la capacità del corso da prenotare.
   * Se l'operazione va a buon fine, restituisce un Observable che emette un oggetto vuoto.
   * @param courseId Stringa contenente l'id del corso da prenotare.
   * @returns Un Observable che emette un oggetto vuoto.
   */
  bookCourse(courseId: string, name: string, capacity: number) {
    return this.httpClient.post(`${this.BASE_URL}/bookings`, {
      courseId,
      name,
      capacity,
    });
  }

  /**
   * Recupera l'elenco delle prenotazioni dal server.
   * Effettua una richiesta GET all'endpoint '/bookings'.
   * @returns Un Observable di un array di oggetti 'Prenotazione'.
   */
  showBookings() {
    return this.httpClient.get<Prenotazione[]>(`${this.BASE_URL}/bookings`);
  }

  /**
   * Aggiunge un nuovo corso.
   * Effettua una richiesta POST all'endpoint '/courses' con il corpo della richiesta contenente l'oggetto 'Corso' da aggiungere.
   * Se l'operazione va a buon fine, restituisce un Observable che emette l'oggetto 'Corso' appena creato.
   * @param corso Oggetto 'Corso' da aggiungere.
   * @returns Un Observable che emette l'oggetto 'Corso' appena creato.
   */
  addCorso(corso: Corso) {
    return this.httpClient.post(`${this.BASE_URL}/courses`, corso);
  }

  /**
   * Elimina un corso.
   * Effettua una richiesta DELETE all'endpoint '/courses/:id' con l'id del corso da eliminare.
   * Se l'operazione va a buon fine, restituisce un Observable che emette un oggetto vuoto.
   * @param id Stringa contenente l'id del corso da eliminare.
   * @returns Un Observable che emette un oggetto vuoto.
   */
  deleteCorso(id: string) {
    return this.httpClient.delete(`${this.BASE_URL}/courses/${id}`);
  }
}
