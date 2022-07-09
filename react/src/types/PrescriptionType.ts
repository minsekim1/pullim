export interface FileType {
    name: string;
    file: File;
}

export interface PhotoType extends FileType{
    image: string;
}

export interface PrescriptionType{
    photoList?: PhotoType[];
    videoList?: FileType[];
    memo: string;
    userID: string;
    userName: string; 
} 

 
