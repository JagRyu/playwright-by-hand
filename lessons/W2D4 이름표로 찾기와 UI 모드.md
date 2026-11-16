# W2D4: 이름표로 찾기와 UI 모드

> **손으로 짜는 Playwright** · W2 첫 테스트 · 9/40회
> 형식: 워밍업 5분 → 개념 10분 → 예측 퀴즈 → 손으로 치기 30분 → 설명하기 10분 → 기록 5분
> 오늘 새로 쓰는 것: `playwright.config.js`(첫 설정 파일), `getByTestId`, UI 모드. W2D3 에서 "`locator` 가 지저분해 보인다"고 했던 질문을 직접 손으로 풀어 본다.

## 워밍업 (5분)

**0. 지난 시간 남은 것.** W2D3 설명 1·2 에 증거(③) 문장을 한 줄씩 붙인다.

**1. HTML 보고 찾는 방법 고르기** (W2D3 NOTES ❓ "메서드가 HTML 의 어느 값과 짝인가")

아래는 saucedemo 의 실제 HTML 이다. 각각 **어떤 `getBy*` 로 찾을지** 적는다. 하나로만 찾을 수 없는 것이 있으면 이유도 적는다.

```html
<!-- ① 로그인 화면 -->
<input placeholder="Username" data-test="username">

<!-- ② 상품 목록 화면 (이 버튼이 6개 있다) -->
<button data-test="add-to-cart-sauce-labs-backpack">Add to cart</button>

<!-- ③ 상품 목록 화면 맨 위 제목 -->
<span class="title" data-test="title">Products</span>
```

내 답:
① getByPlaceholder
② locator
③ locator, getByText -> title 이라는 명칭은 흔하게 널리 쓰일 것 같은 이름이라 getByText로 'Products' 까지 확정지어 준다면 바로 찾을 것 같다.
**아니 그리고, 좀 개념이라도 알려주고 워밍업 문제 좀 내주세요. 아예 모르는거에 답을 적으라고 하니 5분이 아니라 거의 15분은 걸리잖아요

## 개념 (10분)

### 첫 설정 파일: `playwright.config.js`

지금까지는 설정 파일 없이 Playwright 기본값으로 돌렸다. 설정 파일을 폴더 맨 위에 두면 **모든 테스트에 같이 적용**된다.

```js
// w2-first-test/playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-test',
  },
});
```

| 부분 | 뜻 |
|---|---|
| `defineConfig({ ... })` | 설정 객체를 Playwright 에 넘긴다. W1 에서 배운 객체 그대로다 |
| `use: { ... }` | 테스트마다 `page` 를 만들 때 쓸 옵션 |
| `testIdAttribute: 'data-test'` | `getByTestId` 가 찾을 이름표 이름. 기본값은 `'data-testid'` |

### `getByTestId`: 이름표로 찾기

config 가 있으면 두 줄은 **같은 요소**를 찾는다.

```js
page.locator('[data-test="shopping-cart-link"]')   // CSS 셀렉터로
page.getByTestId('shopping-cart-link')              // 이름표 값만
```

### 이름표가 있다고 다 하나는 아니다

saucedemo 의 상품 이름 6개는 **모두 같은 이름표**를 달고 있다.

```html
<div data-test="inventory-item-name">Sauce Labs Backpack</div>
<div data-test="inventory-item-name">Sauce Labs Bike Light</div>
... (6개)
```

이름표는 개발자가 붙인다. 하나에 하나씩 붙였는지는 **HTML 을 봐야 안다.**

### UI 모드: 테스트를 화면으로 보며 돌리기

```
npx playwright test --ui
```

창이 하나 뜬다. 왼쪽에서 테스트를 골라 ▶ 로 돌리면 가운데에 **줄마다 그 순간의 화면**이 남는다. 줄을 누르면 그 줄을 실행할 때 화면이 어땠는지 볼 수 있다. 창을 닫으면 끝난다.

## 예측 퀴즈 (실행하기 전에 답을 적는다)

> 예측 칸은 실행 뒤에도 고치지 않는다. 틀렸으면 아래에 `실제:` 를 따로 적는다.

**Q1.** config 를 넣은 뒤 `codegen-raw.spec.js` 는 고치지 않는다. (`locator('[data-test="..."]')` 그대로) 이 파일은 통과할까?

내 예측: 통과할 것이다. config를 통해서 고친건 'getByTestId' 사용의 기본 이름표의 명칭을 바꾼 것이지 'locator' 자체를 바꾼건 아니기 때문이다.

**Q2.** 상품 목록 화면에서 아래 줄을 실행하면 어떻게 될까?

```js
await page.getByTestId('inventory-item-name').click();
```

내 예측: 요소가 6개 있다는 Error 메시지를 표출할 것이다.

**Q3.** config 의 `'data-test'` 를 `'data-tset'` 으로 오타를 내고 `cart.spec.js` 를 돌리면? (실패하나? 몇 초 뒤에? **어느 줄**에서?)

내 예측: locator 로 작성된 현재는 Error 가 안난다.
실제: getByTestId를 사용하기 전 locator를 이용한 코드를 실행하니 passed 가 떴지만, 과제 2 에서 getByTestId('...') 로 변경하니 오타 발생 시 Error 를 뱉는다.

## 손으로 치기 (30분)

### 과제 1. 설정 파일 만들기

`w2-first-test/playwright.config.js` 를 만들고 개념의 코드를 **손으로** 친다. `npx playwright test` 로 전체를 돌린다 (Q1 확인).

결과(몇 passed): 5 passed

### 과제 2. `cart.spec.js` 를 이름표로 바꾸기

`page.locator('[data-test="..."]')` 세 곳을 `page.getByTestId('...')` 로 바꾼다. 주석 처리된 `getByRole` 줄은 지운다. 다시 돌린다.

결과(몇 passed): 5 passed

### 과제 3. UI 모드로 보기

1. `npx playwright test --ui` 를 친다.
2. 왼쪽에서 `cart.spec.js` 의 `장바구니 담기` 를 ▶ 로 돌린다.
3. 가운데 줄 목록에서 `getByTestId('add-to-cart-...')` 줄을 누르고, 그 순간 화면에 무엇이 보이는지 적는다.

그 줄의 화면: getByTestId('add-to-cart-...') 클릭 시 로그인이 성공하여 상품 목록은 보이나, Selector 박스를 정확하게 짚지 못하고 있는 것 같다.

4. 마음에 드는 줄을 하나 더 눌러 보고, 무엇이 보였는지 한 줄 적는다.

내가 본 것: getByRole('button', {name: Login}) 줄을 눌러봤는데, 'Login' 버튼의 Selector 가 파란색 박스로 변했고, 빨간 원이 뜬걸로 보아 클릭하려고 하는 화면 같다.

### 과제 4. 고장 내기 (예측 → 실행 → 되돌리기)

1. `cart.spec.js` 의 `Products` 확인 줄 바로 아래에 Q2 의 줄을 넣고 돌린다.
   - 실제 결과: (`Error:` 줄 · `resolved to ? elements` · `aka` 뒤에 나온 대안 하나)
     - Error: locator.click: Error: strict mode violation: getByTestId('inventory-item-name') resolved to 6 elements
        1) <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Backpack</div> aka getByTestId('item-4-title-link')
        2) <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Bike Light</div> aka getByTestId('item-0-title-link')
        3) <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Bolt T-Shirt</div> aka getByTestId('item-1-title-link')
        4) <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Fleece Jacket</div> aka getByTestId('item-5-title-link')
        5) <div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Onesie</div> aka getByTestId('item-2-title-link')
        6) <div class="inventory_item_name " data-test="inventory-item-name">Test.allTheThings() T-Shirt (Red)</div> aka getByTestId('item-3-title-link')
2. 1번 줄을 지우고, config 에 Q3 의 오타를 내고 돌린다.
   - 실제 결과: (`Error:` 줄 · 실패한 줄 번호 · 걸린 시간)
     -  Error: locator.click: Test timeout of 30000ms exceeded.
        Call log:
      - waiting for getByTestId('add-to-cart-sauce-labs-backpack')
    - 11 줄
    - 30000ms
3. 오타를 되돌리고 전체가 통과하는지 확인한다. -> 5 passed

## 설명하기 (10분)

공식: ① 무엇인가 ② 왜 ③ 내가 본 증거. 물음표 없이 단정한다.

1. `locator('[data-test="..."]')` 대신 `getByTestId('...')` 를 쓰면 무엇이 좋은가? (Q1 과 과제 4-2 를 증거로) -> 공통으로 사용되는 'data-test' 를 config 에서 관리할 수 있다. Q1 에서 config 를 넣어도 locator 로 쓴 codegen-raw.spec.js 는 그대로 통과했다. 과제 4-2 에서 config 에 'data-tset' 오타를 내자 getByTestId('add-to-cart-sauce-labs-backpack') 줄이 30000ms 뒤 실패했고, 오타를 되돌리자 5 passed 가 됐다. 이름표 이름이 config 한 곳에서 정해진다는 뜻이다.
2. "`data-test` 이름표로 찾으면 항상 하나만 찾힌다"는 맞는 말인가? (과제 4-1 을 증거로) -> 틀렸다. 같은 data-test를 가진 CSS Selector 가 존재할 수 있기에 항상 하나만 찾지 않는다. 과제 4-1 에서 getByTestId('inventory-item-name') 이 resolved to 6 elements 로 실패했다. 상품 이름 6개가 모두 data-test="inventory-item-name" 이었다. Playwright 는 aka getByTestId('item-4-title-link') 처럼 하나만 가리키는 다른 이름표를 대안으로 보여 줬다.

## 기록 (5분)

`w2-first-test/NOTES.md` 에 W2D4 칸을 추가한다.

커밋 메시지: `W2D4: 이름표로 찾기와 UI 모드`

## 제출

파일을 저장(Ctrl+S)하고 "채점해주세요"로 부른다.
