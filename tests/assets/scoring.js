/* Правило подсчёта тестов semenyuk.pro/tests/: ответы → баллы → уровень роли → код профиля → адрес страницы результата.
   Тест позиций считается по своему правилу — блок «тест позиций» ниже.
   Записано только здесь. Им пользуются страница (tests.js, profile.js — через window.TestScoring)
   и сборка tools/tests-build.mjs (через require) — поэтому браузер не может выдать код,
   для которого сборка не сделала страницу. */
(function(root){
'use strict';

/* Балл за ответ: главный выбор и второй выбор в одной ситуации. */
var MAIN=2,SECOND=1;

/* ans — [{m: индекс буквы главного выбора, s: индекс второго}]; пропуск — null или -1. */
function scoresOf(ans){var s=[0,0,0,0];ans.forEach(function(a){if(!a)return;if(a.m>=0)s[a.m]+=MAIN;if(a.s>=0)s[a.s]+=SECOND});return s}

/* Уровень роли по баллам: ведущая (≥ hi), рабочая (≥ lo), слабая. */
function levelOf(T,v){return v>=T.hi?'lead':(v>=T.lo?'mid':'weak')}

/* Код: ведущая роль — большая буква, рабочая — маленькая, слабая — прочерк. */
function codeOf(T,s){var L=T.letters;return s.map(function(v,i){var l=levelOf(T,v);return l==='lead'?L[i]:(l==='mid'?L[i].toLowerCase():'-')}).join('')}

/* Уровень роли по символу кода — обратное к codeOf. */
function levelOfChar(ch){return ch==='-'?'weak':(ch===ch.toUpperCase()?'lead':'mid')}

/* Код в имя папки: большая буква удваивается, маленькая остаётся, прочерк — 0. «Pa-i» → «ppa0i». */
function slugOf(c){return c.split('').map(function(ch){var l=levelOfChar(ch);return l==='weak'?'0':(l==='lead'?ch.toLowerCase()+ch.toLowerCase():ch)}).join('')}

/* Баллы из ссылки правдоподобны: четыре числа в пределах шкалы, сумма — полный тест. */
function validScores(T,s){return s.length===4&&s.every(function(v){return v>=0&&v<=T.max})&&s.reduce(function(a,b){return a+b},0)===T.questions.length*(MAIN+SECOND)}

/* Все коды, которые можно получить ответами. m[i] и s[i] — сколько раз буква i была главным и вторым выбором.
   Главный и второй выбор в одной ситуации — разные буквы, такие ответы существуют, пока m[i]+s[i] ≤ числа ситуаций. */
function reachable(T){
  var n=T.questions.length,C=[],codes={};
  (function comps(total,k,acc){
    if(k===1){C.push(acc.concat(total));return}
    for(var i=0;i<=total;i++)comps(total-i,k-1,acc.concat(i));
  })(n,4,[]);
  C.forEach(function(m){C.forEach(function(s){
    for(var i=0;i<4;i++)if(m[i]+s[i]>n)return;
    codes[codeOf(T,[0,1,2,3].map(function(i){return MAIN*m[i]+SECOND*s[i]}))]=1;
  })});
  return Object.keys(codes).sort();
}

/* ---------- тест позиций (T.type==='positions'): варианты — T.positions, последний — «Автор» ----------
   В ссылке не баллы, а счёт выборов: сколько раз каждый вариант был главным и сколько вторым (2×k чисел).
   Из него получаются и баллы, и правило ничьей «чаще главным выбором». */
function isPos(T){return T.type==='positions'}
function nOpts(T){return isPos(T)?T.positions.length:T.letters.length}
function zeros(k){var a=[];for(var i=0;i<k;i++)a.push(0);return a}
function countsOf(T,ans){var k=nOpts(T),m=zeros(k),s=zeros(k);
  ans.forEach(function(a){if(!a)return;if(a.m>=0)m[a.m]++;if(a.s>=0)s[a.s]++});return m.concat(s)}
function posScores(T,st){var k=nOpts(T);return st.slice(0,k).map(function(v,i){return MAIN*v+SECOND*st[k+i]})}
/* Позиции без «Автора» по убыванию: баллы, затем число главных выборов, затем порядок в data.js. */
function posRank(T,st){var k=nOpts(T),sc=posScores(T,st),idx=[];for(var i=0;i<k-1;i++)idx.push(i);
  return idx.sort(function(a,b){return sc[b]-sc[a]||st[b]-st[a]||a-b})}
/* Результат — адрес страницы: «avtor», «geroy» или «geroy-prositel». */
function posResult(T,st){var k=nOpts(T),sc=posScores(T,st),P=T.positions;
  if(sc[k-1]>=T.authorMin)return P[k-1].key;
  var r=posRank(T,st);return sc[r[1]]>=T.secondMin?P[r[0]].key+'-'+P[r[1]].key:P[r[0]].key}
function posResults(T){var P=T.positions,k=P.length,out=[P[k-1].key];
  for(var i=0;i<k-1;i++){out.push(P[i].key);for(var j=0;j<k-1;j++)if(j!==i)out.push(P[i].key+'-'+P[j].key)}
  return out.sort()}
function validCounts(T,st){var k=nOpts(T),n=T.questions.length;
  if(st.length!==2*k||!st.every(function(v){return v>=0&&v<=n&&v===Math.floor(v)}))return false;
  var m=st.slice(0,k),s=st.slice(k),sum=function(a){return a.reduce(function(x,y){return x+y},0)};
  return sum(m)===n&&sum(s)===n&&m.every(function(v,i){return v+s[i]<=n})}

/* ---------- общий вход для страницы и сборки: что лежит в ссылке, какой результат, какая папка ---------- */
function statsOf(T,ans){return isPos(T)?countsOf(T,ans):scoresOf(ans)}
function validStats(T,st){return isPos(T)?validCounts(T,st):validScores(T,st)}
function resultOf(T,st){return isPos(T)?posResult(T,st):codeOf(T,st)}
function pageOf(T,id){return isPos(T)?id:slugOf(id)}
function results(T){return isPos(T)?posResults(T):reachable(T)}

/* Текст data.js → объект теста. Формат: JSON после строки «window.TEST=». */
function parseData(src){
  var at=src.indexOf('\nwindow.TEST=');
  if(at<0)throw new Error('в data.js нет строки «window.TEST=»');
  return JSON.parse(src.slice(at+13).trim().replace(/;$/,''));
}

var api={MAIN:MAIN,SECOND:SECOND,scoresOf:scoresOf,levelOf:levelOf,levelOfChar:levelOfChar,codeOf:codeOf,slugOf:slugOf,
  validScores:validScores,reachable:reachable,parseData:parseData,
  isPos:isPos,nOpts:nOpts,countsOf:countsOf,posScores:posScores,posRank:posRank,posResult:posResult,posResults:posResults,validCounts:validCounts,
  statsOf:statsOf,validStats:validStats,resultOf:resultOf,pageOf:pageOf,results:results};
if(typeof module==='object'&&module.exports)module.exports=api;else root.TestScoring=api;
})(this);
