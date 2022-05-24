import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserModels } from 'src/app/core/routes';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public authIsFailed: boolean = false;
  public isLoading: boolean;

  constructor(private readonly _authService: AuthService) {}

  public readonly form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  public canLogIn(): boolean {
    return this.form.valid && !this.isLoading;
  }

  private get _dto(): UserModels.User.IUser {
    return this.form.value;
  }

  public logIn() {
    this.isLoading = true;

    this._authService
      .logIn(this._dto)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          console.log('SUCCESSFUL LOGGED IN!');
        },
        error: (error: HttpErrorResponse) => {
          this.authIsFailed = true;
        },
      });
  }
}
