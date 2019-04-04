var controler = {};

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

controler.init = function(){
	view.clear_zone_saisie();
	model.init();
}

//A TESTER ET FINIR
controler.rechercher_nouvelles = function(){
	view.clear_resultats();
	view.show_wait();
	model.rechercher_nouvelles();
}

controler.maj_resultats = function(res){
	view.hide_wait();
	console.log("hello maj res");
	model.maj_resultats(res);
}

controler.sauver_nouvelle = function(e){
	model.sauver_nouvelle(view.get_element(e));
}

controler.supprimer_nouvelle = function(e){
	model.supprimer_nouvelle(view.get_element(e));
}
