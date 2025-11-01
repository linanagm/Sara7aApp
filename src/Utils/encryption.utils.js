import CryptoJS from "crypto-js";

export const encrypt = (plainText) => {
    return CryptoJS.AES.encrypt(plainText , "hghgjgjhuijlklo").toString();
};
//AES => algorithm encryption standard

export const decrypt = (cipherText) => {
    return CryptoJS.AES.decrypt(cipherText , "hghgjgjhuijlklo").toString(CryptoJS.enc.Utf8);
};



