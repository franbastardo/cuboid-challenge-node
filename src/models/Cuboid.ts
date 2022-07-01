import { Id, RelationMappings } from 'objection';
import { Bag } from './Bag';
import Base from './Base';

export class Cuboid extends Base {
  id!: Id;
  width!: number;
  height!: number;
  depth!: number;
  bagId?: Id;
  bag!: Bag;
  volume!: number;
  created_at: Date | undefined;
  updated_at: Date | undefined;

  static tableName = 'cuboids';

  $beforeInsert(): void {
    this.created_at = new Date();
    this.updated_at = new Date();
    this.volume = this.width * this.depth * this.height;
  }

  static get relationMappings(): RelationMappings {
    return {
      bag: {
        relation: Base.BelongsToOneRelation,
        modelClass: 'Bag',
        join: {
          from: 'cuboids.bagId',
          to: 'bags.id',
        },
      },
    };
  }
}

export default Cuboid;
