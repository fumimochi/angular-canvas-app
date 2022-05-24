import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AppRoutes } from '../routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (
      state.url.startsWith(`/${AppRoutes.RouteEnum.PAINT}`) &&
      !window.localStorage.getItem('token')
    ) {
      this._router.navigate([AppRoutes.RouteEnum.AUTH]);
      return false;
    }
    if (
      state.url.startsWith(`/${AppRoutes.RouteEnum.AUTH}`) &&
      window.localStorage.getItem('token')
    ) {
      this._router.navigate([AppRoutes.RouteEnum.PAINT]);
      return false;
    }
    return true;
  }
}
