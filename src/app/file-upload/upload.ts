export class Upload{
    file: File;
    mainFile: File;
    name: string;
    attach: any;
    url: string;
    desc: string;
    progress: number;

    constructor(file: File){
        this.file = file;
    }
}