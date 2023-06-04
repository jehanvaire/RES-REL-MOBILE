export class LikeEntity {
    id!: number;
    title!: string;
    contenu!: string;
    date!: Date;
    image!: string;

    constructor(init?: Partial<LikeEntity>) {
        Object.assign(this, init);
    }
}
