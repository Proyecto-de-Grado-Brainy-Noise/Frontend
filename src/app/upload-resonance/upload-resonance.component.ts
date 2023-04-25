import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-upload-resonance',
  templateUrl: './upload-resonance.component.html',
  styleUrls: ['./upload-resonance.component.css']
})
export class UploadResonanceComponent implements OnInit{

  email:string = sessionStorage.getItem("sub")!;
  imageFile:any;
  metadataFile:any;
  prediction:string = "";
  task_id:string = "";

  results = false;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private toastr: ToastrService,
      private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
  }

  delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  onAnalyze(): any{
    let formData = new FormData();
    formData.set("resonance_file", this.imageFile);
    formData.set("metadata", this.metadataFile);
    formData.set("email", sessionStorage.getItem("sub")!);

    if(this.imageFile != null && this.metadataFile != null) {
        this.ngxService.start();
        this.http.post('http://127.0.0.1:9000/model/makePrediction/', formData, {observe: 'response'}).subscribe(
            async (response: HttpResponse<any>) => {
                if (response.status == 200) {
                    this.task_id = response.body.task_id;
                    const params = new HttpParams().set('task_id', response.body.task_id);
                    await this.delay(20000);
                    this.http.get('http://127.0.0.1:9000/queries/getCurrentResultPrediction/', {
                        observe: 'response',
                        params
                    }).subscribe(
                        (response2: HttpResponse<any>) => {
                            if (response2.status == 200) {
                                this.ngxService.stop();
                                this.results = true;
                                if (response2.body.data[0].predicton == 0) {
                                    this.prediction = "No tiene";
                                } else if (response2.body.data[0].predicton == 1) {
                                    this.prediction = "Medio";
                                } else {
                                    this.prediction = "Alto";
                                }
                            }
                        },
                        error => {
                            console.log(error.error.message);
                        }
                    );
                } else {
                    this.ngxService.stop();
                    this.toastr.error(response.body.message);
                }
            },
            error => {
                this.ngxService.stop();
                this.toastr.error(error.error.message);
            }
        );
    } else {
        this.toastr.error("Por favor cargue ambos archivos");
    }
  }

  onUploadImage({e}: { e: any }): any{
    this.imageFile = e.target.files[0];
  }

  onUploadMetadata({e}: { e: any }): any{
    this.metadataFile = e.target.files[0];
  }

  onCsv(){
      const params = new HttpParams().set('task_id', this.task_id);

      this.http.get('http://127.0.0.1:9000/queries/getCurrentResultPredictionFile/', {
          responseType: 'blob',
          params
      }).subscribe(
          (blob) => {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'metadata.csv';

              // Simulate a click on the link to download the file
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
