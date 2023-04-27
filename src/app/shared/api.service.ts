import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) { }


  // Create by Post
  PostStudentData(data: any) {
    return this._httpClient.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // Get Student Data
  GetStudentData() {
    return this._httpClient.get<any>("http://localhost:3000/posts")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // Update Student Data

  UpdateStudentData(data: any, id: number) {
    return this._httpClient.put("http://localhost:3000/posts/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // Delete Student Data
  DeleteStudentData(id: number) {
    return this._httpClient.delete<any>("http://localhost:3000/posts/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
