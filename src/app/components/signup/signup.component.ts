import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "Password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    console.log(!this.isText);
    this.isText == true ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText == true ? this.type = "text" : this.type = "Password";
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log("form is valid");
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);

        },
        error: (res) => {
          console.log(res.message);
        }
      });
    }
    else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }

}
