(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cookieBanner = factory());
}(this, (function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "#cb-banner,#cb-banner *,#cb-overlay,#cb-overlay *{box-sizing:border-box;margin:0}#cb-banner,#cb-overlay{position:fixed;left:0;display:grid;z-index:999}#cb-overlay{top:0;height:100vh;width:100vw}#cb-overlay.cb-light{background-color:hsla(0,0%,100%,.75)}#cb-overlay.cb-dark{background-color:rgba(0,0,0,.75)}#cb-overlay #cb-banner{position:relative;justify-self:center;align-self:center;margin:0;width:auto;max-width:80%}#cb-banner{--arcspire-navy:#2f455c;--arcspire-green:#62f9a8;--arcspire-red:#fa7061;--margin:1rem;bottom:0;margin:0 0 var(--margin) var(--margin);padding:1rem;border-radius:.375rem;box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04);font-size:.75rem;line-height:2;gap:.5rem;width:calc(100% - var(--margin)*2)}#cb-banner.cb-light{background-color:#f7fafc}#cb-banner.cb-dark{background-color:#292929;color:#f7fafc}#cb-title{font-size:1rem}#cb-buttons{display:grid;gap:.5rem}#cb-accept,#cb-more,#cb-preferences,#cb-preferences-accept,#cb-reject{border-radius:.375rem;padding:.5rem 1rem;font-weight:700;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);transition:box-shadow .2s cubic-bezier(.4,0,.2,1);text-decoration:none;text-align:center;display:grid;align-items:center;outline:none;border:none;font-size:100%;cursor:pointer;line-height:inherit}#cb-accept:hover,#cb-more:hover,#cb-preferences-accept:hover,#cb-preferences:hover,#cb-reject:hover{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}#cb-accept,#cb-preferences-accept{background-color:var(--arcspire-green);color:var(--arcspire-navy)}#cb-reject{background-color:var(--arcspire-red);color:var(--arcspire-navy)}#cb-more{background-color:var(--arcspire-navy);color:#f7fafc}#cb-preferences-accept{padding:.25rem 1rem;font-weight:500;font-size:.75rem}#cb-preferences-form{display:none;grid-auto-flow:column;grid-auto-columns:max-content;align-items:center;gap:10px;margin:10px 0}@media (min-width:768px){#cb-banner{font-size:.875rem;line-height:1.625}#cb-buttons{grid-auto-flow:column}}@media (min-width:1024px){#cb-banner{grid-auto-flow:column;align-items:center}#cb-overlay #cb-banner{grid-auto-flow:row}}";
  styleInject(css_248z);

  var removeBanner = function removeBanner(fullScreen) {
    var elem = document.getElementById("cb-banner");

    if (fullScreen) {
      elem = document.getElementById("cb-overlay");
    }

    elem.parentNode.removeChild(elem);
  };

  var defaultOptions = {
    text: "This website uses cookies. By clicking 'Accept' you agree to our use of cookies.",
    acceptText: "Accept",
    rejectText: "Reject",
    moreText: "More Info",
    preferencesText: "Preferences",
    overlayTheme: "dark",
    bannerTheme: "light",
    preferencesAcceptText: "Accept"
  };

  var cookieBanner = function cookieBanner() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions,
        _ref$text = _ref.text,
        text = _ref$text === void 0 ? defaultOptions.text : _ref$text,
        _ref$acceptText = _ref.acceptText,
        acceptText = _ref$acceptText === void 0 ? defaultOptions.acceptText : _ref$acceptText,
        _ref$rejectText = _ref.rejectText,
        rejectText = _ref$rejectText === void 0 ? defaultOptions.rejectText : _ref$rejectText,
        _ref$moreText = _ref.moreText,
        moreText = _ref$moreText === void 0 ? defaultOptions.moreText : _ref$moreText,
        _ref$preferencesText = _ref.preferencesText,
        preferencesText = _ref$preferencesText === void 0 ? defaultOptions.preferencesText : _ref$preferencesText,
        _ref$overlayTheme = _ref.overlayTheme,
        overlayTheme = _ref$overlayTheme === void 0 ? defaultOptions.overlayTheme : _ref$overlayTheme,
        _ref$bannerTheme = _ref.bannerTheme,
        bannerTheme = _ref$bannerTheme === void 0 ? defaultOptions.bannerTheme : _ref$bannerTheme,
        _ref$preferencesAccep = _ref.preferencesAcceptText,
        preferencesAcceptText = _ref$preferencesAccep === void 0 ? defaultOptions.preferencesAcceptText : _ref$preferencesAccep,
        title = _ref.title,
        onAccept = _ref.onAccept,
        onReject = _ref.onReject,
        onMore = _ref.onMore,
        fullScreen = _ref.fullScreen,
        parentClass = _ref.parentClass,
        preferences = _ref.preferences,
        onPreferencesAccept = _ref.onPreferencesAccept;

    var cookiesAllowed = localStorage.getItem("cb-cookiesAllowed") === "true"; // if cookies have already been allowed, no need to render banner

    if (!cookiesAllowed) {
      var html = "\n                ".concat(parentClass ? "<div class=\"".concat(parentClass, "\">") : "", "\n                ").concat(fullScreen ? "<div id=\"cb-overlay\" class=\"cb-".concat(overlayTheme, "\">") : "", "\n                <div id=\"cb-banner\" class=\"cb-").concat(bannerTheme, "\">\n                    <div>\n                        ").concat(title ? "<h2 id=\"cb-title\">".concat(title, "</h2>") : "", "\n                        <p id=\"cb-text\">").concat(text, "</p>\n                        ").concat(preferences ? "\n                                <form id='cb-preferences-form'>\n                                    ".concat(preferences.map(function (p) {
        return "<label>\n                                        <input type=\"checkbox\" name=\"".concat(p.name, "\" checked=\"false\" />\n                                        <span>").concat(p.label, "</span>\n                                    </label>");
      }).join(""), "\n                                    <button\n                                        type='submit'\n                                        id='cb-preferences-accept'\n                                    >\n                                        ").concat(preferencesAcceptText, "\n                                    </button>\n                                </form>\n                            ") : "", "\n                        </div>\n                    <div id=\"cb-buttons\">\n                        <button id=\"cb-accept\">").concat(acceptText, "</button>\n                        <button id=\"cb-reject\">").concat(rejectText, "</button>\n                        ").concat(onMore ? "<button id=\"cb-more\">".concat(moreText, "</button>") : "", "\n                        ").concat(preferences ? "<button id=\"cb-preferences\">".concat(preferencesText, "</button>") : "", "\n                    </div>\n                </div>\n                ").concat(fullScreen ? "</div>" : "", "\n                ").concat(parentClass ? "</div>" : "", "\n            ");
      var div = document.querySelector("body");
      div.insertAdjacentHTML("beforeend", html);
      var acceptButton = document.getElementById("cb-accept");
      acceptButton.addEventListener("click", function () {
        removeBanner(fullScreen);
        localStorage.setItem("cb-cookiesAllowed", true);
        onAccept && onAccept();
      });
      var rejectButton = document.getElementById("cb-reject");
      rejectButton.addEventListener("click", function () {
        removeBanner(fullScreen);
        onReject && onReject();
      });

      if (onMore) {
        var moreButton = document.getElementById("cb-more");
        moreButton.addEventListener("click", function () {
          onMore();
        });
      }

      if (preferences) {
        var preferencesButton = document.getElementById("cb-preferences");
        preferencesButton.addEventListener("click", function () {
          var preferencesForm = document.getElementById("cb-preferences-form");

          if (preferencesForm.style.display !== "grid") {
            preferencesForm.style.display = "grid";
            document.getElementById("cb-accept").textContent += ' All';
            document.getElementById("cb-reject").textContent += ' All';
          }
        });
        var preferencesForm = document.getElementById("cb-preferences-form");
        preferencesForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var values = {};
          preferences.forEach(function (p) {
            values[p.name] = preferencesForm.elements[p.name].checked;
          });
          removeBanner(fullScreen);
          localStorage.setItem("cb-cookiesAllowed", true);
          onPreferencesAccept && onPreferencesAccept(values);
        });
      }
    }
  };

  return cookieBanner;

})));
