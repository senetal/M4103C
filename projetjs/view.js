var view = {};

view.get_saisie = function(){
	return $("#zone_saisie").val();
}

view.get_recherches_stockees = function(){
	return $("#recherches-stockees");
}

view.get_element = function(e){
	return $(e);
}

view.show_wait = function(){
	$('#wait').show(0);
}

view.hide_wait = function(){
	$('#wait').hide(0);
}
