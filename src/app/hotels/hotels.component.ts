import {Component, OnInit} from '@angular/core';
import {HotelService} from '../services/hotel.service';
import {Hotel} from "../models/hotel";
import {Message} from 'primeng/components/common/api';
import {SelectItem} from 'primeng/api';
import {UtilityService} from "../services/utility.service";

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: ['./hotels.component.css'],
    providers: [HotelService, UtilityService]
})
export class HotelsComponent implements OnInit {
    private hotels: Hotel[];
    private newHotel: Hotel = new Hotel();
    private hotel: Hotel;
    private msgs: Message[] = [];
    private selectedHotel: Hotel;
    private displayDialog: boolean;
    private sortOptions: SelectItem[];
    private sortKey: string;
    private sortField: string;
    private sortOrder: number;

    constructor(
        private _hotelService: HotelService) {}

    ngOnInit() {
        this.listHotels();
        this.sortOptions = [
            {label: 'More Start', value: '!stars'},
            {label: 'Less Start', value: 'stars'},
            {label: 'Name', value: 'name'},
            {label: 'Default', value: 'default'}
        ];
    }

    onSortChange(event: any) {
        let value = event.value;
        console.log("value" + value);
        if (value == 'default') {
            this.listHotels();
            return;
        }

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }

        console.log("this.sortField" + this.sortField);
    }

    selectHotel(event: Event, hotel: Hotel) {
        this.selectedHotel = hotel;
        this.displayDialog = true;
        event.preventDefault();
    }

    onDialogHide() {
        this.selectedHotel = null;
    }

    listHotels() {
        this._hotelService.getListHotels().
            subscribe(data => {
                this.hotels = data;
            });
    }

    createHotel(hotel: Hotel) {
        this.msgs = [];
        this._hotelService.createHotel(hotel)
            .then(rowsAdded => {
                if (rowsAdded > 0) {
                    this.hotels.push(hotel);
                    this.newHotel = new Hotel();
                    this.msgs.push({severity: 'info', summary: "", detail: 'Successfully added'});
                }
            });

    }

    removeHotel(id: string) {
        this.msgs = [];
        this._hotelService.removeHotel(id).
            then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    const index = this.hotels.findIndex(hotel => hotel.id === id);
                    this.hotels.splice(index, 1);
                    this.msgs.push({severity: 'info', summary: "", detail: 'Successfully deleted'});
                }
            });
    }

    findHotel(id: string) {
        this._hotelService.findHotel(id).
            then(data => {
                this.hotel = data;
            });
    }

    editHotel(hotelUpdate: Hotel) {
        this.msgs = [];
        this._hotelService.editHotel(hotelUpdate.id, hotelUpdate).
            then(rowsUpdated => {
                if (rowsUpdated > 0) {
                    const index = this.hotels.findIndex(student => student.id === hotelUpdate.id);
                    this.hotels[index] = hotelUpdate;
                    this.newHotel = new Hotel();
                    this.msgs.push({severity: 'info', summary: "", detail: 'Successfully updated'});
                }
            });
    }

}
