import {Injectable} from '@angular/core';
import * as JsStore from 'jsstore';
import {IDataBase, DATA_TYPE, ITable} from 'jsstore';
import * as workerPath from 'file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js';
import {Ibase} from "../dao/ibase";

@Injectable({
    providedIn: 'root'
})
export class BaseService implements Ibase {

    static idbCon = new JsStore.Instance(new Worker(workerPath));
    private dbName = 'hotels_db';

    constructor() {
        this.connection.setLogStatus(true);
        this.initJsStore();
    }

    initJsStore() {
        this.connection.isDbExist(this.dbName).then(isExist => {
            if (isExist) {
                this.connection.openDb(this.dbName);
            } else {
                const dataBase = this.getDatabase();
                this.connection.createDb(dataBase);
            }
        }).catch(err => {
            alert(err.message);
        });
    }

    get connection() {
        return BaseService.idbCon;
    }

    private getDatabase() {
        const TblHoltel: ITable = {
            name: 'hotel',
            columns: [{
                name: 'id',
                primaryKey: true,
                autoIncrement: true
            },
            {
                name: 'name',
                notNull: true,
                dataType: DATA_TYPE.String
            },
            {
                name: 'stars',
                notNull: true,
                dataType: DATA_TYPE.Number,
            },
            {
                name: 'price',
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            {
                name: 'image',
                notNull: true,
                dataType: DATA_TYPE.String
            },
            {
                name: 'amenities',
                notNull: true,
                dataType: DATA_TYPE.Array
            }
            ]
        };
        const dataBase: IDataBase = {
            name: this.dbName,
            tables: [TblHoltel]
        };
        return dataBase;
    }

    create(addObject: Object, table: string): Promise<any> {
        return this.connection.insert<Object>({
            into: table,
            values: [addObject]
        });
    }

    edit(id: any, updateObject: Object, table: string): Promise<any> {
        return this.connection.update({
            in: table,
            where: {
                Id: id
            },
            set: updateObject
        });
    }

    findEntity(id: any, table: string): Promise<any> {
        return this.connection.select<Object>({
            from: table,
            where: {
                id: id
            }
        });
    }

    findEntities(table: string): Promise<any> {
        return this.connection.select<Object>({
            from: table
        });
    }

    remove(id: any, table: string): Promise<any> {
        return this.connection.remove({
            from: table,
            where: {
                id: id
            }
        });
    }

    truncate(table: string): Promise<null> {
        return this.connection.clear(table);
    }
}
