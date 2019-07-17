import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:8085/v1/post/';

  constructor(private http: HttpClient) { }

  searchBlogByText(text: string) {
    const accessToken = JSON.parse(JSON.stringify(window.sessionStorage.getItem('token'))).access_token;
    const tokenType = JSON.parse(JSON.stringify(window.sessionStorage.getItem('token'))).token_type;
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : tokenType + ' ' + accessToken
    });
    const options = {
      headers: httpHeaders
    };
    const body = {
      searched_text : text
    };
    return this.http.post(this.baseUrl + 'post_search_by_text', body, options);
  }

}
