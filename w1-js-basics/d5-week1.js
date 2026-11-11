import { results } from "./test-data.js";
import { formatResult, passRate } from "./qa-utils.js";


// 과제 1. 1 위 표의 ①·③·④ 를 이름을 바꿔서 친다: getId1, getId3, getId4.
function getId1(r) {return r.id};
const getId2 = (r) => { r.id; };
const getId3=(r) => r.id;
const getId4 = ({id}) => id;

// 과제 1. 2 셋 다 results[0] 을 넣어 'TC-001' 이 나오는지 확인한다.
console.log(getId1(results[0]));
console.log(getId2(results[0]));
console.log(getId3(results[0]));
console.log(getId4(results[0]));

console.log([1, 2, 3].map((n) => {return n * 2 }));

// 과제 1. 3 const isFailed = ({ passed }) => !passed; 펼치기
function isFailed(tc){
    return !tc.passed;
}

console.log(isFailed(results[2]));

// 과제 2. 
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadResults() {
  await wait(1000);
  return results;
}

console.log('불러오는 중...');

const data = await loadResults();
const list = data.map(({id, passed}) => formatResult(id, passed));
const passedCount = data.filter((r)=> r.passed === true).length;
const totalCount = data.length;
const failTcId = data.filter((r)=> !r.passed).map(({id}) => id);

console.log('=== 테스트 결과 리포트 ===');
console.log(list.join('\n'));
console.log('통과율: '+ passRate(passedCount, totalCount))
console.log('실패: ' + failTcId.join(', '));


