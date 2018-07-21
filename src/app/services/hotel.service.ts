import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RESOURCES} from '../constants/resources';
import {Hotel} from "../models/hotel";
import {BaseService} from "../services/base.service";
import {UtilityService} from "../services/utility.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class HotelService {

    constructor(
        private _http: HttpClient,
        private _baseService: BaseService,
        private _utilityService: UtilityService) {
    }

    /**
    * Inovoca el servicio rest 
    * retorna un Json convertido a un Hotel[]
    */
    getListHotels(): Observable<Hotel[]> {
        return this._http.get<Hotel[]>(RESOURCES.url_data_json)
            .pipe(
            catchError(this._utilityService.handleError('getListHotels', []))
            );
    }

    createHotel(hotel: Hotel): Promise<any> {
        return this._baseService.create(hotel, 'hotel')
            .catch(this._utilityService.handleError('createHotel', hotel));
    }

    removeHotel(id: string): Promise<any> {
        return this._baseService.remove(id, 'hotel')
            .catch(this._utilityService.handleError('removeHotel', id));
    }

    editHotel(id: string, hotel: Hotel): Promise<any> {
        return this._baseService.edit(id, hotel, 'hotel')
            .catch(this._utilityService.handleError('editHotel', id));
    }

    findHotel(id: string): Promise<Hotel> {
        return this._baseService.findEntity(id, 'hotel')
            .catch(this._utilityService.handleError('findHotel', id));
    }

    findHotels(): Promise<any> {
        return this._baseService.findEntities('hotel')
            .catch(this._utilityService.handleError('findHotels', []));
    }

    truncateHotel(): Promise<null> {
        return this._baseService.truncate('hotel');
    }
}
