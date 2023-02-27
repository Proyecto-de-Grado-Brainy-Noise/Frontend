import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  historyData = [
    {
      'fecha': '01/02/2023',
      'idPatient': '4',
      'resultado': 'Alto'
    },
    {
      'fecha': '01/02/2023',
      'idPatient': '1',
      'resultado': 'Medio'
    },
    {
      'fecha': '01/02/2023',
      'idPatient': '2',
      'resultado': 'Bajo'
    }
  ];

  displayedColumns = ['Fecha', 'ID Paciente', 'Resultado'];
}
