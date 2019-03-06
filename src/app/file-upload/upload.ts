export class Upload{
    file: File;
    mainFile: File;
    name: string;
    attach: string;
    url: string;
    desc: string;
    progress: number;

    constructor(file: File){
        this.file = file;
    }
}