import { Id, RelationMappings } from 'objection';
import { Cuboid } from './Cuboid';
import Base from './Base';

export class Bag extends Base {
  id!: Id;
  volume!: number;
  title!: string;
  payloadVolume!: number;
  availableVolume!: number;
  cuboids?: Cuboid[] | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;

  static tableName = 'bags';

  $beforeInsert(): void {
    this.created_at = new Date();
    this.updated_at = new Date();
    if (this.cuboids) {
      this.payloadVolume = this.cuboids.reduce(
        (acc, cuboid) =>
          (acc = acc + cuboid.width * cuboid.depth * cuboid.height),
        0
      );
      this.availableVolume = this.volume - this.payloadVolume;
    }
  }

  static get relationMappings(): RelationMappings {
    return {
      cuboids: {
        relation: Base.HasManyRelation,
        modelClass: 'Cuboid',
        join: {
          from: 'bags.id',
          to: 'cuboids.bagId',
        },
      },
    };
  }
}

export default Bag;
