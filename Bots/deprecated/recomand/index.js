let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let b = [
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=10%EB%8C%80%20%EB%82%A8%EC%84%B1%20%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?sm=mtb_hty.top&where=m&oquery=10%EB%8C%80+%EB%82%A8%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84&tqi=U3ay%2Blp0JWwssCPBKqVsssssswC-247452&query=10%EB%8C%80+%EC%97%AC%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?sm=mtb_hty.top&where=m&oquery=10%EB%8C%80+%EC%97%AC%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84&tqi=U3a3psprv2hssEPXrOwssssss7V-425451&query=20%EB%8C%80+%EC%97%AC%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=20%EB%8C%80%20%EB%82%A8%EC%84%B1%20%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=30%EB%8C%80%20%EC%97%AC%EC%84%B1%20%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=30%EB%8C%80+%EB%82%A8%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=40%EB%8C%80%20%EC%97%AC%EC%84%B1%20%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=40%EB%8C%80+%EB%82%A8%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=50%EB%8C%80%20%EC%9D%B4%EC%83%81%20%EC%97%AC%EC%84%B1%20%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
  'https://search.naver.com/search.naver?ie=utf8&where=m&sm=mtb_gmu&mra=R1VN&query=50%EB%8C%80+%EB%82%A8%EC%84%B1+%EC%9D%8C%EC%95%85%EC%88%9C%EC%9C%84',
];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
    if (msg.includes('노래추천') || msg.includes('음악추천')) {
      var ran1 = b[(Math.random() * b.length) | 0];

      var site = org.jsoup.Jsoup.connect(ran1);

      var ran2 = a[(Math.random() * a.length) | 0];

      var ran3 = ran2 + 1;

      var mn = site.get().select('span.tit_area').get(ran2).text();

      var sn = site
        .get()
        .select(
          '#main_pack > section.sc_new.sp_pmusic._au_musicsympathy_collection._prs_amu_cha > div > div:nth-child(3) > ul > li:nth-child(' +
            ran3 +
            ') > div > div > div > div > span:nth-child(1)'
        )
        .get(0)
        .text();

      var si = site.get().select('a.tit').get(ran2).attr('href');

      replier.reply('[이 노래 어떠세요?]\n' + '-'.repeat(44) + '\n' + mn + ' - ' + sn + '\n\n' + si);
    }
  } catch (e) {
    replier.reply('오류에 걸렸습니다. 제작자에게 문의해 주세요.');
  }
}
