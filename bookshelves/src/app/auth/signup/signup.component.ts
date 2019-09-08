import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
      confirm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const confirm = this.signUpForm.get('confirm').value;
    if (confirm === password) {
      this.authService.registration(email, password)
        .then(() => {
          this.router.navigate(['/books']);
        }, (error) => {
          this.errorMessage = error;
        });
    } else {
      this.errorMessage = "Error: Your password does not match";
    }

  }


  ngOnInit() {
    this.initForm();
  }

}
