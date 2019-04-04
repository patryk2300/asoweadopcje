export class GalleryCard {
    desc: string;
    images: Array<any>;
    mainImg: object;
    dogName: string;

    constructor(){
        this.desc = '';
        this.images = [];
        this.mainImg = {};
        this.dogName = '';
    }
}
