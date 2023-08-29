import http from 'k6/http';
import {check} from 'k6';

const clientId = 'wallet-ms-admin';
const clientSecret = '8938db02-2c31-4229-924c-08cf10d91d87';
const tokenEndpoint = 'https://103.95.98.138:8449/auth/realms/unipet/protocol/openid-connect/token';
const username = 'labisadevadd@yopmail.com';
const password = '123456@Aa';

export default function generateAccessToken() {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded', // Specify the Content-Type
    };
    const body = `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}`
    const response = http.post(tokenEndpoint, body, { headers });
    // check(response, {
    //     'Token request successful': (response) => response.status === 200,
    // });
    // console.log('Access Token:', accessToken);
    return JSON.parse(response.body).access_token


}