import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent {
  public suchEmailExists: boolean = false;

  constructor(private readonly _authService: AuthService) {}

  public readonly form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  public submitRegistration() {
    this._authService.register(this.form.value).subscribe({
      next: () => {
        console.log('successful sign up');
      },
      error: (error: HttpErrorResponse) => {
        if (error.message === 'No such email registered') {
          console.log(error.message);
        } else {
          console.log('Some new error happened');
        }
        this.suchEmailExists = true;
      },
    });
  }
}
