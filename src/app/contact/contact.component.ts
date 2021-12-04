import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  users : User[] = []
  form : FormGroup;
  firstName = ''
  lastName = ''
  email = ''
  password = ''
  birthdate = ''
  phone = ''
  role = ''
  message = ''

  constructor(private fb : FormBuilder , private userService : UserService) {
    this.form = fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      birthdate : ['', Validators.required],
      phone : ['', Validators.required],
      role : ['', Validators.required],





    })
  }

  ngOnInit(): void {
    this.getuser()
  }

getuser() {
  this.userService.getusers().subscribe(data => {
    this.users = data.map((e:any) => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      } as User;
      
    })
    console.log(this.users)
  });
}
save() {
    var user = new User()
    user.firstName = this.form.controls['firstName'].value
    user.lastName = this.form.controls['lastName'].value
    user.phone = this.form.controls['phone'].value
    user.email = this.form.controls['email'].value
    user.password = this.form.controls['password'].value
    user.birthdate = this.form.controls['birthdate'].value
    user.role = this.form.controls['role'].value
    if (user.firstName === '' || user.lastName === '' || user.lastName === '' || user.phone === '' || user.email === '' || user.password === '' || user.birthdate === '' || user.role === '' ) {
      this.message = 'error'
    }
    else {
      this.userService.createuser(user).then(res => this.getuser() )
    }

  }

filter() {
 if (this.role != '') {
   this.users = this.users.filter(u => u.role == this.role)
 }

 if (this.birthdate != '') {
  this.users = this.users.filter(u => u.birthdate == new Date(this.birthdate).toString())
}

}

reset() {
  this.getuser()
  this.birthdate = ''
  this.role = ''


}
}
