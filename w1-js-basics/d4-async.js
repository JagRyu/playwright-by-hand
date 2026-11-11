import {results} from './test-data.js'
import {passRate} from './qa-utils.js'

//과제 1
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const slow = async () => {
  await wait(1000);
  console.log('B');
};

//console.log('A');
//slow();
//console.log('C');

//과제 2. 
async function loadResults() {
  await wait(1000);
  return results;
}
console.log('불러오는 중...');
const data = await loadResults();
const passedCount = data.filter((r)=> r.passed === true).length;
console.log(`불러온 개수: ${data.length}`);
console.log(`통과율: ${passRate(passedCount, data.length)}`);
