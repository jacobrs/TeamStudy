window.loader = setInterval(function(){
	console.log(document.fonts.check('14px FontAwesome'));
	if(document.fonts.check('14px FontAwesome')){
		document.getElementById('loading-icon').style.visibility = 'visible';
    clearInterval(window.loader);
	}
}, 500);

window.onload = function(){
  document.getElementById('curtain').className = 'animated zoomOut';
  document.getElementById('root').className = 'animated zoomIn';
}