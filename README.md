# NextJS Study

## Framework vs Libaray

Framework는 정해진 틀을 깰 수 없다. 정해진 틀 안에서 코드들을 작성해야 한다.

## Pages

Pages 폴더 안에 있는 파일들의 파일명은 주소 값이 된다. 주소를 잘못 입력하면 next.js의 404 페이지를 보여 준다. `export default`를 작성하지 않으면 react component가 아니라는 에러 메시지를 띄워 준다. `export default`를 할 때 컴포넌트의 이름은 무엇이 되든 상관없다.
index.js는 홈을 뜻하며, `/index` 주소 값을 가질 수 없다.

## Routing

`<a>` 태그 대신 `Link`를 사용한다.

## Custom App

`_app.tsx` 파일에는 `globals.css` 를 임포트 할 수 없다. css를 임포트 하고 싶다면 module 파일이어야 한다.
