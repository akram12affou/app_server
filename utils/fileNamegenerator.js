import { v4 as uuidv4 } from 'uuid';

export const fileNameG = (file) => {
    let originalName = file.name;
    let splittedFileName = originalName.split('.');
    return splittedFileName[0] +  uuidv4() + '.' + splittedFileName[1];
}