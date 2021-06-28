# k6-test-example

### What is k6

Main site: [k6.io](https://k6.io/ "k6.io") \
Documentation: [k6.io documentation](https://k6.io/docs/ "k6 documentation")

> k6 is a developer-centric, free and open-source load testing tool built for making performance testing a productive and enjoyable experience.
> 
> Using k6, you'll be able to catch performance regression and problems earlier, allowing you to build resilient systems and robust applications.


### Installing
To install k6, follow the these [instructions](https://k6.io/docs/getting-started/installation/ "instructions").

### Setup/definition script

`test-script.js` is setup to send 1000 requests per second for 30 seconds.  The load is executed by 100 initially allocated "VUs" (virtual users), so each one is responible for handling 10 requests per second.  If a the response for a given request isn't received before the next is to be sent, another VU can be initialized (up to the max - 200 in the example).

From K6:
> If the requests don't make it in 1 second, e.g. the response took more than 1 second to receive or your SUT took more than 1 second to complete the task, k6 will increase the number of VUs to account for missing requests.

\* **_SUT_** = System Under Test

Currently, the input script is setup to take the target URL as an environment variable (`-e TARGET_URL=<url_here>`).  The other values (duration, requests per second, etc.) need to be changed in the script, or you can update it to use additional environment variables/arguments.


### Example & Output
How to run: `k6 run -e TARGET_URL=<url_here> <script_file>`

`k6 run -e TARGET_URL=http://localhost:8080/actuator/health k6-test.js` produces output similar to the following:

```
dennis@Denniss-MacBook-Pro Documents % k6 run -e TARGET_URL=http://localhost:8080/actuator/health k6-test.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m0s max duration (incl. graceful stop):
           * constant_request_rate: 1000.00 iterations/s for 30s (maxVUs: 100-200, gracefulStop: 30s)


running (0m30.0s), 000/100 VUs, 30001 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 100/100 VUs  30s  1000 iters/s

     data_received..................: 5.0 MB 167 kB/s
     data_sent......................: 2.9 MB 95 kB/s
     http_req_blocked...............: avg=4.52µs   min=1µs      med=2µs      max=2.71ms  p(90)=3µs      p(95)=3µs     
     http_req_connecting............: avg=1.71µs   min=0s       med=0s       max=2.67ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=474.99µs min=238µs    med=313µs    max=87.55ms p(90)=396µs    p(95)=441µs   
       { expected_response:true }...: avg=474.99µs min=238µs    med=313µs    max=87.55ms p(90)=396µs    p(95)=441µs   
     http_req_failed................: 0.00%  ✓ 0     ✗ 30001
     http_req_receiving.............: avg=46.01µs  min=18µs     med=43µs     max=8.35ms  p(90)=59µs     p(95)=68µs    
     http_req_sending...............: avg=11.02µs  min=6µs      med=10µs     max=1.04ms  p(90)=12µs     p(95)=14µs    
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=417.95µs min=193µs    med=260µs    max=87.41ms p(90)=331µs    p(95)=368µs   
     http_reqs......................: 30001  999.934573/s
     iteration_duration.............: avg=544.17µs min=283.63µs med=376.97µs max=90.65ms p(90)=476.07µs p(95)=532.84µs
     iterations.....................: 30001  999.934573/s
     vus............................: 100    min=100 max=100
     vus_max........................: 100    min=100 max=100

```

