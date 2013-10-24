/**Charge de façon asynchrone une ressource via XHR
 * @param url {String}
 * @param onload {Function}
 * @returns {XmlHttpRequest}
 */
function loadContent(url, onload) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {onload(xhr);};
	xhr.send();
	
	return xhr;
}

/** Charge de façon asynchrone une ressource contenu dans l'extension
 * @param filePath {String} Le chemin du fichier à charger
 * @param onload {Function} La fonction à appeller lorsque la ressource est chargée
 * @returns {XmlHttpRequest}
 */
function loadAppContent(filePath, onload) {
	return loadContent(chrome.extension.getURL(filePath), onload);
}

/** Injecte un script de l'extension dans la page. Le script est executé
 * à l'injection dans le contexte de page
 * @param filename
 * @param onload {Function}
 */
function injectScript(filename, onload) {
	var s = document.createElement("script");
	s.src = chrome.extension.getURL(filename);
	s.type	= "text/javascript";
	if (onload) s.onload = onload;
	(document.head||document.documentElement).appendChild(s);
};

function executeScriptOnPage(textScript) {
	var s = document.createElement("script");
	s.type	= "text/javascript";
	s.textContent = textScript;
	(document.head||document.documentElement).appendChild(s);
}

function injectStyle(filename) {
	var s = document.createElement("link");
	s.href	= chrome.extension.getURL(filename);
	s.rel	= "Stylesheet";
	s.type	= "text/css";
	(document.head||document.documentElement).appendChild(s);
}

function getRelativeLocation() {
	return /^(.+\/)([^\/])*$/.exec(location.href)[1];
}