# Angular Fitness

## Descrizione Del Progetto

Questo progetto ha come obiettivo la visualizzazione dei corsi di una palestra con possibilita  
da parte dell'utente (già loggato) di prenotare un corso fino ad esaurimento posti.  
**Per testare il controllo dell'esaurimento posti, diminuire il valore di "capacity" nel db.json del relativo corso.**

L'utente amministratore invece, nella sua sezione potrà anche decidere se aggiungere o eliminare un corso attraverso  
la compilazione di un form e potà accedere a tutte le prenotazioni dei corsi attuali.

### Principali componenti:

- HomeComponent
- ListaCorsi
- CorsoDettagli
- Admin

Come da richieste progettuali, è stato implementato un service corsi.service.ts che si occupa di gestire la logica  
di tutte le chiamata API (GET, POST, DELETE), in questo caso specifico.

I dati principali del progetto sono stati descritti e tipizzati nell'intrafaccia **Corso** e nell'interfaccia **Prenotazione**  
all'interno del file corso.types.d.ts  
per garantire che i dati ricevuti siano consistenti e facilmente prevedibili.

**Per visualizzare gli aggiornamnti su eventuali prenotazioni/eliminazioni, bisogna ricaricare la pagina**

Per la simulazione del Backend è stato utilizzato il pacchetto json-server.  
Di seguito gli endpoint:

- [Lista Corsi](http://localhost:8080/courses)
- [Lista Prenotazioni](http://localhost:8080/bookings)

Assicurarsi prima di accedere agli endpoint di entrare nella cartella /mock-backend/ e lanciare il comando:

```bash
json-server --watch db.json --port 8080
```

Se si decide di cambiare la porta su cui ascolta JSON server, bisognerà cabiare il valore della  
variabile **BASE_URL** all'interno del **corsi.service.ts**

Per la **documentazione completa** del progetto, aprire il terminale dalla root del progetto, e lanciare il comando:

```bash
npx compodoc -s
```

Verra aperto un server che mostrerà la documentazione presa dalla cartella /documentation/.  
Fare ctrl + click sull'url mostrato, generalmente http://127.0.0.1:8080
