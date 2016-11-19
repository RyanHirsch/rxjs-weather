# Weather RxJS

Code while following along with [Create a Weather App with RxJS](https://auth0.com/blog/understanding-reactive-programming-and-rxjs)

```
npm run serve
```

then visit [http://localhost:8080/webpack-dev-server/index.html]()

## Notes

I can't understand why we want to do a withLatestFrom the zip input stream because it only ever emits valid values. For instance, you can type in a valid zip code, remove it and type in jibberish. Then click the button and it will add the last valid zip code, and the jibberish you have typed in means nothing.
