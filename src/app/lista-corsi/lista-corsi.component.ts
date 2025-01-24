import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CorsiService } from './corsi.service';
import { CorsoDettagliComponent } from './corso-dettagli/corso-dettagli.component';
import { Corso } from './corso-dettagli/corso.types';

@Component({
  selector: 'app-lista-corsi',
  standalone: true,
  imports: [CorsoDettagliComponent],
  templateUrl: './lista-corsi.component.html',
  styleUrl: './lista-corsi.component.css',
})
export class ListaCorsiComponent {
  corsi: Corso[] = [];
  corsoSelezionato?: Corso | null; // Corso selezionato per i dettagli
  @Input() showDeleteButton: boolean = false; // Controlla la visualizzazione del pulsante Elimina
  @Output() elimina = new EventEmitter<string>(); // Emette l'ID del corso da eliminare

  constructor(private corsiService: CorsiService) {}

  /**
   * Esegue la fetch dei corsi all'avvio del componente.
   * Se la fetch va a buon fine, assegna la lista dei corsi ricevuti
   * alla proprietà  `corsi`.
   * Se la fetch fallisce, stampa un messaggio di errore sulla console.
   */
  ngOnInit(): void {
    this.corsiService
      .fetchCorsi('Errore durante il caricamento dei corsi')
      .subscribe({
        next: (data) => {
          this.corsi = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  /**
   * Mostra o nasconde i dettagli di un corso.
   * Se il corso selezionato è già aperto, chiude i dettagli.
   * Altrimenti, apre i dettagli del corso selezionato.
   * @param corso Corso da selezionare
   */
  mostraDettagli(corso: Corso): void {
    if (this.corsoSelezionato?.id === corso.id) {
      // Se il corso selezionato è già aperto, chiudi i dettagli
      this.corsoSelezionato = null;
    } else {
      // Altrimenti, apri i dettagli del corso selezionato
      this.corsoSelezionato = corso;
    }
  }

  /**
   * Prenota un corso.
   * Effettua una richiesta POST all'endpoint '/bookings' con il corpo della richiesta contenente l'id del corso da prenotare.
   * Se l'operazione va a buon fine, riduce la capacità del corso di 1.
   * @param corso Corso da prenotare
   */
  prenotaCorso(corso: Corso): void {
    if (corso.capacity > 0) {
      this.corsiService
        .bookCourse(corso.id, corso.name, corso.capacity)
        .subscribe({
          next: () => {
            alert('Prenotazione effettuata con successo!');
            // Riduci la capacità del corso dopo la prenotazione
            corso.capacity--;
          },
          error: (err) => {
            console.error('Errore durante la prenotazione:', err);
            alert('Errore durante la prenotazione. Riprova più tardi.');
          },
        });
    } else {
      alert('Il corso è al completo.');
    }
  }
  /**
   * Emette un evento di eliminazione per il corso specificato dall'ID.
   * Utilizza l'EventEmitter 'elimina' per notificare il genitore che
   * un corso con l'ID fornito deve essere eliminato.
   * @param corsoId L'ID del corso da eliminare.
   */

  onElimina(corsoId: string) {
    this.elimina.emit(corsoId); // Emette l'evento di eliminazione
  }
}
