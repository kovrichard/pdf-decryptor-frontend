import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backendUrl = environment.backendUrl;
  year = new Date().getFullYear();
  form: FormGroup;
  file: File;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  decrypt() {
    if (!this.form.valid) return;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('password', this.form.get('password')?.value);

    this.httpClient
      .post(`${this.backendUrl}/decrypt/`, formData, { responseType: 'text' })
      .subscribe((r: any) => {
        const blob = new Blob([r], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }
}
