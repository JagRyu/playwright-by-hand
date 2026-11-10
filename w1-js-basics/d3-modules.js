import { results } from "./test-data.js";
import { isAdmin, formatResult, passRate } from "./qa-utils.js";

// 과제 2. ① 통과 개수
const passedCount = results.filter((r)=>r.passed === true).length
console.log(passedCount);

// 과제 2. ② 통과율 (passRate 사용)
console.log(passRate(passedCount, results.length));

// 과제 2. ③ 결과 줄 목록: map 과 구조 분해를 써서 formatResult 로 바꾸기
console.log(results.map(({id, passed}) => formatResult(id, passed)))

// 과제 3.3 d3-modules.js 맨 아래에 두 줄을 넣으면 둘째 줄이 출력될까?
console.log(passRate(-1, 5));
console.log('이 줄은 실행될까?');