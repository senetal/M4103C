var controler = {};

controler.init = function(){
	controler.clear_zone_saisie();
	view.get_element('#zone_saisie').autocomplete({source : model.available_tags});
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
	var rech = view.get_saisie();
	controler.clear_zone_saisie();
	model.ajouter_recherche(rech,view.get_recherches_stockees());
}

controler.supprimer_recherche = function(e){
	model.supprimer_recherche(e);
}

controler.selectionner_recherche = function(e){
	model.selectionner_recherche(e);
}

controler.rechercher_nouvelles = function(){
	controler.clear_resultats();
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

controler.set_zone_saisie = function(content){
	view.get_element('#zone_saisie').val(content);
}

controler.clear_zone_saisie = function(){
	view.get_element('#zone_saisie').val('');
}

controler.clear_resultats = function(){
	view.get_element('#resultats').html('');
}

controler.lancer_recherche = function(t,e){
	if(e.key=="Enter") controler.rechercher_nouvelles();
}
