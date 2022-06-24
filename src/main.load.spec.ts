import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '10s', target: 10000 },
    { duration: '20s', target: 10000 },
  ],
};

export default function () {
  const res = http.get('http://localhost:5000/profiles/1');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
