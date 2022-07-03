// const { KakaoLinkClient: KakaoLinkClient } = require('kakaolink');
// const Kakao = new KakaoLinkClient(KAKAO_CLIKENT_KEY, 'https://developers.kakao.com');
// Kakao.login(KAKAO_ID, KAKAO_PASSWORD); // 카카오 계정 아이디와 비밀번호
const { KakaoLinkClient } = require('kakaolink');

const Kakao = new KakaoLinkClient('806c389b4ca349f0748523283881e63d', 'https://developers.kakao.com');
Kakao.login('dongwon@likelion.org', 'ehddnjs89!'); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

  const str_split_Arr = msg.split(' ');
  const market = str_split_Arr[0];
  let target = str_split_Arr[1];
  if (sender === '양용기') return;
  if (market == '주식') {
    try {
      if (Object.keys(dict_data).indexOf(target) > -1) {
        target = dict_data[target];
      }
      let data = org.jsoup.Jsoup.connect(`https://www.google.com/search?q=주식%20${target.replace(/ /g, '%20')}`).get();
      /*
      var image_url = org.jsoup.Jsoup.connect(
        'https://www.google.com/search?q=' +
          target +
          '&tbm=isch&source=iu&ictx=1&vet=1&fir=g5jEFZm-CqPVkM%252CQA-iVW8NtZ45yM%252C_&usg=AI4_-kRTrYTU4b2yOUtsz6SZrkIUD-VpiQ&sa=X&ved=2ahUKEwiG2J-bu5j4AhUZet4KHY7yDyQQ_B16BAgHEAI#imgrc=g5jEFZm-CqPVkM' +
          target.replace(/ /g, '%20')
      ).get();
      */
      // image_url = image_url.select('img[jsname=HiaYvf]').attr('src');
      const image_url = data.select('div[class=gyEfO JlxBoc]').text();
      // var image_url = data.select('div.JlxBoc > div.PZPZlf').attr('data-lpage');
      data = data.select('g-card-section').get(0);

      const title = data.select('span[class=aMEhee PZPZlF]').text();
      let current_price = data.select('span[jsname=vWLAgc]').text();
      const currency = data.select('span[jsname=T3Us2d]').text();
      const profit = data.select('span[jsname=qRSVye]').text();
      const percent = data.select('span[class=jBBUv]').text();
      const prior_price = data.select('span[jsname=wurNO]').text();
      const prior_percent = data.select('span[jsname=mHOGHd]').text();
      // data = data.select('g-card-section').get(3);
      const max_price = data.select('span[data-attrid=최고]').text();
      const min_price = data.select('span[data-attrid=최저]').text();
      let end_price;
      if (prior_price) {
        const temp = current_price;
        current_price = prior_price;
        end_price = temp;
      }
      // tsuid17
      Kakao.sendLink(
        room,
        {
          template_id: 77842,
          template_args: {
            title,
            current_price,
            currency,
            profit,
            percent,
            prior: prior_price,
            prior_percent,
            max_price,
            min_price,
            image_url,
            end_price,
          },
        },
        'custom',
      );
    } catch (e) {
      replier.reply(e);
    }
  }
}
