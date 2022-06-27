# notice

## info

- room: 채팅방 이름
- msg: 메시지 내용
- ​sender: 보낸사람 이름
- isGroupChat: 그룹채팅인지 아닌지 여부
- replier: 답장할 때 사용할 객체
- ImageDB: 프로필사진 관련

## 송신

```js
if(msg=='아무말'){
    실행될 코드
}

if(sender=='사용자'){
    실행될 코드
}

if(room=='방이름'){
    실행될 코드
}

if(msg.startsWith('아무말')){
    실행될코드
}

if(msg.includes("환불")){
  replier.reply('환불 안내가 필요하신가요?')
}

```

## 답장

```js
if (msg == '안녕') {
  replier.reply('안녕하세요');
}
```

안드 7.0 버전
카톡 9.8 버전
