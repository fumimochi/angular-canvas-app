import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss'],
})
export class PaintComponent {
  constructor(private readonly _authService: AuthService) {}

  public logOut() {
    this._authService.logOut();
  }
}
