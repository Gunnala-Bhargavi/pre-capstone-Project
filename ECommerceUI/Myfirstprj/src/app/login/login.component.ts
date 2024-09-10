import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  /*login() {
    this.navigationService
      .loginUser(this.Email.value, this.PWD.value)
      .subscribe((res: any) => {
        localStorage.setItem("loggedInUser",res)
        alert("loggedin successful")
        if (true) {
          this.message = 'Logged In Successfully.';

          
        } else {
          this.message = 'Invalid Credentials!';
        }
      });
      alert("login successful");
  }*/

      login() {
        this.navigationService
          .loginUser(this.Email.value, this.PWD.value)
          .subscribe((res: any) => {
            if (res) {
              localStorage.setItem("loggedInUser", JSON.stringify(res));
              let user=this.navigationService.getLoggedInUser()
              alert("Login successful"+user.userId);
              this.message = 'Logged In Successfully.';
            } else {
              this.message = 'Invalid Credentials!';
              alert("Login failed. Invalid credentials.");
            }
          }, (error) => {
            console.error('Login error', error);
            this.message = 'Login failed. Please try again.';
          });
      }
      

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
