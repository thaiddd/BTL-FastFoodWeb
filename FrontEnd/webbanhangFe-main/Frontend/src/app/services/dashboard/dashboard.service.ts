import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = "http://localhost:8081/api/dashboard"

  constructor(private httpClient: HttpClient) {
  }

  getCount(): Observable<any> {
    return this.httpClient.get(this.url + "/count")
  }

  reportOrderCount(year: any): Observable<any> {
    return this.httpClient.get(this.url + "/report-order-count/" + year)
  }

  dateTodayOrderCount(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/countDateToday/", data);
  }
}
