import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dashboard.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObj : StudentModel = new StudentModel;
  studentData: any;
  public show:boolean = false;
  
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      class:['',[Validators.required]],
     
    })
    this.getAllStudents();
    
    }
    clickAddStudent(){
      this.formValue.reset();
     
  }
postStudentDetails(){
  this.show = false
  this.studentModelObj.firstName = this.formValue.value.firstName;
  this.studentModelObj.lastName = this.formValue.value.lastName;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.class = this.formValue.value.class;

  this.api.postStudents(this.studentModelObj).subscribe(res=>{
    console.log(res);
    alert("Student Record Added Successfully")
    let ref = document.getElementById("cancel")
    ref?.click()
    this.formValue.reset();
    this.getAllStudents();
  },
  err=>{
    alert('Something is wrong')
  })
}
getAllStudents(){
  this.api.getStudents().subscribe(res =>{
    this.studentData= res;
  })
}

deleteStudent(stu:any){
  console.log(stu)
  this.api.deleteStudent(stu.id).subscribe(res=>{
    alert('Student Record Deleted');
   
  })
  this.getAllStudents();
}
onEdit(stu:any){
 
  console.log(stu)
  this.studentModelObj.id = stu.id;
  this.formValue.controls['firstName'].setValue(stu.firstName);
  this.formValue.controls['lastName'].setValue(stu.lastName);
  this.formValue.controls['email'].setValue(stu.email);
  this.formValue.controls['class'].setValue(stu.class);

}
updateStudentDetails(){
  this.show= true
  this.studentModelObj.firstName = this.formValue.value.firstName;
  this.studentModelObj.lastName = this.formValue.value.lastName;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.class = this.formValue.value.class;

  this.api.updateStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
    alert('Record Updated')
    let ref = document.getElementById("cancel")
    ref?.click()
    this.formValue.reset();
    this.getAllStudents();
  })
}
}
