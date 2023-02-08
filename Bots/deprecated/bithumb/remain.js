const upbit = (room, sdr, cmd) => {
  const useError = Bridge.getScopeOf('useError').replyError;

  try {
    // 업비트 가격처리

    // kakao Feed
    let tmp = {
      hdr: '업비트 ' + sym,
      img: imgUrl.upbitLogo,
      h1: '📈최고가',
      b1: '(' + hPct + '%) ' + hPrice + moneyExp,
      h2: '📉최저가',
      b2: '(' + lPct + '%) ' + lPrice + moneyExp,
      h3: '📊거래량',
      b3: volume,
      h4: '💵김프',
      b4: getKimp(s, kPrice),
      h5: updw + '등락',
      b5: '(' + cPct + '%) ' + change + moneyExp,
      h0: '💰현재가',
      b0: cPrice + moneyExp,
      link: 'exchange?code=CRIX.UPBIT.' + sym,
    };

    return sendKakao(room, tmp, templateId.upbit);
  } catch (e) {}
};
const sendKakao = (room, tmp, tmpId) => {
  let output = '';
  if (kalingOn) {
    if (!Kakao.isLogin) {
      Kakao.login(kakaoInfo);
    }
    Kakao.sendLink(
      room,
      {
        link_ver: '4.0',
        template_id: tmpId,
        template_args: tmp,
      },
      'custom',
      true
    ).catch((e) => {
      kalingOn = false;
      return catchError(errTmp);
    });
  } else {
    return sendKakaoText(tmp);
  }
  return output;
};

const catchError = (errTmp) => {
  let output = botName.MainBot + ' 오류\n';
  for (let k in errTmp) {
    output += '\n' + k + ' : ' + errTmp[k];
  }
  Api.replyRoom('roomA', output);

  let errMsg = errTmp['msg'];
  if (isEmpty(errMsg)) {
    if (
      errTmp['e'] == 'JavaException: org.jsoup.HttpStatusException: HTTP error fetching URL' ||
      errTmp['e'] == 'JavaException: java.net.SocketTimeoutException: timeout'
    ) {
      errMsg = errTmp['fun'] + ' 접속 오류 발생😟';
    } else if (
      errTmp['e'] == 'JavaException: org.jsoup.UncheckedIOException: java.net.SocketTimeoutException: Read timeout'
    ) {
      errMsg = '';
    } else {
      errMsg = '알수없는 오류 발생😟';
    }
  }

  return errMsg;
};
