function main(msg, sender, replier, room, useKakaoLink, useError) {
  let symbol = msg.slice(3);
  const dict_data = JSON.parse(FileStream.read('sdcard/msgbot/dict.json'));
  try {
    if (Object.keys(dict_data).indexOf(symbol) > -1) {
      symbol = dict_data[symbol];
    }
    const data = org.jsoup.Jsoup.connect('https://www.google.com/search?q=주식%20' + symbol.replace(/ /g, '%20')).get();
    const dataLength = data.select('g-card-section.N9cLBc');

    if (dataLength.length > 0) {
      data = data.select('g-card-section').get(0);
      const title = data.select('span[class=aMEhee PZPZlF]').text();

      let currentPrice = data.select('div.wGt0Bc > div.PZPZlf > span > span > span[jsname=vWLAgc]').text();
      const currency = data.select('span[jsname=T3Us2d]').text().split(' ')[0];
      const profitPrice = data.select('span[jsname=qRSVye]').text();
      let percent = data.select('span[class=jBBUv]').text();
      const priorPrice = data.select('span[jsname=wurNO]').text();
      let priorPercent = data.select('span[jsname=mHOGHd]').text();

      data = org.jsoup.Jsoup.connect('https://www.google.com/search?q=주식%20' + symbol.replace(/ /g, '%20')).get();

      const maxPrice = data.select('div[data-attrid="최고"]').text();
      const minPrice = data.select('div[data-attrid="최저"]').text();

      // percent +- 추가
      if (priorPercent !== '()') {
        if (priorPercent.indexOf('+') > -1) {
          priorPercent = priorPercent.replace('(', '(+');
        } else {
          priorPercent = priorPercent.replace('(', '(-');
        }
      }
      if (profitPrice !== '()') {
        if (profitPrice.indexOf('+') > -1) {
          percent = percent.replace('(', '(+');
        } else {
          percent = percent.replace('(', '(-');
        }
      }
      percent = percent.split(' ')[0];

      // 프리마켓 반영
      let endPrice = currentPrice;
      if (priorPrice) {
        const temp = currentPrice;
        currentPrice = priorPrice;
        endPrice = temp;
      }
      let result = '';
      result += title + '\n\n';
      result += '장전장후 가격 : ' + priorPercent + ' ' + priorPrice + ' ' + currency.replace('KRW', '원') + '\n';
      result += '💵종가 : ' + endPrice + ' ' + currency.replace('KRW', '원') + '\n';
      result += '🔽등락률 : ' + percent + profitPrice + ' ' + currency.replace('KRW', '원') + '\n';
      result += '📈📉24최고최저 : ' + maxPrice + ' | ' + minPrice + currency.replace('KRW', '원') + '\n\n';
      result += '💰현재가격 : ' + currentPrice + currency.replace('KRW', '원');

      const template_args = {
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
      };
      replier.reply(result);
      // useKakaoLink(room, replier, template_args, result);
    } else {
      let newData = org.jsoup.Jsoup.connect(
        'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=주식%20' +
          symbol.replace(/ /g, '%20')
      ).get();
      if (newData.select('span[class=stk_nm]').length > 0) {
        const title_N = newData.select('span[class=stk_nm]').text();

        const currentPrice_N = newData.select('span.spt_con > strong')[0].text();

        const percent_dummy = newData.select('span.spt_con > span.n_ch > em');
        percent_N = percent_dummy[0].text();
        const difference = percent_dummy[1].text();

        const priorPrice_N = newData.select('li.pcp > dl > dd').text();

        const maxPrice_N = newData.select('li.hp > dl > dd').text();
        const minPrice_N = newData.select('li.lp > dl > dd').text();
        let currency_N = newData.select('li.frr > dl > dd').text();
        currency_N = currency_N.split(' ')[1];

        let result = '';
        result += title_N + '\n\n';
        result += '장전장후 가격 : ' + priorPrice_N + ' ' + (currency_N || '원') + '\n';
        result += '💵종가 : ' + priorPrice_N + ' ' + (currency_N || '원') + '\n';
        result += '🔽등락률 : ' + difference + ' ' + percent_N + (currency_N || '원') + '\n';
        result +=
          '📈📉24최고최저 : ' + maxPrice_N + (currency_N || '원') + ' | ' + minPrice_N + (currency_N || '원') + '\n\n';
        result += '💰현재가격 : ' + currentPrice_N + ' ' + ((currency_N && currency_N.replace('KRW', '원')) || '원');
        const template_args_N = {
          template_id: 77842,
          template_args: {
            title: title_N,
            currentPrice: currentPrice_N,
            currency: currency_N,
            percent: percent_N,
            endPrice: priorPrice_N,
            maxPrice: maxPrice_N,
            minPrice: minPrice_N,
            profitPrice: difference,
          },
        };
        replier.reply(result);
        // useKakaoLink(room, replier, template_args_N, result);
      }
    }
  } catch (e) {
    // replier.reply('에러가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    useError(msg, sender, room, e);
  }
}

exports.ApiService = main;
