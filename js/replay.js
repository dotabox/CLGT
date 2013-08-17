(function(){
CAAT.Replay = function () {
        CAAT.Replay.superclass.constructor.call(this);
        return this;
    };
	
CAAT.Replay.prototype={
 send_data:function(params) {
    params = "jsonString=" + JSON.stringify(params);
    console.log(params);
    var url = "api.php";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //alert(xhr.responseText);
            console.log('saved');
        }
    }
    xhr.send(params);
},
  load_data:function(callback,url) {

        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('POST', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var jsonTexto = xhr.responseText;
                loadObj = (JSON.parse(jsonTexto));
                if (callback) {callback();}
            }
        }
        xhr.send(null);
    }
}
extend(CAAT.Replay, CAAT.Foundation.Actor);
})();
