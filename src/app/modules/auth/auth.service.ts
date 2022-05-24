import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, tap, throwError } from 'rxjs';
import { AppRoutes, UserModels } from 'src/app/core/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _baseRoute = 'http://localhost:3000/users';
  private readonly _key = 'token';

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  public logIn(dto: UserModels.User.IUser): Observable<unknown> {
    return this.getUser(dto).pipe(
      tap((user: UserModels.User.IUser) => {
        this.onSuccessAuth(user);
      })
    );
  }

  public logOut() {
    this._router.navigateByUrl(AppRoutes.RouteEnum.AUTH);
    window.localStorage.removeItem(this._key);
  }

  public register(formValue) {
    return this.getRegistration().pipe(
      map((info) => ({
        check: info.find((user) => user.email === formValue['email']),
        info,
      })),
      switchMap(({ check, info }) => {
        if (check) {
          return throwError(
            () => new Error('Such email is not able for registration')
          );
        }

        return this.checkUserExists({
          ...formValue,
          canvas: [],
          id: ++info[info.length - 1].id,
        });
      })
    );
  }

  public putUser(id: number, user: UserModels.User.IUser) {
    return this._http.patch(`${this._baseRoute}/${id}`, user);
  }

  private getUser(
    dto: Partial<UserModels.User.IUser>
  ): Observable<UserModels.User.IUser> {
    let params = new HttpParams();

    for (const key in dto) {
      params = params.append(key, dto[key]);
    }

    return this._http
      .get<UserModels.User.IUser[]>(this._baseRoute, { params })
      .pipe(
        map((users: UserModels.User.IUser[]) => {
          if (users?.length) {
            return users[0];
          }

          throw new Error('404 => User not Found');
        })
      );
  }

  private checkUserExists(dto: UserModels.User.IUser) {
    return this._http.get<UserModels.User.IUser[]>(this._baseRoute).pipe(
      map(() => {
        this.createUser(dto).subscribe();
        this.onSuccessAuth(dto);
      })
    );
  }

  private createUser(dto) {
    return this._http
      .post(this._baseRoute, dto)
      .pipe(map((response) => JSON.stringify(response)));
  }

  private onSuccessAuth(user: UserModels.User.IUser) {
    const token = JSON.stringify(user);
    window.localStorage.setItem(this._key, token);
    this._router.navigateByUrl(AppRoutes.RouteEnum.PAINT);
  }

  private getRegistration() {
    return this._http.get<UserModels.User.IUser[]>(this._baseRoute);
  }
}
