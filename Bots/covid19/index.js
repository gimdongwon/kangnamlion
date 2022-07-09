const scriptName = 'covid';
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith('코로나')) {
    if (msg == '코로나') return replier.reply('[한국]\n' + Covid(country['한국']));
    else {
      if (country[msg.substr(4)] == undefined)
        return replier.reply(
          msg.substr(4) +
            '정보를 불러올 수 없는 국가입니다!' +
            '\u200b'.repeat(500) +
            '\n\n국가이름:\n\n' +
            Object.keys(country).sort().join('\n\n')
        );
      return replier.reply('[' + msg.substr(4) + ']\n' + Covid(country[msg.substr(4)]));
    }
  }
}

/*
 * © 2021 kaan, All rights reserved.
 * 게시글에 ❤와 댓글은 큰 힘이 됩니다🔥
 * https://blog.naver.com/junyoungbae02/222382072147
 * 알림구조 변경 대응소스 출처 : https://cafe.naver.com/nameyee/38636
 */

function Covid(country) {
  /*
   * 데이터 출처: https://coronaboard.kr/
   */
  let data = JSON.parse(
    org.jsoup.Jsoup.connect('https://coronaboard.kr/generated/' + country + '.json')
      .ignoreContentType(true)
      .get()
      .text()
  );
  for (i in data) data[i] = data[i].reverse();
  return (
    '· 확진자: ' +
    data['confirmed_acc'][0] +
    ' (+' +
    data['confirmed'][0] +
    ')\n· 사망자: ' +
    data['death_acc'][0] +
    ' (+' +
    data['death'][0] +
    ')\n· 완치: ' +
    data['released_acc'][0] +
    ' (+' +
    data['released'][0] +
    ')'
  );
}

const country = {
  '미국': 'US',
  '영국': 'GB',
  '한국': 'KR',
  '일본': 'JP',
  '중국': 'CN',
  '프랑스': 'FR',
  '러시아': 'RU',
  '독일': 'DE',
  '인도': 'IN',
  '브라질': 'BR',
  '터키': 'TR',
  '이탈리아': 'IT',
  '아르헨티나': 'AR',
  '스페인': 'ES',
  '콜롬비아': 'CO',
  '이란': 'IR',
  '폴란드': 'PL',
  '멕시코': 'MX',
  '우크라이나': 'UA',
  '페루': 'PE',
  '인도네시아': 'ID',
  '남아프리카 공화국': 'ZA',
  '체코': 'CZ',
  '네덜란드': 'NL',
  '칠레': 'CL',
  '캐나다': 'CA',
  '필리핀': 'PH',
  '이라크': 'IQ',
  '루마니아': 'RO',
  '스웨덴': 'SE',
  '벨기에': 'BE',
  '파키스탄': 'PK',
  '포르투갈': 'PT',
  '이스라엘': 'IL',
  '헝가리': 'HU',
  '방글라데시': 'BD',
  '요르단': 'JO',
  '세르비아': 'RS',
  '스위스': 'CH',
  '오스트리아': 'AT',
  '말레이시아': 'MY',
  '아랍에미레이트': 'AE',
  '네팔': 'NP',
  '레바논': 'LB',
  '모로코': 'MA',
  '사우디아라비아': 'SA',
  '에콰도르': 'EC',
  '불가리아': 'BG',
  '그리스': 'GR',
  '벨라루스': 'BY',
  '슬로바키아': 'SK',
  '카자흐스탄': 'KZ',
  '파나마': 'PA',
  '볼리비아': 'BO',
  '파라과이': 'PY',
  '크로아티아': 'HR',
  '튀니지': 'TN',
  '조지아': 'GE',
  '아제르바이잔': 'AZ',
  '코스타리카': 'CR',
  '쿠웨이트': 'KW',
  '팔레스타인': 'PS',
  '우루과이': 'UY',
  '도미니카 공화국': 'DO',
  '덴마크': 'DK',
  '리투아니아': 'LT',
  '에티오피아': 'ET',
  '이집트': 'EG',
  '아일랜드': 'IE',
  '과테말라': 'GT',
  '몰도바': 'MD',
  '슬로베니아': 'SI',
  '바레인': 'BH',
  '온두라스': 'HN',
  '베네수엘라': 'VE',
  '아르메니아': 'AM',
  '오만': 'OM',
  '카타르': 'QA',
  '보스니아 헤르체고비나': 'BA',
  '스리랑카': 'LK',
  '리비아': 'LY',
  '케냐': 'KE',
  '나이지리아': 'NG',
  '태국': 'TH',
  '북마케도니아': 'MK',
  '쿠바': 'CU',
  '미얀마': 'MM',
  '라트비아': 'LV',
  '알바니아': 'AL',
  '에스토니아': 'EE',
  '알제리': 'DZ',
  '노르웨이': 'NO',
  '코소보': 'XK',
  '키르기스스탄': 'KG',
  '우즈베키스탄': 'UZ',
  '몬테네그로': 'ME',
  '잠비아': 'ZM',
  '가나': 'GH',
  '핀란드': 'FI',
  '카메룬': 'CM',
  '아프가니스탄': 'AF',
  '엘살바도르': 'SV',
  '키프로스': 'CY',
  '모잠비크': 'MZ',
  '룩셈부르크': 'LU',
  '몰디브': 'MV',
  '싱가포르': 'SG',
  '몽골': 'MN',
  '나미비아': 'NA',
  '보츠와나': 'BW',
  '우간다': 'UG',
  '자메이카': 'JM',
  '코트디부아르': 'CI',
  '세네갈': 'SN',
  '마다가스카르': 'MG',
  '짐바브웨': 'ZW',
  '수단': 'SD',
  '앙골라': 'AO',
  '말라위': 'MW',
  '콩고민주공화국': 'CD',
  '캄보디아': 'KH',
  '몰타 공화국': 'MT',
  '카보베르데': 'CV',
  '호주': 'AU',
  '르완다': 'RW',
  '레위니옹': 'RE',
  '시리아': 'SY',
  '가봉': 'GA',
  '트리니다드 토바고': 'TT',
  '프랑스령 기아나': 'GF',
  '기니': 'GN',
  '마요트': 'YT',
  '모리타니': 'MR',
  '프랑스령 폴리네시아': 'PF',
  '에스와티니': 'SZ',
  '기니아나': 'GY',
  '과들루프': 'GP',
  '파푸아뉴기니': 'PG',
  '수리남': 'SR',
  '아이티': 'HT',
  '소말리아': 'SO',
  '말리': 'ML',
  '안도라': 'AD',
  '토고': 'TG',
  '부르키나파소': 'BF',
  '타지키스탄': 'TJ',
  '벨리즈': 'BZ',
  '퀴라소': 'CW',
  '마르티니크': 'MQ',
  '바하마': 'BS',
  '홍콩': 'HK',
  '콩고공화국': 'CG',
  '세이셸': 'SC',
  '지부티': 'DJ',
};