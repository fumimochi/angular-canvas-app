import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private _baseRoute = 'http://localhost:3000/users/';
  public userInfo = [];
  private id: number;

  constructor(private readonly _http: HttpClient) {
    this.getInfo().subscribe((e) => this.userInfo.push(e));
  }

  public readonly form = new FormGroup({
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  private getInfo() {
    this.id = JSON.parse(window.localStorage.getItem('token'))['id'];
    return this._http.get(`${this._baseRoute}/${this.id}`);
  }

  public saveInfo() {
    this.userInfo[0]['nickname'] = this.form.value['nickname'];
    this.userInfo[0]['email'] = this.form.value['email'];

    this._http
      .put(`${this._baseRoute}/${this.id}`, this.userInfo[0])
      .subscribe();
  }
}
