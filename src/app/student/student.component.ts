import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studentModelData } from './studentModelData';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  allStudentData: any;

  formValue !: FormGroup;
  studentModelObj: studentModelData = new studentModelData;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      place: ['', Validators.required],

    })
    this.getStudent()

  }

  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  edit(student: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.studentModelObj.id = student.id;

    this.formValue.controls['name'].setValue(student.name)
    this.formValue.controls['email'].setValue(student.email)
    this.formValue.controls['phone'].setValue(student.phone)
    this.formValue.controls['place'].setValue(student.place)
  }
  update() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.phone = this.formValue.value.phone;
    this.studentModelObj.place = this.formValue.value.place;

    this.api.UpdateStudentData(this.studentModelObj, this.studentModelObj.id).subscribe(res => {
      this.formValue.reset()
      this.getStudent()
      alert("Record updated sucessfully..");
    },
      err => {
        alert("Something went wrong..!")
      })

  }

  addStudent() {
    console.log(this.formValue);
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.phone = this.formValue.value.phone;
    this.studentModelObj.place = this.formValue.value.place;

    this.api.PostStudentData(this.studentModelObj).subscribe(res => {
      console.log(res)
      this.formValue.reset()
      this.getStudent()
      alert("Record has been saved successfully");
    },
      err => { alert("Soemthing went wrong..!!") }
    )
  };

  // Get Student
  getStudent() {
    this.api.GetStudentData().subscribe(res => {
      this.allStudentData = res;
    })

  }

  // Delete the student data
  deleteStudent(data: any) {
    if (confirm('Are you sure to delete this student'))
      this.api.DeleteStudentData(data.id).subscribe(res => {
        this.getStudent();
      })
  }

}
