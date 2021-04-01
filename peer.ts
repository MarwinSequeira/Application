/* import express from 'express';
//server imports
import patient from './routes/patient.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//server variables
const port: number = 8010;

app.use('/patient', patient);

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
}); */

import { publicEncrypt, privateDecrypt, constants } from 'crypto';
import { readFileSync } from 'fs';
var data = 'mydata';
var data1 = {
    RBC: 12,
    Haemoglobin: 12,
    HCT: 12,
    Platelets: 161,
    WBC: 56,
    ESR: 123
}
console.log(encrypt(data1))
var pkey = '';

/* function encrypt(data1:object){
    let enc = {}
    for (var i of Object.keys(data1)){
        data = data1[i].toString()
        enc[i] = publicEncrypt(
            {
                key: readFileSync('pk.pem').toString(),
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(data)
        );
    }
    return enc
} */


var encryptedData = publicEncrypt(
    {
        key: readFileSync('pk.pem').toString(),
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    Buffer.from(JSON.stringify(data1))
);
console.log(encryptedData.toString());

var decrypted_data = privateDecrypt({
    key: readFileSync('pv.pem').toString(),
    padding: constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
}, encryptedData);
console.log(decrypted_data.toString())
