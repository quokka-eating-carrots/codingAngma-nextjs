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

## Fetching data

`<img />` 태그 대신 `Image`를 사용할 것을 권장한다.

## Redirect and Rewrite

`next.config.js` 파일에서 아래와 같이 작성을 하게 되면 `/contact` 주소 값으로 가게 되면 `/form`으로 리다이렉트 하게 된다.

```javascript
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/form",
        permanent: false,
      },
    ];
  },
};
```

아래와 같이 작성을 하면 `:path` 값은 동일하게 넘어간다. `:path*`으로 한다면 path 뒤 값들도 동일하게 넘어간다.

```javascript
async redirects() {
  return [
    {
      source: "/old-blog/:path",
      destination: "/new-blog/:path",
      permanent: false
    }
  ]
}
```

rewrite는 redirect처럼 주소 값을 바꾸지 않는다. 아래 예시를 보면 `/api/movies`로 api 요청을 보내게 되는데 결과는 진짜 api로 보낸 것과 동일하게 오며, 개발자 도구 network 탭에서는 `/api/movies`로 보낸 것을 확인할 수 있다.

```javascript
// next.config.js
 async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },

// index.tsx
useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
      console.log(results);
    })();
  }, []);
```
