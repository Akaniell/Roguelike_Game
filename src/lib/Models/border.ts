import { Entity } from './entity';
import { updateGameFieldState } from '$lib/Stores/borderStore';

export class GameField {
    private grid: (Entity | null)[][];
    private gridSizeX: number;
    private gridSizeY: number;

    constructor(gridSizeX: number, gridSizeY: number) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];
        this.initGrid();
    }

    private initGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSizeY; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.gridSizeX; j++) {
                this.grid[i][j] = null; 
            }
        }
        const initialGameFieldState = {
            grid: this.grid,
            gridSizeX: this.gridSizeX,
            gridSizeY: this.gridSizeY
        }
        updateGameFieldState(initialGameFieldState);
    }

    public placeEntity(entity: Entity, x: number, y: number): boolean {
        if (x < 0 || x >= this.gridSizeX || y < 0 || y >= this.gridSizeY) return false;

        if (this.getEntityAt(x,y)) return false;

        entity.x = x;
        entity.y = y;

        console.log(`Сущность ${entity.name} размещена в позиции (${x},${y})`);

        this.setEntityAt(x,y ,entity );
        return true ;
    }

    public getEntityAt(x:number ,y:number ): Entity|null{
		if( x<0||x>=this.gridSizeX||y<0||y>=this.gridSizeY){
			return null ;
		}
		return	this.getCellContent(x,y ) ;
	}

    private setEntityAt( x :number ,y :number ,entity :Entity ){
		if( x<0||x>=this.gridSizeX||y<0||y>=this.gridSizeY){
			throw new Error('Недопустимые координаты');
		}
        this.grid[y][x] = entity;
    }

    private getCellContent( x :number ,y :number ):null|Entity{
        return	this.grid[y][x];
    }

    public getGridData(): any[][] {
        return this.grid.map((row) => {
            return row.map((cell) => {
                return {
                    entityName: cell?.name ?? '',
                    hasEntity: Boolean(cell)
                };
            });
        });
    }
}