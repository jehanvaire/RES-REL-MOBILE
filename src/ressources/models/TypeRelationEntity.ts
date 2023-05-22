
export class TypeRelationEntity {
  id!: number;
  nom!: string;

  constructor(init?: Partial<TypeRelationEntity>) {
    Object.assign(this, init);
  }
}
