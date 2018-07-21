export interface Ibase {
    
    create(addObject:Object,table:string):Promise<any>;
    
    edit(id: any, updateObject: Object, table:string):Promise<any>;
    
    findEntity(id:any, table:string): Promise<any>;
    
    findEntities(table:string): Promise<any>;
    
    remove(id:any, table:string): Promise<any>;
    
    truncate(table:string):Promise<null>;
    
    
}
