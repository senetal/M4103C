var controler = {};

controler.init = function(){
	view.clear_zone_saisie();
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

controler.ajouter_recherche = function(){
	var rech = view.get_zone_saisie();
	view.clear_zone_saisie();
	model.ajouter_recherche(rech);
}

controler.supprimer_recherche = function(e){
	model.supprimer_recherche(e);
}

controler.selectionner_recherche = function(e){
	model.selectionner_recherche(e);
}

//A TESTER ET FINIR
controler.rechercher_nouvelles = function(){
	view.clear_resultats();
	view.show_wait();
	model.rechercher_nouvelles(view.get_element('#zone_saisie'));
}

controler.maj_resultats = function(res){
	view.hide_wait();
	model.maj_resultats(res,view.get_element("#resultats"));
}

controler.sauver_nouvelle = function(e){
	model.sauver_nouvelle(view.get_element(e));
}

controler.supprimer_nouvelle = function(e){
	model.supprimer_nouvelle(view.get_element(e));
}

controler.get_element = function(e){
	return view.get_element(e);
}
