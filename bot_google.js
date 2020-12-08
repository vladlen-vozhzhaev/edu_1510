// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){ //ОТ min до max не включая max
    return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0,words.length)];

let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[1]; //Кнопка поиска в Google

if (btnK!=undefined){ // Проверка существования кнопки поиска google (Она существует только на главной странице google)
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(function(){
        googleInput.value = googleInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if (location.hostname== "www.google.com"){
    site = getCookie("site");
    let pageNum = document.querySelector(".YyVfkd").innerText;
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes(site)){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum<10){
        setTimeout(()=>{pnnext.click();},1000)
    }else if (!linkIsFound){
        location.href = "https://www.google.com/";
    }
}else{
    if(getRandom(1,11) > 8 ) setTimeout(()=>{location.href = "https://www.google.com/";},3000); // С вероятностью в 20% мы переходим на сайт google
    let links = document.links; //Собираем коллекцию всех ссылок сайта
    setInterval(()=>{
        let index = getRandom(0,links.length); // Индекс из массива links
        let link = links[index]; // Выбор ссылки по индексу из массива links
        if (link.href.includes(location.hostname)){ // Проверяем что ссылка ведёт нас на тот же сайт на котором мы находимся
            setTimeout(()=>{link.click();},3000);
        }
    },5000);
}
