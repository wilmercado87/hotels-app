import {Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class UtilityService {

    constructor(private _router: Router, private route: ActivatedRoute) {}

    public requestParameterValue(param: string): any {
        let value: any;
        let sub = this.route.queryParams.subscribe(params => {
            value = params[param];
        });

        return {"value": value, "sub": sub};
    }

    public navigate(path: string, queryParam: any) {
        this._router.navigate([path], queryParam);
    }
    
    public navigatePathFromPrincipal(nav_principal:string, path: string) {
        this._router.navigate([nav_principal, {outlets: {'routerPrincipal': [path]}}]);
    }

    public navigatePath(path: string) {
        this._router.navigate([path]);
    }

    public handleErrorObservable<T>(result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return throwError(result as T);
        };
    }
    
    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error + ", operation" + operation);
            return of(result as T);
        };
    }

    public generateArray(obj: any) {
        return Object.keys(obj).map((key) => {return obj[key]});
    }
}
