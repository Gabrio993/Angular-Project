import { Component } from '@angular/core';
import { ListaCorsiComponent } from '../lista-corsi/lista-corsi.component';
import { CorsiService } from '../lista-corsi/corsi.service';
import { FormsModule } from '@angular/forms';
import { Corso, Prenotazione } from '../lista-corsi/corso-dettagli/corso.types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ListaCorsiComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  corsi: Corso[] = [];
  showForm: boolean = false; // Per gestire la visibilità del form
  prenotazioni: Prenotazione[] = [];
  flagMostraPrenotazioni: boolean = false;

  constructor(private corsiService: CorsiService) {}

  /**
   * Chiamato quando il componente viene inizializzato.
   * Richiama il metodo `caricaCorsi()` per caricare i corsi.
   */
  ngOnInit(): void {
    this.caricaCorsi();
  }

  /**
   * Carica i corsi utilizzando il servizio `corsiService`.
   * Utilizza l'operatore `fetchCorsi()` per ottenere la lista dei corsi.
   * Se l'operazione va a buon fine, assegna la lista dei corsi ricevuti alla
   * proprietà `corsi`.
   * Se l'operazione fallisce, stampa un messaggio di errore sulla console.
   */
  caricaCorsi(): void {
    this.corsiService.fetchCorsi('Errore nel caricamento dei dati').subscribe({
      next: (data) => (this.corsi = data),
      error: (err) => console.error('Errore nel caricamento dei corsi:', err),
    });
  }

  /**
   * Elimina il corso con l'id specificato.
   * Richiede conferma all'utente prima di procedere con l'eliminazione.
   * Se l'eliminazione va a buon fine, mostra un messaggio di successo e ricarica i corsi.
   * Se l'eliminazione fallisce, stampa un messaggio di errore sulla console.
   * @param corsoId id del corso da eliminare
   */
  eliminaCorso(corsoId: string): void {
    console.log('sto eliminando il corso con id:', corsoId);

    if (confirm('Sei sicuro di voler eliminare questo corso?')) {
      this.corsiService.deleteCorso(corsoId).subscribe({
        next: () => {
          alert('Corso eliminato con successo!');
          this.caricaCorsi(); // Ricarica i corsi aggiornati
        },
        error: (err) => {
          console.error("Errore durante l'eliminazione del corso:", err);
        },
      });
    }
  }

  /**
   * Alterna la visibilità del form per l'aggiunta di nuovi corsi.
   * Se il form è visibile, lo nasconde. Se il form è nascosto, lo mostra.
   */
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  /**
   * Aggiunge un nuovo corso utilizzando i dati forniti nel form.
   * Verifica la validità del form prima di procedere.
   * Se il form è valido, crea un nuovo oggetto Corso e lo aggiunge tramite il servizio CorsiService.
   * In caso di successo, mostra un messaggio di conferma, ricarica la lista dei corsi,
   * nasconde il form e resetta i campi del form.
   * Gestisce e logga eventuali errori durante il processo di aggiunta.
   *
   * @param form - Il form contenente i dati del nuovo corso da aggiungere.
   */
  aggiungiCorso(form: any): void {
    if (form.valid) {
      const nuovoCorso: Corso = {
        id: form.value.id,
        name: form.value.name,
        description: form.value.description,
        instructor: form.value.instructor,
        length: form.value.length,
        capacity: form.value.capacity,
      };

      // Controlla se l'ID è già presente
      this.corsiService
        .fetchCorsi('something wrong')
        .subscribe((corsi: Corso[]) => {
          const idEsistente = corsi.some((corso) => corso.id === nuovoCorso.id);

          if (idEsistente) {
            alert(
              `Errore: L'ID ${nuovoCorso.id} è già utilizzato da un altro corso.`
            );
          } else {
            // Aggiungi il nuovo corso solo se l'ID non esiste
            this.corsiService.addCorso(nuovoCorso).subscribe({
              next: () => {
                alert('Corso aggiunto con successo!');
                this.caricaCorsi(); // Ricarica la lista dei corsi
                this.showForm = false; // Nasconde il form
                form.reset(); // Resetta il form
              },
              error: (err) => console.error("Errore durante l'aggiunta:", err),
            });
          }
        });
    }
  }

  /**
   * Mostra o nasconde la lista delle prenotazioni.
   * Se le prenotazioni non sono state ancora caricate, le carica dal servizio CorsiService
   * e le salva nell'array prenotazioni. Se le prenotazioni sono già state caricate,
   * le nasconde e cancella l'array prenotazioni.
   */
  mostraPrenotazioni() {
    if (!this.flagMostraPrenotazioni) {
      this.corsiService.showBookings().subscribe({
        next: (data) => {
          this.prenotazioni = data; // Salva i dati ricevuti nell'array prenotazioni
          this.flagMostraPrenotazioni = true;
          console.log('Prenotazioni caricate:', this.prenotazioni); // Debug
        },
        error: (err) => {
          console.error('Errore nel caricamento delle prenotazioni:', err);
          alert('Impossibile caricare le prenotazioni. Riprova più tardi.');
        },
      });
    } else {
      this.flagMostraPrenotazioni = false;
      this.prenotazioni = [];
    }
  }
}
