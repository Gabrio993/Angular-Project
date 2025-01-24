import { Component, Input } from '@angular/core';
import { Corso } from './corso.types';

@Component({
  selector: 'app-corso-dettagli',
  standalone: true,
  imports: [],
  templateUrl: './corso-dettagli.component.html',
  styleUrl: './corso-dettagli.component.css',
})
export class CorsoDettagliComponent {
  @Input() corso?: Corso | null; // Riceve i dettagli del corso da visualizzare
}
