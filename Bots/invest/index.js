const env = JSON.parse(FileStream.read('sdcard/msgbot/env.json'));
const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient(env['KAKAO_CLIENT_KEY'], 'https://developers.kakao.com');
Kakao.login(env['KAKAO_ID'], env['KAKAO_PASSWORD']); // 카카오 계정 아이디와 비밀번호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));

  const str_split_Arr = msg.split(' ');
  let market = str_split_Arr[0],
    target = str_split_Arr[1];
  if (sender === '양용기') return;
  if (market == '주식') {
    try {
      if (Object.keys(dict_data).indexOf(target) > -1) {
        target = dict_data[target];
      }
      let data = org.jsoup.Jsoup.connect('https://www.google.com/search?q=주식%20' + target.replace(/ /g, '%20')).get();
      const dataLength = data.select('g-card-section.N9cLBc');
      // replier.reply('점검중');
      // replier.reply(dataLength.length);

      // if (dataLength.length > 0) {

      // const imageUrl = data.select('div[class=gyEfO JlxBoc]').text();
      data = data.select('g-card-section').get(0);
      const title = data.select('span[class=aMEhee PZPZlF]').text();

      let currentPrice = data.select('div.wGt0Bc > div.PZPZlf > span > span > span[jsname=vWLAgc]').text();

      const currency = data.select('span[jsname=T3Us2d]').text();

      const profitPrice = data.select('span[class=WlRRw IsqQVc fw-price-dn] > span[jsname=qRSVye]').text();

      const percent = data.select('span[class=jBBUv]').text();

      const priorPrice = data.select('span[jsname=wurNO]').text();

      const priorPercent = data.select('span[jsname=mHOGHd]').text();

      data = org.jsoup.Jsoup.connect('https://www.google.com/search?q=주식%20' + target.replace(/ /g, '%20')).get();

      const maxPrice = data.select('div[data-attrid="최고"]').text();
      const minPrice = data.select('div[data-attrid="최저"]').text();

      // 프리마켓 반영
      let endPrice = currentPrice;
      if (priorPrice) {
        const temp = currentPrice;
        currentPrice = priorPrice;
        endPrice = temp;
      }
      Kakao.sendLink(
        room,
        {
          template_id: 77842,
          template_args: {
            title: title,
            currentPrice: currentPrice,
            currency: currency,
            profitPrice: profitPrice,
            percent: percent,
            priorPrice: priorPrice,
            priorPercent: priorPercent,
            maxPrice: maxPrice,
            minPrice: minPrice,
            endPrice: endPrice,
            // imageUrl: imageUrl,
            // dataLength: dataLength,
          },
        },
        'custom'
      );

      // } else {
      //   replier.reply('네이버 ' + dataLength.text());
      //   let newData = org.jsoup.Jsoup.connect(
      //     'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=주식%20' +
      //       target.replace(/ /g, '%20')
      //   ).get();

      //   const title = newData.select('span[class=stk_nm]').text();

      //   const currentPrice = newData.select('span.spt_con > strong')[0].text();

      //   const percent = newData.select('span.spt_con > span.n_ch > em')[0].text();

      //   const priorPrice = newData.select('li.pcp > dl > dd').text();

      //   const maxPrice = newData.select('li.hp > dl > dd').text();
      //   const minPrice = newData.select('li.lp > dl > dd').text();
      //   Kakao.sendLink(
      //     room,
      //     {
      //       template_id: 77842,
      //       template_args: {
      //         title: title,
      //         currentPrice: currentPrice,
      //         percent: percent,
      //         prior: priorPrice,
      //         maxPrice: maxPrice,
      //         minPrice: minPrice,
      //       },
      //     },
      //     'custom'
      //   );
      // }
    } catch (e) {}
  }
}
