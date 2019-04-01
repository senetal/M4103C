var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

//APPEL A maj_resultats NON FONCTIONNEL

function setCookie(cname, cvalue, exdays) {
	$.cookie(cname,cvalue,{expires:exdays});
}

function getCookie(cname) {
	return $.cookie(cname);
}
