import { Entity } from './entity';

export class Player extends Entity {
    
    //spells :any[] ;

    constructor(id:number,name:string ,health:number,maxHelath:number){
        super(id,name ,health,maxHelath );
    }
}
