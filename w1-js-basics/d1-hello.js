// 과제 1. 퀴즈 확인
// Q1. 무엇이 출력될까? -> admin: 2

const name = 'admin';
let count =1;
count = count +1;
console.log(`${name}: ${count}`);

// Q2. 무엇이 출력될까? (에러가 날 수도 있다) -> Uncaught TypeError TypeError: Assignment to constant variable.
/*
const role = 'user';
role = 'admin';
console.log(role);
*/
// Q3. 두 줄은 각각 무엇을 출력할까? -> Hi, QA > `Hi, ${name}`

const greet = (name) => `Hi, ${name}`;
console.log(greet('QA'));
console.log(greet);


// 과제 2. 함수 세 개 만들기
// isAdmin(role)
//const isAdmin = (role) => {return role==='admin'?true: false};
const isAdmin = (role) => role ==='admin';
console.log(isAdmin('admin'));
console.log(isAdmin('user'));

//formatResult(tcId, passed)
const formatResult = (tcId, passed) => {return passed? `${tcId}: PASS` : `${tcId}: FAIL`};
console.log(formatResult('TC-001', true));
console.log(formatResult('TC-002', false));

//passRate(passed, total)
function passRate(passed, total){
    if(total === 0){
        return '0.0%'; // NaN 으로 나오는 값을 아예 치환해줬어요.
    }
    return (passed/total * 100).toFixed(1)+'%';
}
console.log(passRate(39,40));
console.log(passRate(0,0));
console.log(passRate(5,-6));
