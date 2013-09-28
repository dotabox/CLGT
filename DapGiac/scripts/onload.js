(function(window) {

	var namespace = window.BKGMDapGiac;

	var onloadFunctionList = [
		//namespace.loadCanvas,
		namespace.init
	];

	window.onload = function() {
		for (var i = 0; i < onloadFunctionList.length; i++) {
			onloadFunctionList[i]();
		}
	};

})(window);