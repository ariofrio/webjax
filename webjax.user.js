// ==UserScript== 
// @name           WebJax 
// @namespace      http://riofrios.com/
// @match          http://*.wikipedia.org/wiki/*
// @match          http://*.wikipedia.org/w/index.php*
// ==/UserScript== 

(function() {
var do_render = false; // 1. Set up a globallish variable
var config = 'MathJax.Hub.Startup.onload();';

// 2. Go support some o' my ol' sites

if(document.location.hostname.indexOf("wikipedia.org") != -1 &&
  (document.location.pathname.indexOf("/wiki") == 0 |
   document.location.pathname.indexOf("/w/index.php") == 0)) { // 2a. Wikipedia
  var els = document.querySelectorAll("span.tex");
  for(var i=0; i<els.length; i++) {
    els[i].textContent = '\\(\\displaystyle' +
      els[i].textContent.substr(1, els[i].textContent.length - 2) + '\\)';
    // 4.2 Fractions, matrices, multilines
    // "Breaking up a long expression..." trick. Avoids overflow into sideboxes. Does not break MathJax's beautiful positioning of inline math. It's beautiful.
    els[i].style.display = "inline-block";
  }
  config +=
    'MathJax.Hub.Config({' +
      'tex2jax: {' +
        // Only process inside .tex elements.
        'ignoreClass: ".*",' +
        'processClass: "tex",' +
        // But please, do not skip <pre>, <code>, etc. That's what we have .tex for!
        'skipTags: ["script","style","textarea"],' +
      '},' +
      'TeX: {' +
        'Macros: {' +
          // 3.2 Standard functions
          'sgn: "\\\\operatorname{sgn}",' + // <http://www.latex-community.org/index.php?option=com_content&view=article&id=207%3Adefining-operators-like-sin-log-etc&catid=51%3Alatex-math-science&Itemid=112>

          // 3.6 Letter-like symbols or constants
          'alef: "\\\\aleph",' +

          // 3.10 Sets
          'O: "\\\\emptyset",' +
          'empty: "\\\\emptyset",' +

          // 3.12 Geometric
          // MATHJAX: Space between number and circ in 45^\circ looks to big.
 
          // 3.13 Logic
          'or: "\\\\vee",' +
          'and: "\\\\wedge",' +
          // MATHJAX: \overline raises up too much above letter (supposed to be identical vertical positioning as \bar).

          // 3.15 Special
          'P: "\\\\unicode{x00B6}",' + // TODO: Somehow make this look right.
          // TODO: Make \dagger and \ddager look right.

          // 4.1 Subscripts, superscripts, integrals
          // MATHJAX: \vec is not positioned properly over "c".
          // MATHJAX: \over{right,left}arrow have too much space above letter.
          // MATHJAX: \x{left,right}arrow have too little space before and after.
          // MATHJAX: \overarc not supported. (Wikipedia doesn't support it either.)
          // MATHJAX: too much space above \underbrace
          // MATHJAX: \textstyle superscript is too above; see Product (force \textstyle).
          // MATHJAX: too little space between \textstyle \int and next element.

          // 4.2 Fractions, matrices, multilines
          // MATHJAX: \begin{bmatrix} with \cdots, \vdots, \ddots, looks weird.
          // MATHJAX: \begin{array} doesn't support lack of horizontal lines, double vertical lines.
          
          // 5 Alphabets and typefaces
          // Using latin characters because of the following bug.
          // MATHJAX: \boldsymbol{\unicode{...}} not supported. Neither is \boldsymbol{x} where x is an e.g. Greek letter.
          'Alpha: "\\\\mathrm{A}",' +
          'Beta: "\\\\mathrm{B}",' +
          'Epsilon: "\\\\mathrm{E}",' +
          'Zeta: "\\\\mathrm{Z}",' +
          'Eta: "\\\\mathrm{H}",' +
          'Iota: "\\\\mathrm{I}",' +
          'Kappa: "\\\\mathrm{K}",' +
          'Mu: "\\\\mathrm{M}",' +
          'Nu: "\\\\mathrm{N}",' +
          'Rho: "\\\\mathrm{P}",' +
          'Tau: "\\\\mathrm{T}",' +
          'Chi: "\\\\mathrm{X}",' +
          /*'Alpha: "\\\\unicode{x0391}",' +
          'Beta: "\\\\unicode{x0392}",' +
          'Epsilon: "\\\\unicode{x0395}",' +
          'Zeta: "\\\\unicode{x0396}",' +
          'Eta: "\\\\unicode{x0397}",' +
          'Iota: "\\\\unicode{x0399}",' +
          'Kappa: "\\\\unicode{x039A}",' +
          'Mu: "\\\\unicode{x039C}",' +
          'Nu: "\\\\unicode{x039D}",' +
          'Rho: "\\\\unicode{x03A1}",' +
          'Tau: "\\\\unicode{x03A4}",' +
          'Chi: "\\\\unicode{x03A7}",' +*/

          // 6 Color: TODO.

          // 9.1 \oiint and \oiint: TODO.

          // 9.2 overarc
          // MATHJAX: Support for \overarc.
          
          // 10 Examples of implemented TeX formulas
          // TODO: For some reason, these equations look smaller than the rest.

          // 10.12 Continuation and cases
          // MATHJAX: \begin{cases} is supposed to set \textstyle as "the internal math environment" (<http://en.wikibooks.org/wiki/LaTeX/Advanced_Mathematics#The_cases_environment>).
          
          // http://en.wikipedia.org/w/index.php?title=Dot_product&oldid=468596469
          'bold: "\\\\mathbf",' +
        '}' +
      '},' +
      '"HTML-CSS": {' +
        'scale: 132,' + // Yes! Perfect match! Although personally, I like 100% better. Just right click.
        'availableFonts: ["TeX"]' +
      '}' +
    '});';

  do_render = true;
}

// 3. Load MathJax. <http://www.mathjax.org/docs/1.1/dynamic.html>
var script = document.createElement('script');
script.type = "text/javascript";
script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";

// 4. ???
if (window.opera) {script.innerHTML = config}
else {script.text = config}

// 5. ???
document.getElementsByTagName("head")[0].appendChild(script);

})(); // 6. PROFIT
