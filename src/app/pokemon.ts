export class Pokemon {

    constructor(
        public id: number,
        public name: string,
        public height: number,
        public weight: number,
        public urlImage: string,
        public description?: any
    ) {}
}
