import http from 'k6/http';

/*
 * requests --> rate per timeUnit --> 1000/sec
 * divided by pre-allocated VUs (virtual users) --> 10 req/sec per VU
 *
 * 100 VUs are pre-allocated - up to 200 can be used due to wait time
 * and/or blocking to try to keep 1000/sec going
 */
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

export default function () {
  http.get('${__ENV.TARGET_URL}');
}
