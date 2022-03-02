// IE11対策として、pictureタグのpolyfillを定義
import picturefill from 'picturefill';
// IE11でのアクセス時、html要素に'ua-ie'クラスを付与
import uaIE from './utils/ua-ie';

console.log($('fugafuga'));
