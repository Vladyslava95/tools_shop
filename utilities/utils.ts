import * as fs from 'fs';
import * as path from 'path';

export function getAuthData(){
    const filePath = path.resolve(__dirname, 'creds.json');
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return jsonData
};

export function getPaymentData(){
    const filePath = path.resolve(__dirname, "paymentdata.json");
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return jsonData
};

export function getAddressData(){
    const filePath = path.resolve(__dirname, "address.json");
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return jsonData
}
