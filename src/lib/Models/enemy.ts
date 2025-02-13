import { Entity } from './entity';

export class Enemy extends Entity {
    type: string;
    constructor(id:number,name:string ,health:number,maxHelath:number, type:string){
        super(id,name ,health,maxHelath );
        this.type = type;
    }
}