import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "Password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private auth: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    console.log(!this.isText);
    this.isText == true ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText == true ? this.type = "text" : this.type = "Password";
  }
  onSubmit() {

    if (this.loginForm.valid) {
      console.log("form is valid");
      console.log(this.loginForm.value);

      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
         
          this.router.navigate(['dashboard']);
          
        },
        error: (err) => {
         
          alert(err?.error.message)
        }

      });
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }



  }
}
