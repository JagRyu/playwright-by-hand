# W1D4: async와 await

> **손으로 짜는 Playwright** · W1 JS 기초 · 4/40회
> 형식: 워밍업 5분 → 개념 10분 → 예측 퀴즈 → 손으로 치기 30분 → 설명하기 10분 → 기록 5분
> 오늘 풀 것: `test('로그인', async ({ page }) => { ... })` 의 마지막 조각 `async`. 오늘이 끝나면 이 줄을 처음부터 끝까지 읽을 수 있다.

## 워밍업 (5분)

**1. 지난 시간 마무리.** `d3-modules.js` 맨 아래 두 줄을 주석 처리하고, `node d3-modules.js` 가 빨간 에러 없이 끝나는지 확인한다.

```js
// console.log(passRate(-1, 5));
// console.log('이 줄은 실행될까?');
```

**2. 모양 맞히기.** 배열 / 객체 / 값 / undefined 중 무엇일까? 실행하지 않고 머리로만.

| # | 코드 | 내 답 |
|---|---|---|
| 1 | `results[1].title` | 값 |
| 2 | `results.map(({ id }) => id)` | 배열 |
| 3 | `results.find((r) => r.passed === false)` | 객체 |

## 개념 (10분)

### 왜 기다려야 하나

지금까지의 코드는 한 줄이 **즉시** 끝났다. `filter` 도, `passRate` 도 눈 깜짝할 새에 끝난다.

브라우저는 다르다. 페이지를 열면 서버에서 화면이 올 때까지 시간이 걸린다. 버튼을 누르면 다음 화면이 뜰 때까지 또 걸린다. 그런데 **JS 는 오래 걸리는 일을 만나면 기다리지 않고 다음 줄로 넘어간다.** 그래서 "다 될 때까지 기다려"라고 직접 말해 줘야 한다.

### 오늘 쓸 도구: 일부러 느린 함수

브라우저는 W2 에서 쓴다. 오늘은 기다림을 흉내 내는 함수를 쓴다. **이 한 줄은 그대로 쳐서 쓴다.** 안쪽 원리는 몰라도 된다.

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// wait(1000) = 1초 걸리는 일
```

### Promise: "나중에 줄게" 교환권

오래 걸리는 함수는 값을 바로 못 준다. 대신 **교환권(Promise)** 을 먼저 준다. 카페 진동벨과 같다.

```js
console.log(wait(1000));   // Promise { <pending> }  ← "아직 준비 중"인 교환권
```

### `await`: 교환권을 내고 값이 나올 때까지 기다리기

```js
await wait(1000);          // 1초가 다 지날 때까지 다음 줄로 안 넘어간다
```

### `async`: "이 함수 안에서 await 를 쓰겠다"는 표시

`await` 는 `async` 가 붙은 함수 안에서만 쓸 수 있다.

```js
async function loadResults() {
  await wait(1000);        // 서버에서 결과를 받아 오는 척, 1초
  return results;
}
```

`async` 함수는 **항상 교환권(Promise)을 돌려준다.** 그래서 부르는 쪽도 `await` 를 붙여야 진짜 값을 받는다.

```js
const data = await loadResults();   // 1초 기다린 뒤 results 배열을 받음
```

(모듈 파일에서는 파일 맨 바깥에서도 `await` 를 쓸 수 있다. 오늘은 이 방식으로 한다.)

### Playwright 에서

```js
test('로그인', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');   // 페이지가 열릴 때까지 기다림
  await page.getByRole('button', { name: 'Login' }).click();
});
```

`page.goto`, `click` 은 모두 오래 걸리는 일이라 교환권을 준다. 그래서 줄마다 `await` 를 붙이고, `await` 를 쓰려고 함수에 `async` 를 붙인 것이다. **`await` 를 빠뜨리는 것은 Playwright 에서 가장 흔한 실수 중 하나다.**

## 예측 퀴즈 (실행하기 전에 답을 적는다)

> 예측 칸은 실행 뒤에도 고치지 않는다. 틀렸으면 아래에 `실제:` 를 따로 적는다.

**Q1.** 세 글자가 어떤 **순서**로 출력될까?

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const slow = async () => {
  await wait(1000);
  console.log('B');
};

console.log('A');
slow();
console.log('C');
```

내 예측: A B C
실제: A C B

**Q2.** 무엇이 출력될까? (`loadResults` 는 위 개념의 그 함수)

```js
const data = loadResults();
console.log(data);
```

내 예측: results 배열
실제: Promise {[[PromiseState]]: 'pending', [[PromiseResult]]: undefined, Symbol(async_id_symbol): 192, Symbol(trigger_async_id_symbol): 38}

**Q3.** `await` 는 그대로 두고 `loadResults` 앞의 `async` 만 지우면?

내 예측: Error 날거 같은데, async가 있어야 await 를 쓸 수 있으니 SyntaxError

## 손으로 치기 (30분)

`w1-js-basics/d4-async.js` 파일에 작성한다. `results` 는 `test-data.js`, `passRate` 는 `qa-utils.js` 에서 `import` 한다.

### 과제 1. 퀴즈 확인

Q1 을 직접 쳐서 실행하고 예측과 비교한다. Q2·Q3 은 과제 2 를 만든 뒤 과제 3 에서 확인한다.

### 과제 2. 결과를 "불러와서" 통과율 내기

1. `wait` 와 `loadResults`(1초 기다린 뒤 `results` 를 돌려줌)를 만든다.
2. `await loadResults()` 로 받은 배열로 통과 개수와 통과율을 구한다.

목표 출력:

```
qa-utils 로드됨
불러오는 중...
불러온 개수: 5          ← 1초 뒤에 나온다
통과율: 60.0%
```

### 과제 3. 고장 내기 (각각 예측 → 실행 → 원래대로 되돌리기)

1. `const data = await loadResults();` 에서 **`await` 를 지우면?** (Q2 확인)
   - 내 예측: loadResults() 를 바로 실행할 것이다.
   - 실제 결과: TypeError 가 뜬다..
2. `loadResults` 앞의 **`async` 를 지우면?** (Q3 확인)
   - 내 예측: Error 뜬다.
   - 실제 결과: await 부분에 빨간 밑줄이 표시되고 ('await' expressions are only allowed within async functions and at the top levels of modules) 설명이 나온다. 실행 시 SyntaxError 가 발생한다.

## 설명하기 (10분)

1. Promise 를 내 말로 설명한다. (교환권, 진동벨 같은 비유를 써도 좋다) -> Promise는 오래 걸리는 함수가 값 대신 먼저 돌려주는 교환권으로 값이 아직 준비 안 됐으니 '준비되면 주겠다'는 약속만 먼저 주는 것이고, await 를 붙이면 그 값이 나올 때까지 기다렸다가 받는다. await 없이 찍으면 Promise {<pending>}(아직 준비 중)이 나온다.
2. 과제 3-1 에서 `await` 를 빠뜨리면 왜 그 결과가 나왔나? 워밍업의 "모양" 으로 설명해 본다. -> await를 빼면 data에는 배열이 아니라 Promise가 들어간다. filter는 배열이 가진 기능인데 Promise에는 filter가 없어서 에러가 난다. 실행하면 TypeError: data.filter is not a function 이 나오고, 기다리지도 않아서 1초 멈춤도 없다.
3. 아래 줄을 처음부터 끝까지 한 조각씩 내 말로 읽는다. -> '로그인'이라는 테스트를 등록한다. 테스트가 돌면 test가 브라우저 탭(page)을 넘겨주고, 그 탭으로 'https://www.saucedemo.com' 주소로 이동을 시작하고, 다 열릴 때까지 기다린다.
   ```js
   test('로그인', async ({ page }) => { await page.goto('https://www.saucedemo.com'); });
   ```

## 기록 (5분)

`w1-js-basics/NOTES.md` 에 W1D4 칸을 추가한다. 커밋 메시지: `W1D4: async와 await`

## 제출

파일을 저장(Ctrl+S)하고 "채점해주세요"로 부른다.
