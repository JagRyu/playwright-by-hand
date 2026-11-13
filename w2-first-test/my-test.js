function myTest(name, fn) {
  console.log(`[${name}] 시작: 탭을 만든다`);
  const obj = { page: '새 브라우저 탭', browserName: 'chromium' };   // ① 객체를 만든다
  fn(obj);                                                          // ② 내 함수를 부르면서 그 객체를 넣는다
  console.log(`[${name}] 끝: 탭을 닫는다`);
}

myTest('로그인', ({ page }) => {          // ③ 나는 객체에서 page 를 꺼내 쓴다
  console.log('내 함수 안:', page);
});

myTest('없는 이름', ({ loginPage }) => {
  console.log('내 함수 안:', loginPage);
});