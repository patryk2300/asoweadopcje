export class NewsSchema {
    desc: string;
    images: Array<any>;
    mainImg: object;
    shortDesc: string;
    title: string;
    uploadedDate: string;

    constructor(){
        this.desc = '';
        this.images = [];
        this.mainImg = [];
        this.shortDesc = '';
        this.title = '';
        this.uploadedDate = '';

    }
}