import http from 'k6/http';
import { check, sleep } from 'k6';
import generateAccessToken from "./access_token_generate.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";



export const options = {
    scenarios: {
      constant_vus: {
        executor: 'constant-vus',
        vus: 30,      
        duration: '2m',
      },
    },
  thresholds: {

        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.05'],
        http_reqs: ['rate<25'],
    },

};

export default function () {
  const category_name = `Category${Math.floor(Math.random() * 100) + 1}`;
  const payload = JSON.stringify({
    categoryName: category_name,
    isActive: true,
  });
  const access_token = generateAccessToken()
  const params = {
      headers:{

          'Authorization': `Bearer ${access_token}`,
          "Content-Type": "application/json"
      }
  }

  const res = http.post('http://103.95.98.138:7030/admin/category-dispute/',  payload,params)
  check(res, { 'status was 200': (r) => r.status === 200})
  sleep(1);

}

export function handleSummary(data) {

  return {

      "dispute.html": htmlReport(data),

  };

}
