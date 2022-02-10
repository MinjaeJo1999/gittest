# WebRTC 구현
## [개요]
- WebRTC API를 통해 PC, 모바일에서 가능한 P2P 통신 구현 
<br/><br/>
## [미리보기]
![KakaoTalk_20211209_202402822](https://user-images.githubusercontent.com/77188666/145390823-fea91370-2ba4-4845-ad79-e02847d666aa.gif)
- 같은 network에서 user들이 다양한 환경(web, mobile)에서 study room1에 접속한 모습

<br/><br/>
## [개발 환경]
- Node.js
<br/><br/>
## [사용 기술] 
대상|버전
---|---|
express|4.17.1
socket.io|4.3.2
PeerJs|
OpenSSL|[Download](https://slproweb.com/products/Win32OpenSSL.html)

<br/><br/>
## [실행 방법] 
```jsx
npm init -y
```
```jsx
npm i express ejs socket.io
```
```jsx
npm i uuid
```
```jsx
npm i --save-dev nodemon
```
```jsx
npm run devStart
```
```jsx
npm install -g nodemon --unsafe-perm=true --allow-root
```
```jsx
peerjs --port 3001 
```
<br/><br/>
## [참고 링크]
[How To Create A Video Chat App With WebRTC](https://www.youtube.com/watch?v=DvlyzDZDEq4&t=145s)
