var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];
model.available_tags=[]

model.ajouter_recherche = function(rech,rech_stockees){
	if(model.recherches.indexOf(rech)==-1){
		model.recherches.push(rech);
		rech_stockees.append('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'
		+rech
		+'</label><img src="croix30.jpg" class="icone-croix" onclick="controler.supprimer_recherche(this)"/> </p>'
		);
	}
	//model.setCookie('model.recherches',JSON.stringify(model.recherches),1000);
	model.sendStore('model.recherches',JSON.stringify(model.recherches));
}

model.supprimer_recherche = function(e)
{
	model.recherches.splice(model.recherches.indexOf(e.innerHTML));
	e.parentNode.remove();
	//model.setCookie('model.recherches',JSON.stringify(model.recherches),1000);
	model.sendStore('model.recherches',JSON.stringify(model.recherches));
}

model.selectionner_recherche = function(e)
{
	model.recherche_courante=e.innerHTML;
	controler.set_zone_saisie(model.recherche_courante);
	//var rech = model.getCookie(model.recherche_courante);
	var rech = model.getStore(model.recherche_courante);
	if (rech) model.recherche_courante_news = JSON.parse(rech);
	for (var i = 0; i < model.recherche_courante_news.length; i++) {
		controler.maj_resultats(JSON.stringify(model.recherche_courante_news));
	}
}

model.rechercher_nouvelles = function(zone_saisie)
{
	// var rech = model.getCookie(model.recherche_courante);
	// if(rech !== undefined){
	// 	try{
	// 	model.recherche_courante_news=JSON.parse(rech);
	// }catch(e){
	// 	console.log(rech);
	// }
	// 	controler.maj_resultats(rech);
	// }
	// else {
		model.available_tags.push(zone_saisie.val());
		$.get('search.php?data='+zone_saisie.val(),controler.maj_resultats);
	//}
}

model.maj_resultats = function(res,resultat)
{
	var result=[];
	try{
		result=JSON.parse(res);
		result.sort(function(a,b){
			if(format(a.date)<format(b.date)) return -1;
			if(format(a.date)>format(b.date)) return 1;
			return 0;
		});
	}catch(e){}
	for(var i=0;i<result.length;i++){
		var img='horloge';
		//if(model.recherche_courante_news.indexOf(result[i])!=-1) img='disk';
		resultat.append('<p class="titre_result"><a class="titre_news" href="' //elever le $.resultat
		+result[i].url
		+'" target="_blank">'
		+result[i].titre
		+'</a><span class="date_news">'
		+format(result[i].date)
		+'</span><span class="action_news" onclick="controler.sauver_nouvelle(this)"><img src="'+img+'15.jpg"/></span></p>'
		);
	}
}

model.sauver_nouvelle = function(e)
{
	e.html('<img src="disk15.jpg"/>')
	.attr("onclick","controler.supprimer_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];
	objet.titre = a.html();
	objet.url = a.attr("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	if (model.recherche_courante_news.indexOf(objet) == -1) {
		model.recherche_courante_news.push(objet);
	}
	//model.setCookie(model.recherche_courante,JSON.stringify(model.recherche_courante_news),1000);
	model.sendStore(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
}

model.supprimer_nouvelle = function(e)
{
	e.html('<img src="horloge15.jpg"/>')
	.attr("onclick","controler.sauver_nouvelle(this)");

	var objet = {titre:'',url:'',date:''};
	var a = $(e).parent().children("a")[0];

	objet.titre = a.html();
	objet.url = a.attr("href");
	objet.date = $(e).parent().children("span")[0].innerHTML;

	model.recherche_courante_news.splice(model.recherche_courante_news.indexOf(objet));

	//model.setCookie(model.recherche_courante,JSON.stringify(model.recherche_courante_news),1000);
	model.sendStore(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
}

// COOKIES
// model.setCookie = function(cname, cvalue, exdays) {
// 	$.cookie(cname,cvalue,{expires:exdays});
// }
//
// model.getCookie = function(cname) {
// 	return $.cookie(cname);
// }

// WEBSTORAGE

model.sendStore = function(cname, cvalue){
	localStorage.setItem(cname,cvalue);
}

model.getStore = function(cname){
	return localStorage.getItem(cname);
}
