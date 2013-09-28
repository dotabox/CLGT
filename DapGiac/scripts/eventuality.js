(function(window) {

	var namespace = window.BKGMDapGiac;

	var Eventuality = function() {};
	Eventuality.prototype = {};

	(function(Class) {

		Class.super = Object;

		Class.registry = {};

		var registry = Class.registry;

		Class.fire = function(event) {
			if (registry.hasOwnProperty(event)) {
				var registeredFunctions = registry[event];

				for (var i = 0; i < registeredFunctions.length; i += 1) {
					var handler = registeredFunctions[i];

					var func = handler.method;
					if (typeof func === 'string') {
						func = this[func];
					}
					func.apply(this, handler.parameters);
				}
			}
			return this;
		};

		Class.addEventListener = function(type, method, parameters) {

			if (arguments.length === 2) {
				parameters = [this];
			} else if (!(parameters instanceof Array)) {
				parameters = [parameters];
			}

			var handler = {
				method: method,
				parameters: parameters
			};

			if (registry.hasOwnProperty(type)) {
				registry[type].push(handler);
			} else {
				registry[type] = [handler];
			}
			return registry.length - 1;
		};

		Class.removeEventListender = function(type, methodID) {
			if (registry.hasOwnProperty(type)) {
				registry[type].splice(methodID);
			}
			return this;
		};

		return Class;
	})(Eventuality.prototype);

	namespace.Eventuality = Eventuality;

})(window);