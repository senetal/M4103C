var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];

model.ajouter_recherche = function(rech){
	if(model.recherches.indexOf(rech)==-1){
		model.recherches.push(rech);
		view.get_recherches_stockees().append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'
		+rech
		+'</label><img src="croix30.jpg" class="icone-croix" onclick="supprimer_recherche(this)"/> </p>'
		);
	}
	model.setCookie('model.recherches',JSON.stringify(model.recherches),1000);
}

model.supprimer_recherche = function(e)
{
	model.recherches.splice(model.recherches.indexOf(e.innerHTML));
	e.parentNode.remove();
	model.setCookie('model.recherches',JSON.stringify(model.recherches),1000);
}

model.selectionner_recherche = function(e)
{
	model.recherche_courante=e.innerHTML;
	view.set_zone_saisie(model.recherche_courante);
	var rech = model.getCookie(model.recherche_courante);
	if (rech) model.recherche_courante_news = JSON.parse(rech);
	for (var i = 0; i < model.recherche_courante_news.length; i++) {
		maj_resultats(JSON.stringify(model.recherche_courante_news));
	}
}

model.init = function()
{
	var cookie_rech=model.getCookie('model.recherches');
	if(cookie_rech){
		model.recherches=JSON.parse(cookie_rech);
		for (var i=0;i<model.recherches.length;i++) {
			view.get_recherches_stockees().append('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'
			+model.recherches[i]
			+'</label><img src="croix30.jpg" class="icone-croix" onclick="controler.supprimer_recherche(this)"/> </p>'
			);
		}
	}
}

//A TESTER ET FINIR
model.rechercher_nouvelles = function()
{
	var rech = model.getCookie(model.recherche_courante);
	if(rech){
		model.recherche_courante_news=JSON.parse(rech);
		controler.maj_resultats(rech);
	}
	else {
		$.get('search.php?data='+$('#zone_saisie').val(),model.maj_resultats);
	}
}

model.maj_resultats = function(res)
{
	var result=JSON.parse(res);
	for(var i=0;i<result.length;i++){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' //elever le $.resultat
		+result[i].url
		+'" target="_blank">'
		+result[i].titre
		+'</a><span class="date_news">'
		+format(result[i].date)
		+'</span><span class="action_news" onclick="controler.sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p>'
		);
	}
}

model.sauver_nouvelle = function(e)
{
	e.html('<img src="disk15.jpg"/>')
	.attr("onclick","supprimer_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];

	objet.titre = a.firstChild;
	objet.url = a.getAttribute("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	if (model.recherche_courante_news.indexOf(objet) == -1) {
		model.recherche_courante_news.push(objet);
	}
	model.setCookie(model.recherche_courante,JSON.stringify(model.recherche_courante_news),1000);
}

model.supprimer_nouvelle = function(e)
{
	e.html('<img src="horloge15.jpg"/>')
	.attr("onclick","controler.sauver_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];

	objet.titre = a.firstChild;
	objet.url = a.getAttribute("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	model.recherche_courante_news.splice(model.recherche_courante_news.indexOf(objet));

	model.setCookie(model.recherche_courante,JSON.stringify(model.recherche_courante_news),1000);
}

model.setCookie = function(cname, cvalue, exdays) {
	$.cookie(cname,cvalue,{expires:exdays});
}

model.getCookie = function(cname) {
	return $.cookie(cname);
}
