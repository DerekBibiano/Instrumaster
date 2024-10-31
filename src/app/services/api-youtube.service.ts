import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiYoutubeService {
  constructor( private http: HttpClient) { }

  getVideos(): Observable<any> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDa5e1SDhwBEdW94oEdd0gM2vAUnpYepfc&part=snippet&q=curso de guitarra en español&type=video&maxResults=5&order=rating';
    return this.http.get(url);
  }
}
