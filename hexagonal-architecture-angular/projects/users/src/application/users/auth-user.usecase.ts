import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IAuthResponseDTO } from "../../domain/model/auth.response.model";
import { IUserRequestDTO } from "../../domain/model/user.request.model";
import { AuthenticateService } from "../../infrastructure/services/authenticate.service";

@Injectable({
    providedIn: 'root'
})
export class AuthUserUsecase {
    private readonly _service = inject(AuthenticateService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
  user$(): Observable<IAuthResponseDTO> {
    return this._state.users.user.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(user: IUserRequestDTO): void {
    this.subscriptions.add(
      this._service.login(user)
        .pipe(
          tap(result => {
            this._state.users.user.set(result);
            debugger

            // const users = this._state.users.user.snapshot();
            // this._state.users.user.set([...users, result])
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion

}