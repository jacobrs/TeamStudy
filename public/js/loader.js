window.loader = setInterval(function(){
	if(document.fonts.check('14px FontAwesome')){
		document.getElementById('loading-icon').style.visibility = 'visible';
    clearInterval(window.loader);
	}
}, 500);

window.onload = function(){
  document.getElementById('curtain').className = 'animated zoomOut';
  document.getElementById('root').className = 'animated zoomIn';
}