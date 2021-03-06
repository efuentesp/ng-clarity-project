import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    console.log("OnInit() LoginComponent");
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log("onSubmit() LoginComponent");
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Inavlid Login form!");
      return;
    }

    this.isLoading = true;

    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('this.router.navigate(["admin"])', data);
          //this.router.navigate(["admin"]);
        },
        error => {
          alert("No responde el servidor.");
          //this.alertService.error(error);
        }
      );
  }
}
