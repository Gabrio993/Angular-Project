import { Component, inject, OnInit } from '@angular/core';
import { CorsiService } from '../lista-corsi/corsi.service';
import { Corso } from '../lista-corsi/corso-dettagli/corso.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  corsi: Corso[] = [];
  private corsiService = inject(CorsiService);

  /**
   * Metodo chiamato al momento dell'inizializzazione del componente.
   * Utilizza il servizio `corsiService` per recuperare la lista dei corsi.
   * In caso di successo, assegna i primi 4 corsi al campo `corsi`.
   * In caso di errore, stampa un messaggio di errore sulla console.
   */
  ngOnInit(): void {
    this.corsiService
      .fetchCorsi('Errore durante il caricamento dei corsi')
      .subscribe({
        next: (data) => {
          // Mostra i primi 4 corsi
          this.corsi = data.slice(0, 4);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  /**
   * Prenota un corso. Se la capacità del corso è maggiore di 0,
   * effettua la prenotazione e decrementa localmente la capacità.
   * Se la capacità è già stata raggiunta, mostra un messaggio di errore.
   * @param corso Corso da prenotare
   */
  prenotaCorso(corso: Corso): void {
    if (corso.capacity > 0) {
      this.corsiService
        .bookCourse(corso.id, corso.name, corso.capacity)
        .subscribe({
          next: () => {
            alert('Prenotazione effettuata con successo!');
            // Decrementa la capacità localmente
            corso.capacity--;
          },
          error: (err) => {
            console.error('Errore durante la prenotazione:', err);
            alert('Non è stato possibile effettuare la prenotazione.');
          },
        });
    } else {
      alert('Capacità massima raggiunta, non è possibile prenotare.');
    }
  }
}
