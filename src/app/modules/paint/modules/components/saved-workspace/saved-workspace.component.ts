import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-saved-workspace',
  templateUrl: './saved-workspace.component.html',
  styleUrls: ['./saved-workspace.component.scss'],
})
export class SavedWorkspaceComponent {
  private _baseRoute = 'http://localhost:3000/users/';
  public userInfo = [];
  private id: number;

  constructor(private readonly _http: HttpClient) {
    this.getInfo().subscribe((e) => this.userInfo.push(e['canvas']));
  }

  private getInfo() {
    this.id = JSON.parse(window.localStorage.getItem('token'))['id'];
    return this._http.get(`${this._baseRoute}/${this.id}`);
  }
}
