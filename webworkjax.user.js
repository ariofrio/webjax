// ==UserScript== 
// @name           WeBWorKJax 
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
  // Check if plainText is selected, if not, select it.
  var plainText = document.querySelector("input[type=radio][name=displayMode][value=plainText]");
  if(!plainText) return;
  if(!plainText.checked) {
    plainText.checked = true;
    plainText.form.submit();
  }

  // Special-case Answer Previews (TODO: Put this below MathJax for performance? Find out how to parse live, dynamic math/changes.)
  var previews = document.querySelectorAll(".attemptResults td:nth-of-type(2)");
  for(var i=0; i<previews.length; i++) {
    previews[i].innerHTML = "\\(" + previews[i].innerHTML + "\\)";
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
