# W1D1: Node 실행, 변수, 함수

> **손으로 짜는 Playwright** · W1 JS 기초 · 1/40회
> 형식: 준비 5분 → 개념 10분 → 예측 퀴즈 → 손으로 치기 30분 → 설명하기 10분 → 기록 5분

## 준비 (5분)

1. 터미널에서 `node -v`를 실행한다. 버전이 나오면 된다. 안 나오면 nodejs.org에서 LTS 버전을 설치한다.
2. 개인 GitHub에 `playwright-by-hand` repo를 만들고 `C:\Users\labje\personal\`에 clone한 뒤 `w1-js-basics/` 폴더를 만든다.
3. **VS Code의 AI 자동완성을 끈다.** Copilot이나 Claude 확장이 있다면 이 폴더에서는 비활성화한다. 오늘부터 손으로 친다.

## 개념 (10분)

### Node.js란?

JS는 원래 브라우저 안에서만 돌았다. Node.js는 **브라우저 밖에서 JS를 실행하는 프로그램**이다. Playwright도 Node 위에서 돈다. 그래서 `node 파일.js`로 실행한다.

### 변수: `const`와 `let`

```js
const site = 'saucedemo';   // 한 번 정하면 다시 대입할 수 없음
let retry = 0;              // 다시 대입할 수 있음
retry = retry + 1;
```

**기본은 `const`, 값이 바뀌어야 할 때만 `let`을 쓴다.** `var`는 옛날 방식이라 쓰지 않는다.

### 함수: 두 가지 모양

```js
// 1) 함수 선언
function add(a, b) {
  return a + b;
}

// 2) 화살표 함수 (Playwright에서 계속 나옴)
const add2 = (a, b) => a + b;
```

### 문자열 안에 값 넣기 (템플릿 리터럴)

```js
const id = 'TC-001';
console.log(`${id} 실행`);   // 백틱(`)을 씀. 작은따옴표가 아님
```

### 왜 오늘 이걸 배우나

Playwright 테스트의 첫 줄은 이렇게 생겼다.

```js
test('로그인', async ({ page }) => { ... });
```

이 안에 **화살표 함수가 들어 있고, 그 함수를 `test`에 통째로 넘기고 있다.** 오늘 그 절반을 읽을 수 있게 되고, `async`와 `{ page }`는 W1D2와 W1D4에서 푼다.

## 예측 퀴즈 (실행하기 전에 답을 적는다)

**Q1.** 무엇이 출력될까?

```js
const name = 'admin';
let count = 1;
count = count + 1;
console.log(`${name}: ${count}`);
```

내 예측:

**Q2.** 무엇이 출력될까? (에러가 날 수도 있다)

```js
const role = 'user';
role = 'admin';
console.log(role);
```

내 예측:

**Q3.** 두 줄은 각각 무엇을 출력할까?

```js
const greet = (name) => `Hi, ${name}`;
console.log(greet('QA'));
console.log(greet);
```

내 예측:

## 손으로 치기 (30분)

`w1-js-basics/d1-hello.js` 파일에 작성한다.

### 과제 1. 퀴즈 확인

Q1부터 Q3까지 직접 쳐서 `node d1-hello.js`로 실행하고 예측과 비교한다. Q2에서 에러가 나면 그 줄을 주석 처리하고 넘어간다.

### 과제 2. 함수 세 개 만들기

| 함수 | 동작 | 예시 |
|---|---|---|
| `isAdmin(role)` | role이 `'admin'`이면 `true`, 아니면 `false` | `isAdmin('user')` → `false` |
| `formatResult(tcId, passed)` | passed가 true면 PASS, 아니면 FAIL | `formatResult('TC-001', true)` → `"TC-001: PASS"` |
| `passRate(passed, total)` | 통과율을 소수 첫째 자리 % 문자열로 | `passRate(39, 40)` → `"97.5%"` |

- 하나는 **함수 선언**, 하나 이상은 **화살표 함수**로 작성한다.
- 힌트: 조건 분기는 `조건 ? A : B`, 소수 자리는 `숫자.toFixed(1)`.

### 과제 3. 고장 내기

1. `passRate` 안의 `return`을 지우면 무엇이 출력될까? **먼저 예측하고** 실행한다.
   - 내 예측:
   - 실제 결과:
2. `passRate(0, 0)`은 무엇을 출력할까? 예측하고 실행한 뒤, **이 경계값을 어떻게 처리할지** 정해서 고친다.
   - 내 예측:
   - 실제 결과:
   - 처리 방법:

## 설명하기 (10분)

내 말로 답한다. 정답처럼 쓰지 않아도 된다.

1. `const`와 `let`은 어떻게 다르고, 언제 무엇을 쓰나?
2. `greet`와 `greet('QA')`는 무엇이 다른가?
3. `passRate(0, 0)`은 왜 그런 결과가 나왔고, 어떻게 막았나?
4. `test('로그인', async ({ page }) => { ... });`에서 **오늘 배운 것으로 알아볼 수 있는 부분**은 어디인가?

## 기록 (5분)

`w1-js-basics/NOTES.md`에 남긴다.

```md
## W1D1
- 막힌 곳:
- 알게 된 것:
```

커밋 메시지: `W1D1: 변수와 함수`

## 제출

Claude에게 다음을 붙여 넣고 채점을 받는다.

1. 퀴즈 Q1~Q3 예측 (실행 전에 적은 것)
2. `d1-hello.js` 코드
3. 과제 3의 예측과 실제 결과
4. 설명하기 답 4개
