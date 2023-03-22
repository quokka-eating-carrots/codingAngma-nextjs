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

`<img />` 태그 대신 `Image`를 사용할 것을 권장한다. `Image` 태그를 사용하면 필수 값을 지정해 주어야 하는데 width 값을 필수로 지정해 주기도 하고, 태그 때문인 건지 css가 먹지 않아서 결국 그냥 `img` 태그를 사용하게 되었는데, 이때 계속 eslint 오류를 띄우게 된다. 해결하는 방법을 몰라서 (ㅠㅠ) `/* eslint-disable @next/next/no-img-element */` 를 코드 상단 위에 작성한 후 코드를 써 주었다.

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

## Server Side Rendering

서버에서만 돌아가는 props를 만들 땐 `getServerSideProps` 함수를 생성한다. 이름이 바뀌면 안 됨! 클라이언트에서는 보이지 않고, 서버에서만 실행되기 때문에 API KEY 같은 민감한 정보를 지울 수 있다.

## Dynamic Routes

`/movies/123` 과 같은 주소 값을 가지기 위해서는 `movies` 폴더를 만들어 준다. 123이 변동되는 값이라면 `[]`를 사용하여서 파일을 만들어 준다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/30637ecb-e2be-4427-836b-59573c7eeaa2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230321T071234Z&X-Amz-Expires=86400&X-Amz-Signature=bb8f3bb0beb3d3345bc8f805bbd7dcd2b4e6b02ae4ff32920c1cc7e8a53aedc2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

## Movie Detail

`router.push` 메소드를 통해서 query들을 추가해 줄 수 있는데 이걸 이용자에게 보이고 싶지 않다면 아래처럼 작성하면 된다. `/movies/${id}`만 주소 값에 보이게 되고, query는 개발자 도구에서 확인할 수 있다.

```typescript
const onClick = (id: number, title: string) => {
  router.push(
    {
      pathname: `/movies/${id}`,
      query: {
        title,
      },
    },
    `/movies/${id}`
  );
};
```

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6068e432-eb07-4d83-925b-38650f09ad45/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230322T044614Z&X-Amz-Expires=86400&X-Amz-Signature=ce93eac587f95ddbedf7ce2aa74c083f450735f773971a12c8f0093916804ef3&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

```typescript
<Link
  href={{
    pathname: `/movies/${movie.id}`,
    query: {
      title: movie.original_title,
    },
  }}
  as={`/movies/${movie.id}`}
>
```

`Link` 태그 안에도 href, as 속성으로 사용해 줄 수 있다.
