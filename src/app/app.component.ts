import { AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import { ApiService } from './api.service';
import {AddStudent, GetStudent} from './student';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('readOnlyTemplate',{static:false}) readOnlyTemplate!:TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate!: TemplateRef<any>;
  
  editedStudent:GetStudent =new GetStudent("","","",1);
  cStudent:AddStudent|undefined;
  students:Array<GetStudent>=[];
  isNewRecord:boolean=false;
  statusMessage:string="";

  title = 'StudentApp';
  constructor(private apiService:ApiService){
    this.students=new Array<GetStudent>();
  };
  students:GetStudent[]=[];
  ngAfterViewInit(): void {    
    this.loadStudents();
  }

  loadStudents(){
    this.apiService.getStudents().subscribe((data:GetStudent[])=>this.students=data);
  }

  loadTemplate(student:GetStudent){
    if(this.editedStudent && this.editedStudent.id==student.id){
      this.editTemplate.createEmbeddedView(this);
      return this.editTemplate;
    }
    else{
      this.readOnlyTemplate.createEmbeddedView(this)
      return this.readOnlyTemplate;
    }
  }

  addStudent(){
    this.editedStudent=new GetStudent("","","",1);
    this.students.push(this.editedStudent);
    this.isNewRecord=true;
  }

  editStudent(student:GetStudent){
    this.editedStudent=new GetStudent(student.id,student.firstName,student.lastName,student.age);
  }

  deleteStudent(id:String){
    this.apiService.deleteStudent(id).subscribe((data)=>{
      this.statusMessage="Student deleted successfully!";
      this.loadStudents();
    });
  }

  saveStudent(){
    if(this.isNewRecord){
      this.cStudent=new AddStudent(this.editedStudent.firstName,this.editedStudent.lastName,this.editedStudent.age)
      this.apiService.addStudent(this.cStudent).subscribe(data=>{
        this.statusMessage="Student created successfully!",
        this.loadStudents();
      });
      this.isNewRecord=false;
      this.editedStudent=new GetStudent("","","",1);
    }
    else{
      this.apiService.updateStudent(this.editedStudent).subscribe(data=>{
        this.statusMessage="Student has been updated successfully!";
        this.loadStudents();
      });
      this.editedStudent=new GetStudent("","","",1);
    }
  }
  
  cancel(){
    if(this.isNewRecord){
      this.students.pop();
      this.isNewRecord=false;
    }
    this.editedStudent=new GetStudent("","","",1);
  }
}
