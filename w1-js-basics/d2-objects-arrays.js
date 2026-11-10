//과제 1. 퀴즈 확인
const user = {role: 'user'};
user.role = 'admin';
console.log(user.role);

const users = [
    {name: 'kim', role: 'admin'},
    {name: 'lee', role: 'user'},
];
console.log(users.length);
console.log(users[1].role);
console.log(users[2]);

const nums = [3, 8, 1, 9];
console.log(nums.filter((n)=> n>5));
console.log(nums.find((n) => n > 5));


//과제 2. 테스트 결과표 다루기
const results = [
  { id: 'TC-001', title: '로그인 성공', passed: true },
  { id: 'TC-002', title: '잠긴 계정 로그인', passed: true },
  { id: 'TC-003', title: '빈 비밀번호', passed: false },
  { id: 'TC-004', title: '상품 정렬', passed: true },
  { id: 'TC-005', title: '장바구니 담기', passed: false },
];

//filter가 아무것도 못 찾으면 무엇을 돌려주나?
const none = results.filter((r) => r.id === 'TC-999');
console.log('filter 결과:', none);
console.log('filter 개수:', none.length);

const notFound = results.find((r) => r.id === 'TC-999');
console.log('find 결과:', notFound);

//1. 실패한 TC만 골라내기
const failed = results.filter((n) => n.passed === false);
console.log(failed);

//2. TC-004 찾기
const findTC004 = results.find((n) => n.id === 'TC-004')
console.log(findTC004);

//3. 통과한 개수 세기
const passed = results.filter((n) => n.passed).length
console.log(passed)

//4. W1D1 의 passRate 복사하여 통과율 구하기
/*function passRate(passed, total){
    if(total === 0){
        return '0.0%'; // NaN 으로 나오는 값을 아예 치환해줬어요.
    }
    return (passed/total * 100).toFixed(1)+'%';
}
console.log(passRate(passed, results.length));
d3 과제 1번으로 주석 처리함*/

//과제 3. passRate 이상 입력 막기
function passRate(passed, total){
    if(total === 0){
        return '0.0%'; // NaN 으로 나오는 값을 아예 치환해줬어요.
    }
    else if(passed < 0 || total <0){
        throw new Error('개수는 음수일 수 없습니다.');
    }
    else if(passed > total){
        throw new Error('전체 TC 개수 보다 통과한 TC 수가 많을 수 없습니다.');
    }
    return (passed/total * 100).toFixed(1)+'%';
}
console.log(passRate(2, 3))