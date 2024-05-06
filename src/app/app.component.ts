import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild('myModal') model: ElementRef | undefined;//decorator gets ref.from my model
  studentObj: Student = new Student();//declares the property og studentObj
  studentList: Student[] = [];//declares the property initialized as a empty

  ngOnInit(): void {//does not return anything only for the purpose of initialising
    const localData = localStorage.getItem("studentP");//retives->checks->if present->parases->assign to studentList
    if(localData != null) {
      this.studentList = JSON.parse(localData)
    }
  }

  openModel() {
   //selects DOM element-> if present-> displays->block 
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {// initilizes->if notnull->sets->display->to none
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {//confirms->searches id->removes->delete
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('studentP', JSON.stringify(this.studentList));
    }
  }
  onEdit(item: Student) {
    this.studentObj =  item;
    this.openModel();
  }

  updateStud() {//finds->check record->proceds->updates
      const currentRecord =  this.studentList.find(m=> m.id === this.studentObj.id);
      if(currentRecord != undefined) {
        currentRecord.name = this.studentObj.name;
        currentRecord.address =  this.studentObj.address;
        currentRecord.mobileNo =  this.studentObj.mobileNo;
      };
      localStorage.setItem('studentP', JSON.stringify(this.studentList));
      this.closeModel()
  }
  saveStudent() {//data present->parse->sets id-.> updates component studentList with array->
    // sets->local storage->new-1->old-+1 
    debugger;
    const isLocalPresent = localStorage.getItem("studentP");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('studentP', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('studentP', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}
