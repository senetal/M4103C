var view = {};

view.get_zone_saisie = function(){
	return $("#zone_saisie").val();
}

view.get_recherches_stockees = function(){
	return $("#recherches-stockees");
}

view.get_element = function(e){
	return $(e);
}

view.set_zone_saisie = function(e){
	$('#zone_saisie').val(e);
}

view.show_wait = function(){
	$('#wait').show(0);
}

view.hide_wait = function(){
	$('#wait').hide(0);
}

view.clear_zone_saisie = function(){
	$('#zone_saisie').val('');
}

view.clear_resultats = function(){
	$('#resultats').html('');
}
