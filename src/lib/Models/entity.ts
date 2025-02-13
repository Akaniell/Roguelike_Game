import { updateEntityState } from '$lib/Stores/entityStore';

export abstract class Entity {
    protected _id: number;
    protected _name: string;
    protected _health: number;
    protected _maxHealth: number;
    public x: number;
    public y: number;

    constructor(id: number, name: string, health: number, maxHealth: number) {
        this._id = id;
        this._name = name;
        this._health = health;
        this._maxHealth = maxHealth;
        this.x = 0;
        this.y = 0;

        const initialEntityState = {
            id:this.id,
            name:this.name,
            health:this.health ,
            maxHealth:this.maxHealth ,
            x:this.x ,
            y:this.y 
        }
        updateEntityState(initialEntityState); 
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get health() { return this._health; }
    get maxHealth() { return this._maxHealth; }

    takeDamage(damage: number) {       
        this._health -= damage;
        if (this.health < 0) this._health = 0;
        if(this.isAlive()){
            console.log(`${this.name} жив.`);
        }else{
            console.log(`${this.name} погибает.`);
        }

        const updatedState={
            id:this.id,
            name:this.name,
            health:this._health ,
            maxHealth:this.maxHealth ,
            x:this.x ,
            y:this.y 
        };
 
        updateEntityState(updatedState); 
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}
