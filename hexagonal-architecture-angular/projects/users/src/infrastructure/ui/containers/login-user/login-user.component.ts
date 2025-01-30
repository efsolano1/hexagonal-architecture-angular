import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthUserUsecase } from '../../../../application/users/auth-user.usecase';
import { Observable, of, switchMap, tap } from 'rxjs';
import { IAuthResponseDTO } from '../../../../domain/model/auth.response.model';
import { FormLoginComponent } from '../../forms/form-login/form-login.component';
import { IUserRequestDTO } from '../../../../domain/model/user.request.model';
import { HeaderComponent } from '../../components/header/header.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lib-login-user',
  imports: [AsyncPipe, FormLoginComponent, JsonPipe],
  templateUrl: './login-user.component.html',
})
export class LoginUserComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(AuthUserUsecase);
  public user$: Observable<IAuthResponseDTO>;
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createUser(): void {
    // this._useCase.execute(user);
    of(this._useCase.execute(this.loginForm.getRawValue()))
    .pipe(
      switchMap(()=>this.user$),
      tap(response=>{
        debugger
        if(response?.token){
          localStorage.setItem('email', this.getEmail);
          this.router.navigate(['app/dashboard']);
          return true;
        }else{
          return false;
        }
      })
    )
    .subscribe();
  }


  get getEmail(): string {
    return this.loginForm.value.email ?? '';
  }
}
