import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  isOrdered = false;
  historyData: any[] = [];

  constructor(
      private http: HttpClient,
      private toastr: ToastrService,
  ) { }

  ngOnInit(): void{
      const params = new HttpParams().set("email", sessionStorage.getItem("sub")!);

      this.http.get('http://127.0.0.1:9000/queries/getAllPredictionsByEmail', { observe: 'response', params }).subscribe(
          (response: HttpResponse<any>) => {
              if (response.status == 200){
                  console.log(response.body.data);
                  this.historyData = Object.values(response.body.data);
                  for(let data of this.historyData){
                      let dateArray = data.predicton_date.split(" ");
                      data.date = dateArray[0];
                      if (data.predicton == 0) {
                          data.result = "No hay presencia de ruido";
                      } else if (data.predicton == 1) {
                          data.result = "Hay presencia de ruido";
                      }
                  }
              }
          },
          error => {
              console.log(error.error.message);
          }
      );
  }

    sortColumn(column: string) {
        this.historyData.sort((a, b) => {
            if (a[column] > b[column]) {
                return this.isOrdered ? -1 : 1;
            } else if (a[column] < b[column]) {
                return this.isOrdered ? 1 : -1;
            } else {
                return 0;
            }
        });

        this.isOrdered = !this.isOrdered;
    }

  downloadCsv(){
      const params = new HttpParams().set("email", sessionStorage.getItem("sub")!);

      this.http.get('http://127.0.0.1:9000/queries/getAllResultsFileByEmail/', {
          responseType: 'blob',
          params
      }).subscribe(
          (blob) => {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'resonances_history.csv';

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
          },
          error => {
              console.log(error.error.message);
          }
      );
  }
}
