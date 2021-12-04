import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users : User[] = []
  form : FormGroup;
  message = '';
  constructor(private fb : FormBuilder , private userService : UserService, private router : Router) {
  this.form = fb.group({
    email : ['', Validators.required],
    password : ['', Validators.required]
  })
}

  ngOnInit(): void {
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


  login() {
    var user = this.users.filter(u => u.email == this.form.controls['email'].value && u.password == this.form.controls['password'].value) 
    if (user.length > 0) {
      if (user[0].role != 'admin') {
        this.message = 'error'
      }
      else {
        this.router.navigateByUrl('/contact')
      }
    }
  }
}
