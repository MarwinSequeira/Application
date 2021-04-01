import { publicEncrypt, privateDecrypt, constants } from 'crypto';

export function encryption(key: string, data: object) {
    let encryptedData = publicEncrypt(
        {
            key,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(JSON.stringify(data))
    );
    return encryptedData;
}

export function decryption(key: string, encryptedData: any) {
    let decryptedData = privateDecrypt(
        {
            key,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(encryptedData)
    );
    return decryptedData.toString()
}
