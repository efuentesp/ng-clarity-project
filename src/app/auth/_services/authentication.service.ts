import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { User } from "../_models/user";
import { Permission } from "../_models/permission";

@Injectable()
export class AuthenticationService {
  public user: User;
  public permissions: Permission[] = [];

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log("login() AuthenticationService");
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/login`,
        { email: email, password: password },
        { headers: headers }
      )
      .pipe(
        map(response => {
          if (response) {
            localStorage.setItem("currentUser", JSON.stringify(response));
          }
          return response;
        })
      );
  }

  getUser(token) {
    console.log("getUser() AuthenticationService");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + token + ""
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/profile`, { headers: headers })
      .pipe(
        map(response => {
          this.permissions = response.permissions;
          this.user = response.user;

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              user: this.user,
              token: token,
              permissions: this.permissions
            })
          );

          return true;
        })
      );
  }

  logout() {
    console.log("logout() AuthenticationService");
    localStorage.removeItem("currentUser");
  }
}
