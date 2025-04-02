import * as fs from 'fs'
export function getAuthData(){
    const filePath = "creds.json";
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return jsonData
}