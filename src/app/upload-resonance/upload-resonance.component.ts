import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-resonance',
  templateUrl: './upload-resonance.component.html',
  styleUrls: ['./upload-resonance.component.css']
})
export class UploadResonanceComponent implements OnInit{
  analyticsForm: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    date: ['', [Validators.required]],
    file: ['', [Validators.required]]
  }, {updateOn: 'submit'});

  results = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

  onAnalyze(): any{
    this.results = true;
    console.log(this.analyticsForm.value);
  }

  onUploadImage({e}: { e: any }): any{
    console.log( e.target.files[0].name);
  }
}
