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
