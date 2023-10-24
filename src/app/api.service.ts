import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://localhost:5007/';
  // public apiUrl = 'https://tirtapakuan.co.id/dev/survey/';

  public nik: string = '';


  constructor(private http: HttpClient) { }
}
