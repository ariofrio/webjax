// ==UserScript== 
// @name           WeBWorkJax 
// @namespace      http://riofrios.com/
// @include        *
// ==/UserScript== 

(function() {
window.unsafeWindow || (
  unsafeWindow = (function() {
    var el = document.createElement('p');
    el.setAttribute('onclick', 'return window;');
    return el.onclick();
  }())
);

// Make sure this is a WeBWork page.
if(document.querySelector("#footer #copyright a[href='http://openwebwork.sf.net/']")) {
  // Check if LaTeXMathML or plainText is selected, if not, select it.
  var plainText = document.querySelector("input[type=radio][name=displayMode][value=plainText]");
  var LaTeXMathML = document.querySelector("input[type=radio][name=displayMode][value=LaTeXMathML]");
  if(!plainText || !LaTeXMathML) return;
  if(!plainText.checked && !LaTeXMathML.checked) {
    plainText.checked = true;
    plainText.form.submit();
  }

  // Load MathJax. <http://www.mathjax.org/docs/1.1/dynamic.html>
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"

  var config = 'MathJax.Hub.Startup.onload();';

  if (window.opera) {script.innerHTML = config}
  else {script.text = config}

  document.getElementsByTagName("head")[0].appendChild(script);

  // Profit.
}
})();
