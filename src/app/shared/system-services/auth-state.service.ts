import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { IAuthModel, INIT_AUTH_MODEL } from "src/app/models/auth-model";
import { StorageKeys } from "../constants/storage-key";

@Injectable({
    providedIn: 'root'
  })
  export class AuthStateService {
    protected subject: BehaviorSubject<IAuthModel>;
    protected authData: IAuthModel;

    // TODO add a select method to this class that allows selection of a copy of the model
    constructor()
    {
      let localAuthData = localStorage.getItem(StorageKeys.USER);
      if (localAuthData) {
        this.authData = JSON.parse(localAuthData);
      } else {
        this.authData = JSON.parse(JSON.stringify(INIT_AUTH_MODEL));
      }
      this.subject = new BehaviorSubject<IAuthModel>(this.authData);
    }

    public subscribe(callback: (model: IAuthModel) => void): Subscription {
      return this.subject.subscribe(callback);
    }

    public dispatch(payload: any | null): void {
      const data: Partial<IAuthModel> = payload as Partial<IAuthModel>;
      this.authData = {...this.authData, ...data};

      const dispatchedModel: IAuthModel = JSON.parse(JSON.stringify(this.authData));

      this.subject.next(dispatchedModel);
    }
  }