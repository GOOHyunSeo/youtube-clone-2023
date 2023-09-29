# youtube-clone

## global Router

/ -> Home

/join -> Join

/login -> Login

/search -> Search Video

/setting -> Setting

## video Router

/videos/upload -> Upload Video

/videos/:id/watch -> watch Video (+comments, likes)

/videos/:id/edit -> VEdit ideo

/videos/:id/delete -> Delete Video

## user Router

/users/:id -> SEE User (my videos, my comments(USER ONLY), my like(USER ONLY), my info)

/users/logout -> logout User logout

/users/edit -> Edit User

/users/delete -> Delete User

# 🍓 YouTube clone

### git repository 만들기

`$ git init`

`$ git remote add origin [git repository address]`

### package.json 만들기

`$ npm init`

### express 설치

`$ npm install express`

### 모듈 자동 설치

`$ npm install`

### babel 설치

For node https://babeljs.io/setup#installation

For nodemon https://babeljs.io/setup#installation

### nodemon 설치

`$ npm install nodemon --save-dev`

```purescript
"scripts": {
    "dev": "nodemon --exec babel-node index.js"
}
```

### express 사용하기

https://expressjs.com/en/starter/hello-world.html

### morgan 설치

`$ npm i morgan`

### routers & controllers 사용하기

https://expressjs.com/en/guide/routing.html#express-router

_`export_ const controller=()=>{}`할때는`import {controller} from "..."` **{}** 를 꼭 써야겠다.

### RegEx 사용하기

```purescript
\d+
hyunseo\w+
```

### pug 설치

`$ npm i pug`

```purescript
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
```

### express 에서 form 다루기

`app.use(express.urlencoded({ extended: true })`

그리고 input 에 name꼭 적어라!!!

### Mongo 세팅

mongoose 를 설치하기 전에 mongoDB가 잘 작동하는지 확인해야한다.

`$ mongod`

`$ mongosh` mongo shell 안으로 들어가게 해주는 말

### mongoose 설치

`npm install mongoose`

### 내 DB가 실행되고 있는 url 찾기

```purescript
Connecting to: mongodb://xxx.x.x.x:xxxxx/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0
```

### mongoDB에 새로운 database를 만드는 방법

server에서 db파일 그 자체를 import 해서 mongo에 연결해야한다.

https://mongoosejs.com/docs/connections.html

### Model 만들기

https://mongoosejs.com/docs/api/schema.html

https://mongoosejs.com/docs/api/model.html

### server.js 에 몽땅 넣지 말고 init.js(초기화)를 만들어서 세분화하자.

> server.js: express와 server의 configuration(환경 설정)에 관한 코드만 처리
>
> init.js: 필요한 것을 import시키는 담당, app실행

### Model 사용하기

https://mongoosejs.com/docs/queries.html

### DB를 만들때 Validation Error 생각하면서 model.create()하기

백엔드에서 일부러 값을 조정하면서까지 경우의 수를 생각해야한다.

### Middleware

https://mongoosejs.com/docs/middleware.html#pre

https://mongoosejs.com/docs/middleware.html#notes

[https://mongoosejs.com/docs/api/schema.html#Schema.prototype.static()](<https://mongoosejs.com/docs/api/schema.html#Schema.prototype.static()>)

### regex

https://www.mongodb.com/docs/manual/reference/operator/query/regex/
https://www.mongodb.com/docs/manual/reference/operator/query/or/

### bcrypt 로 PW 암호화하기

https://github.com/kelektiv/node.bcrypt.js#readme

`$ npm install bcrypt`

### \***\*Status Codes\*\***

https://developer.mozilla.org/ko/docs/Web/HTTP/Status

### middleware \***\*Sessions로\*\*** express에서 session을 처리하기

https://github.com/expressjs/session#readme

`$ npm install express-session`

### req.session 으로 session에 정보 추가하기

https://github.com/expressjs/session#reqsession

### res.locals 으로 모든 template에서 사용가능한 variables 만들고 사용하기

https://expressjs.com/en/api.html#res.locals

### \***\*connect-mongo로\*\*** 세션을 MongoDB에 저장하기

https://github.com/jdesboeufs/connect-mongo#readme

`$ npm install connect-mongo`

### \***\*cookie\*\***

https://expressjs.com/en/api.html#res.cookie

COOKIE_SECRET에 넣을 랜덤 문자열 생성 사이트 https://randomkeygen.com/

### dotenv로 .env파일을 읽고 변수를 process.env안에 넣기

https://github.com/motdotla/dotenv#readme

`$ npm install dotenv --save`

### Google \***\*OAuth2.0\*\***

> [참고 블로그]
>
> [https://velog.io/@tkdfo93/구글-OAuth2.0-Final-Project](https://velog.io/@tkdfo93/%EA%B5%AC%EA%B8%80-OAuth2.0-Final-Project)
>
> [https://velog.io/@mainfn/Node.js-express로-구글-OAuth-회원가입로그인-구현](https://velog.io/@mainfn/Node.js-express%EB%A1%9C-%EA%B5%AC%EA%B8%80-OAuth-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84)
>
> [https://velog.io/@young224/Google-OAuth-기능-구현](https://velog.io/@young224/Google-OAuth-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

**구글 OAuth 2 공식문서**

https://developers.google.com/identity/protocols/oauth2?hl=ko

https://developers.google.com/identity/protocols/oauth2/web-server#httprest_2

**구글 클라우드 플랫폼**

https://console.cloud.google.com/apis/credentials?hl=ko&project=true-energy-400119&supportedpurview=project
