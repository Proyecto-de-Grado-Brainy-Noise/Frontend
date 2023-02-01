import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  requests: any = [
    {date: '12/03/2017', user: 'Alice', resonanceId: 'A000', result: 'Alto'},
    {date: '10/10/2020', user: 'John', resonanceId: 'A001', result: 'Bajo'},
    {date: '30/11/2021', user: 'Bob', resonanceId: 'A002', result: 'Medio'},
    {date: '07/08/2022', user: 'Tom', resonanceId: 'A003', result: 'Alto'},
  ];

  ngOnInit(): void {
    console.log(this.requests);
  }

}
