import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'angular-calendar';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import localeEs from '@angular/common/locales/es';
import {HashLocationStrategy, LocationStrategy, CommonModule, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PanelModule} from 'primeng/panel';
import {MenuModule} from 'primeng/menu';
import {InputMaskModule} from 'primeng/inputmask';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

import {AppComponent} from './app.component';
import {HotelsComponent} from './hotels/hotels.component';

registerLocaleData(localeEs);

const appRoutes: Routes = [
    {path: '', redirectTo: 'listHotels', pathMatch: 'full'},
    {path: 'listHotels', component: HotelsComponent},
    {path: '**', component: HotelsComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HotelsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        AccordionModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        PanelMenuModule,
        PanelModule,
        MenuModule,
        InputMaskModule,
        TableModule,
        DataViewModule,
        DialogModule,
        ButtonModule,
        NgbModalModule.forRoot(),
        CalendarModule.forRoot(),
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {}

