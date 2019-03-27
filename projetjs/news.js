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


function selectionner_recherche(e)
{
	recherche_courante=e.innerHTML;
	$("#zone_saisie").val(recherche_courante);
}


function init()
{
	$("#zone_saisie").val('');
	cookie_rech=$.cookie('recherches');
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


function rechercher_nouvelles()
{
	$("#resultats").val('');
	$("#wait").show(0);
	$.get('search.php?data='+$("#zone_saisie").val(),maj_resultats)
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
	var objet;
	console.log($(e).parent());
	objet.titre = $(e).parent("a").html();
	objet.url = $(e).parent("a").attr("href");
	objet.date = $(e).parent("span:first-child").html();
}


function supprimer_nouvelle(e)
{

}

function setCookie(cname, cvalue, exdays) {
	$.cookie(cname,cvalue,{expires:exdays});
}

function getCookie(cname) {
	return $.cookie(cname);
}
