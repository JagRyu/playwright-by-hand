# W3D4: 일부러 flaky 만들기

> **손으로 짜는 Playwright** · W3 기다림과 확인 · 14/40회
> 형식: ❓ 답 10분 → 워밍업 5분 → 개념 5분 → 예측 퀴즈 → 손으로 치기 30분 → 설명하기 5분 → 기록 5분
> 오늘은 새 메서드가 없다. W3D1 부터 말로만 들은 **flaky**(같은 코드가 됐다 안 됐다 하는 테스트)를 직접 만들고, 여러 번 돌려서 눈으로 본다. 대신 ❓ 답을 길게 한다.

## W3D3 ❓ 답 (10분, 읽기만)

세 질문은 사실 한 가지 그림으로 풀린다.

### 그림 하나: 테스트 한 줄은 "찾기 + 확인" 이다

```js
await expect( page.getByTestId('status') ).toHaveText('Saved');
//            ─────── 찾기 ───────────      ──── 확인 ────
```

| | 찾기 | 확인 |
|---|---|---|
| 하는 일 | **어느 요소를 볼지** 정한다 (쪽지 만들기) | 그 요소가 **어떤 상태인지** 본다 |
| 이름 모양 | `getBy...` | `to...` 로 시작 |
| 지금까지 쓴 것 | `getByRole` · `getByText` · `getByTestId` | `toBeVisible` · `toHaveText` · `toHaveURL` |

사람으로 치면 찾기는 "**김 대리**를 봐라", 확인은 "**자리에 앉아 있나**"다.

### 1. `getByText('Save', { exact: true })` 와 `toHaveText('Save')` 는 어떻게 다른가?

**하나는 찾기, 하나는 확인이다.** 같은 칸에 들어갈 수 없다.

| 코드 | 묻는 것 |
|---|---|
| `await expect(page.getByText('Saved')).toBeVisible()` | 글자가 `Saved` 인 요소가 **화면 어딘가에** 보이나? |
| `await expect(page.getByTestId('status')).toHaveText('Saved')` | **상태 칸**의 글자가 `Saved` 인가? |

- 새 글자가 **생기는지** 볼 때(W3D1·W3D2)는 위 줄을 쓴다.
- 이미 있는 칸의 글자가 **바뀌는지** 볼 때(W3D3)는 아래 줄을 쓴다.

### 2. `await` 는 어디에 붙이나?

이 수업에서 쓰는 모양은 **딱 두 개**다. 둘 다 `await` 가 **줄 맨 앞**에 온다.

```js
await page.getByRole('button', { name: 'Save' }).click();      // 동작
await expect(page.getByTestId('status')).toHaveText('Saved');  // 확인
```

`expect(await 쪽지.textContent())` 처럼 **괄호 안에 `await`** 가 들어간 모양은 AI 가 쓰는 **한 번만 보는 확인**이다. 우리가 쓸 모양이 아니다. **보이면 고친다**는 것만 알면 된다.

### 3. `isVisible`, `toBeVisible`, `toBe` 는 어떻게 구분하나?

**`expect( )` 괄호 안을 본다.**

| `expect` 괄호 안 | 예 | 기다리나? |
|---|---|---|
| **쪽지**(찾기)가 있다 | `expect(page.getByText('Saved')).toBeVisible()` | 기다린다 (5초) |
| **값**(`true` · 글자)이 있다 | `expect(await page.getByText('Saved').isVisible()).toBe(true)` | 안 기다린다 |

- `isVisible()` 은 확인이 아니라 쪽지에게 "**지금** 보여?" 하고 묻는 것이다. `true`/`false` 를 돌려준다. 괄호 안에 `timeout` 을 넣어도 무시한다 (W3D3 워밍업 2: 213ms 실패).
- `toBe()` 는 화면을 모른다. 손에 든 값 두 개가 같은지만 본다.

## 워밍업 (5분, 배운 것 복습)

**1.** 아래 줄에서 **찾기**와 **확인**에 밑줄 대신 이름을 적는다.

```js
await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
```

- 찾기: page.getByRole('button', { name: 'Login' })
- 확인: toBeVisible()

**2.** 아래 두 줄은 각각 기다리나, 안 기다리나? (위 ❓ 답 3 의 표)

```js
expect(await page.getByTestId('status').textContent()).toBe('Saved');  // ①
await expect(page.getByTestId('status')).toHaveText('Saved');          // ②
```

- ①: 안 기다린다.
- ②: 기다린다. 

## 개념 (5분)

### 1. 오늘 쓸 연습 페이지: 저장 시간이 매번 다르다

```js
const html = `
<button onclick="setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<p>Saved</p>'), 1000 + Math.random() * 3000)">Save</button>
`;
```

W3D1 페이지와 **끝의 숫자 자리만** 다르다.

| 부분 | 뜻 |
|---|---|
| `Math.random()` | 0 이상 1 미만의 아무 수를 뽑는다. 누를 때마다 다르다 |
| `Math.random() * 3000` | 0 ~ 3000 사이의 아무 수 |
| `1000 + ...` | 1000 ~ 4000, 즉 **1초 ~ 4초 사이 아무 때나** `Saved` 가 생긴다 |

실제 서버도 이렇다. 어떤 날은 1초, 어떤 날은 4초 걸린다.

### 2. 같은 테스트를 여러 번 돌리기: `--repeat-each`

```
npx playwright test -g "고정 대기" --repeat-each=10
```

`-g` 로 고른 테스트를 **10번** 돌린다. 한 번 통과했다고 믿을 수 없을 때 쓴다.

## 예측 퀴즈 (예측만 적는다. 파일은 아직 고치지 않는다)

> 예측 칸은 실행 뒤에도 고치지 않는다. 틀렸으면 아래에 `실제:` 를 따로 적는다.
> 칸마다 하나를 고른다.

`랜덤 저장 - 고정 대기` 는 W3D2 의 AI 표본과 같다: `Save` 클릭 → `waitForTimeout(3000)` → `expect(await ...isVisible()).toBe(true)`.

**Q1.** `랜덤 저장 - 고정 대기` 를 **한 번** 돌리면? (확인은 **과제 1**)

- 결과(통과 / 실패 / 돌릴 때마다 다르다 중): 실패
- 실제: 돌릴 때마다 다르다

**Q2.** `랜덤 저장 - 고정 대기` 를 `--repeat-each=10` 으로 돌리면 10번 중 몇 번 통과할까? (확인은 **과제 2**)

- 통과 횟수(0번 / 1~9번 사이 / 10번 중): 0번
- 실제: 1~9번 사이

**Q3.** `랜덤 저장 - 기다리는 확인`(`await expect(...).toBeVisible()`)을 `--repeat-each=10` 으로 돌리면? (확인은 **과제 2**)

- 통과 횟수(0번 / 1~9번 사이 / 10번 중): 10번 통과

## 손으로 치기 (30분)

`w3-wait` 폴더에서 한다. 새 파일은 `flaky.spec.js` 다.

### 과제 1. 두 테스트 쓰고 세 번 돌리기 (Q1 확인)

`flaky.spec.js` 를 만들고 `import` 줄과 개념 1 의 `html` 을 넣는다. 테스트를 두 개 쓴다.

| 테스트 이름 | 하는 일 | 마지막 확인 |
|---|---|---|
| `랜덤 저장 - 고정 대기` | `setContent(html)` → `Save` 클릭 → `await page.waitForTimeout(3000)` | `expect(await page.getByText('Saved').isVisible()).toBe(true)` |
| `랜덤 저장 - 기다리는 확인` | `setContent(html)` → `Save` 클릭 | `await expect(page.getByText('Saved')).toBeVisible()` |

`npx playwright test flaky` 를 **세 번** 돌린다. 코드는 그대로 둔다.

- 1번째(몇 passed · 몇 failed): 1 passed 1 failed
  - Error: expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false
- 2번째: 2 passed
- 3번째: 2 passed

> 세 번 모두 결과가 같게 나올 수도 있다. 운이다. 그래서 과제 2 가 있다.

### 과제 2. 10번씩 돌리기 (Q2 · Q3 확인)

1. `npx playwright test -g "고정 대기" --repeat-each=10`
   - 실제 결과(몇 passed · 몇 failed): 5 passed 5 failed
   - 실패한 것의 `Expected:`·`Received:` 줄:
     - Error: expect(received).toBe(expected) // Object.is equality
     - Expected: true
     - Received: false
2. `npx playwright test -g "기다리는 확인" --repeat-each=10`
   - 실제 결과(몇 passed · 몇 failed): 10 passed

### 과제 3. 재시도가 flaky 를 가리는 것 보기

CI 에서는 실패하면 다시 돌리는 **재시도(retries)** 를 자주 켠다. 켜면 어떻게 보이는지 본다.

1. `npx playwright test -g "고정 대기" --repeat-each=10 --retries=2`
   - 실제 결과(맨 아래 `passed` · `failed` · `flaky` 각각 몇 개): 4 passed · 0 failed · 6 flaky (0개인 failed 는 합계 줄에 나오지 않는다)
   - 위 목록에 `(retry #1)` 이 붙은 줄이 있었나: 있었다. `Retry #1` 아래 에러가 찍힌 테스트는 처음 시도와 retry #1 에서 실패하고 retry #2 에서 통과했다. 끝까지 실패한 테스트는 없다.
     - Retry #1 ───────────────────────────────────────────────────────────────────────────────────────
    Error: expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false

> `flaky` 는 "처음엔 실패했는데 다시 돌리니 통과"라는 뜻이다. 재시도로 초록불이 늘어도 **코드가 고쳐진 것은 아니다.**

### 과제 4. 고치고 전체 통과 확인

1. `랜덤 저장 - 고정 대기` 의 `waitForTimeout` 줄과 `expect(await ...)` 줄 앞에 `//` 를 붙여 주석으로 남긴다. 그 아래에 `await expect(page.getByText('Saved')).toBeVisible();` 를 쓴다.
2. `npx playwright test -g "고정 대기" --repeat-each=10`
   - 결과(몇 passed): 10 passed
3. `npx playwright test` 로 **전체가 통과하는지** 확인한다. (`wait`·`timeout`·`status`·`flaky` 네 파일)
   - 결과(몇 passed): 9 passed

## 설명하기 (5분)

공식: ① 무엇인가 ② 왜 ③ 내가 본 증거. 물음표 없이 단정한다. **증거는 `실제 결과:` 칸의 숫자를 그대로 옮긴다.**

1. 동료가 "고정 대기 테스트, 내 PC 에서 한 번 돌려 봤는데 통과했어요" 라고 한다. 이 테스트를 믿을 수 있나? (증거: 과제 2-1 의 passed · failed 수)
   - 고정 대기 코드로는 믿을 수 없다. 같은 테스트를 10번 반복해 돌리면 통과할 때도 있고 실패할 때도 있다.
   - 증거: `5 passed` · `5 failed`, 실패한 것은 `Expected: true` / `Received: false`
   1. 5 passed 5 failed
   - 실패한 것의 `Expected:`·`Received:` 줄:
     - Error: expect(received).toBe(expected) // Object.is equality
     - Expected: true
     - Received: false

2. CI 에 `retries: 2` 를 켰더니 빨간불이 사라졌다. 문제가 해결된 것인가? (증거: 과제 3 의 `flaky` 수)
   - 해결된 것이 아니다. 재시도로 다시 돌려 통과한 테스트가 `flaky` 로 따로 세어졌다. 다음에 돌리면 또 실패할 수 있으므로 코드 자체를 고쳐야 한다.
   - 증거: `4 passed` · `6 flaky`

## 기록 (5분)

`w3-wait/NOTES.md` 에 W3D4 칸을 추가한다. (양식은 채점 때 이해도를 채워서 준다)

커밋 메시지: `W3D4: 일부러 flaky 만들기`

## 제출

파일을 저장(Ctrl+S)하고 "채점해주세요"로 부른다.
