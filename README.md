# Kangnam Lion Kakaotalk bot

android 폴더에 있는 source code를 scrcpy를 사용해서 복붙으로 개발중.

etc : android 폴더 빼고는 현재 사용하지 않음.

## Todo

(6.29) 시점에서 TodoList.

[x] - 날씨 카카오 링크로 변경 => 포멧은 그림있는거로 하면 좋겠음.

- opensea 카카오 링크로 정리
- 주식함수 google.com에서 크롤링중이나 다른 사이트로 변경 예정 => 전문 주식 사이트 예정
- 업비트 +- 정리 및 등락폭 디테일 잡기
- 사전 기능 key와 value 바꿔서 한눈에 보이도록 정리.
- 날씨 매일 7시에 자동으로 보내도록 변경.
- 모듈 정- 승갑이와 의견나누기.
- .env로 아이디, 비밀번호 숨기기
- 금융지수 개발
  나스닥
  코스피
  코스닥
  s&p500
  달러환율
  금값
  원유
  VTI
  단기채권
  장기채권
- 비즈니스 모델 기획 => 예시 하루 이용료 1트론
- 바이낸스 개발
- 빗썸 개발
- 계산 기능 추가 => 예시 계산 2 이더리움 => 300만원
- 도미, 가스, 롱숏, 공포, 실검(signal.bz), 국제 지수(네이버증권)

## Done

- 날씨 카카오 링크로 변경 => 포멧은 그림있는거로 하면 좋겠음. - 22.7.3

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
