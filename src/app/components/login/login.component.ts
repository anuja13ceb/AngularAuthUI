import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
    private router:Router,
    private userStore:UserStoreService
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
      

      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          
          this.loginForm.reset();

          //for storing the token
          this.auth.storeToken(res.accessToken);
          const tokenPayload = this.auth.decodedToken();
          
       //we can do this way also
          //this.userStore.fullname.next(tokenPayload.unique_name);
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
         
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
