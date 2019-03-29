var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	var rech=$("#zone_saisie").val();
	$("#zone_saisie").val('');
	if(recherches.indexOf(rech)==-1){
		recherches.push(rech);
		$("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'
		+rech
		+'</label><img src="croix30.jpg" class="icone-croix" onclick="supprimer_recherche(this)"/> </p>'
	);
}
setCookie('recherches',JSON.stringify(recherches),1000);
}

function supprimer_recherche(e)
{
	recherches.splice(recherches.indexOf(e.innerHTML));
	e.parentNode.remove();
	setCookie('recherches',JSON.stringify(recherches),1000);
}

//APPEL A maj_resultats NON FONCTIONNEL
function selectionner_recherche(e)
{
	recherche_courante=e.innerHTML;
	$("#zone_saisie").val(recherche_courante);
	var rech = getCookie(recherche_courante);
	if (rech) recherche_courante_news = JSON.parse(rech);
	for (var i = 0; i < recherche_courante_news.length; i++) {
		maj_resultats(JSON.stringify(recherche_courante_news));
	}
}


function init()
{
	$("#zone_saisie").val('');
	var cookie_rech=$.cookie('recherches');
	if(cookie_rech){
		recherches=JSON.parse(cookie_rech);
		for (var i=0;i<recherches.length;i++) {
			$("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'
			+recherches[i]
			+'</label><img src="croix30.jpg" class="icone-croix" onclick="supprimer_recherche(this)"/> </p>'
		);
		}
	}
}

//A TESTER ET FINIR
function rechercher_nouvelles()
{
	$("#resultats").html('');
	$("#wait").show(0);
	var rech = getCookie(recherche_courante);
	if(rech){
		recherche_courante_news=JSON.parse(rech);
		maj_resultats(rech);
	}
	else {
		$.get('search.php?data='+$('#zone_saisie').val(),maj_resultats);
	}
}


function maj_resultats(res)
{
	$("#wait").hide(0);
	var result=JSON.parse(res);
	for(var i=0;i<result.length;i++){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="'
		+result[i].url
		+'" target="_blank">'
		+result[i].titre
		+'</a><span class="date_news">'
		+format(result[i].date)
		+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>'
		);
	}
}


function sauver_nouvelle(e)
{
	$(e).html('<img src="disk15.jpg"/>')
	.attr("onclick","supprimer_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];

	objet.titre = a.firstChild;
	objet.url = a.getAttribute("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	if (recherche_courante_news.indexOf(objet) == -1) {
		recherche_courante_news.push(objet);
	}
	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}


function supprimer_nouvelle(e)
{
	$(e).html('<img src="horloge15.jpg"/>')
	.attr("onclick","sauver_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];

	objet.titre = a.firstChild;
	objet.url = a.getAttribute("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	recherche_courante_news.splice(recherche_courante_news.indexOf(objet));

	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}

function setCookie(cname, cvalue, exdays) {
	$.cookie(cname,cvalue,{expires:exdays});
}

function getCookie(cname) {
	return $.cookie(cname);
}
