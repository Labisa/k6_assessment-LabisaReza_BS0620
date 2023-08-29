import http from 'k6/http';
import { check, sleep } from 'k6';
import generateAccessToken from "./access_token_generate.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

 
export let options = {
    stages: [
      { duration: '10m', target: 200 }, // Ramp up to 200 requests per second over 10 minutes
    ],
    thresholds: {
      'http_req_duration': ['p(95)<3000'], // 95% of requests should complete within 3000ms
      'http_req_failed': ['rate<0.01'],    // Request failure rate should be below 1%
    },
  };


export default function () {

    const access_token = generateAccessToken()
    const params = {
        headers:{
            'Authorization': `Bearer ${access_token}`,

            "Content-Type": "application/json"
        }

    }

    const res = http.get('http://103.95.98.138:7030/report/transaction/report/admin/list',  params)
    check(res, { 'status was 200': (r) => r.status === 200})
    sleep(1);
}

export function handleSummary(data) {

    return {

        "transactionReports.html": htmlReport(data),

    };

}


  
  