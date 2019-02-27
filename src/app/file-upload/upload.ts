export class Upload{
    file: File;
    name: string;
    attach: string;
    url: string;
    progress: number;

    constructor(file: File){
        this.file = file;
    }
}