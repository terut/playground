## Proxy for javascript frameworks

Use React and Vue.js on same domain.

### Demo

```sh
# Build
$ cd react
$ yarn install
$ yarn build
$ cd ../vue
$ yarn install
$ yarn build

$ cd ..
$ docker build --no-cache -t nginx-demo .
$ docker run -p 8080:80 nginx-demo
```

Open http://localhost:8080 .
