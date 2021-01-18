import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GetStudent} from './student';
import {AddStudent} from './student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string="http://localhost:8080/students/";
  constructor(private http:HttpClient) { }
  getStudents(){
    console.log("GetStudents:"+this.baseUrl);
    return this.http.get<GetStudent[]>(this.baseUrl);
  }
  addStudent(student:AddStudent){
    const headers = {'content-type':'application/json'}
    const body = JSON.stringify(student)
    console.log("AddStudent:"+student)
    return this.http.post(this.baseUrl,body ,{'headers':headers,'responseType':'text'});
  }
  updateStudent(student:GetStudent){
    const headers={'content-type':'application/json'}
    const body = JSON.stringify(student)
    console.log("UpdateStudent:"+body)
    return this.http.put(this.baseUrl+student.id,body, {'headers':headers,'responseType':'text'});
  }
  deleteStudent(id:String){
    return this.http.delete(this.baseUrl+id);
  }
  deleteAllStudents(){
    return this.http.delete(this.baseUrl);
  }

}
