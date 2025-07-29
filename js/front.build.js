/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 9:
/*!**********************!*\
  !*** ./src/front.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("/**\n * Front JS\n */\n\nwindow.addEventListener('DOMContentLoaded', function (event) {\n\n    Array.prototype.forEach.call(document.querySelectorAll(\"\\n        .device-wrapper .device-wrapper__inner__scroll\\n        \"), function (el) {\n        new SimpleBar(el, {\n            classNames: {\n                //contentWrapper: 'dragscroll',\n            }\n        });\n        el.querySelector(\".simplebar-content-wrapper\").classList.add(\"dragscroll\");\n        dragscroll.reset();\n    });\n\n    var videos = document.querySelectorAll('.device-wrapper .device-wrapper__inner video');\n    var autoplayVideos = document.querySelectorAll('.device-wrapper .device-wrapper__inner video.is-autoplay-on-view');\n\n    [].forEach.call(videos, function (video) {\n        video.addEventListener(\"play\", function (e) {\n            video.classList.add(\"is-playing\");\n        });\n        video.addEventListener(\"pause\", function (e) {\n            video.classList.remove(\"is-playing\");\n        });\n        video.addEventListener(\"click\", function (e) {\n            // TBD: fix bug on Firefox with controls enabled (no click event fired and link doesnt open)\n            if (video.hasAttribute(\"controls\")) {\n                e.stopPropagation();\n            }\n            if (video.classList.contains(\"has-link\") || video.hasAttribute(\"controls\")) {\n                console.log(e.target);\n            } else {\n                if (video.paused) {\n                    video.play();\n                } else {\n                    video.pause();\n                }\n            }\n        });\n    });\n\n    if (\"IntersectionObserver\" in window) {\n\n        var autoplayVideoObserver = new IntersectionObserver(function (entries) {\n            entries.forEach(function (video) {\n                if (video.isIntersecting) {\n                    video.target.setAttribute(\"muted\", \"\");\n                    video.target.setAttribute(\"autoplay\", \"\");\n                    video.target.muted = true; // without this line it's not working although I have \"muted\" in HTML\n                    video.target.play();\n                    //video.target.classList.remove(\"is-autoplay-on-view\");\n                    video.target.classList.add(\"is-playing\");\n                    autoplayVideoObserver.unobserve(video.target);\n                }\n            });\n        });\n\n        autoplayVideos.forEach(function (autoplayVideo) {\n            autoplayVideoObserver.observe(autoplayVideo);\n        });\n    }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9mcm9udC5qcz9hYTQ2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRnJvbnQgSlNcbiAqL1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiXFxuICAgICAgICAuZGV2aWNlLXdyYXBwZXIgLmRldmljZS13cmFwcGVyX19pbm5lcl9fc2Nyb2xsXFxuICAgICAgICBcIiksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBuZXcgU2ltcGxlQmFyKGVsLCB7XG4gICAgICAgICAgICBjbGFzc05hbWVzOiB7XG4gICAgICAgICAgICAgICAgLy9jb250ZW50V3JhcHBlcjogJ2RyYWdzY3JvbGwnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5zaW1wbGViYXItY29udGVudC13cmFwcGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJkcmFnc2Nyb2xsXCIpO1xuICAgICAgICBkcmFnc2Nyb2xsLnJlc2V0KCk7XG4gICAgfSk7XG5cbiAgICB2YXIgdmlkZW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRldmljZS13cmFwcGVyIC5kZXZpY2Utd3JhcHBlcl9faW5uZXIgdmlkZW8nKTtcbiAgICB2YXIgYXV0b3BsYXlWaWRlb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGV2aWNlLXdyYXBwZXIgLmRldmljZS13cmFwcGVyX19pbm5lciB2aWRlby5pcy1hdXRvcGxheS1vbi12aWV3Jyk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwodmlkZW9zLCBmdW5jdGlvbiAodmlkZW8pIHtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5hZGQoXCJpcy1wbGF5aW5nXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2aWRlby5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtcGxheWluZ1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gVEJEOiBmaXggYnVnIG9uIEZpcmVmb3ggd2l0aCBjb250cm9scyBlbmFibGVkIChubyBjbGljayBldmVudCBmaXJlZCBhbmQgbGluayBkb2VzbnQgb3BlbilcbiAgICAgICAgICAgIGlmICh2aWRlby5oYXNBdHRyaWJ1dGUoXCJjb250cm9sc1wiKSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmlkZW8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFzLWxpbmtcIikgfHwgdmlkZW8uaGFzQXR0cmlidXRlKFwiY29udHJvbHNcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmIChcIkludGVyc2VjdGlvbk9ic2VydmVyXCIgaW4gd2luZG93KSB7XG5cbiAgICAgICAgdmFyIGF1dG9wbGF5VmlkZW9PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uICh2aWRlbykge1xuICAgICAgICAgICAgICAgIGlmICh2aWRlby5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICB2aWRlby50YXJnZXQuc2V0QXR0cmlidXRlKFwibXV0ZWRcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJhdXRvcGxheVwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8udGFyZ2V0Lm11dGVkID0gdHJ1ZTsgLy8gd2l0aG91dCB0aGlzIGxpbmUgaXQncyBub3Qgd29ya2luZyBhbHRob3VnaCBJIGhhdmUgXCJtdXRlZFwiIGluIEhUTUxcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8udGFyZ2V0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy92aWRlby50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImlzLWF1dG9wbGF5LW9uLXZpZXdcIik7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaXMtcGxheWluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlWaWRlb09ic2VydmVyLnVub2JzZXJ2ZSh2aWRlby50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBhdXRvcGxheVZpZGVvcy5mb3JFYWNoKGZ1bmN0aW9uIChhdXRvcGxheVZpZGVvKSB7XG4gICAgICAgICAgICBhdXRvcGxheVZpZGVvT2JzZXJ2ZXIub2JzZXJ2ZShhdXRvcGxheVZpZGVvKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZnJvbnQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///9\n");

/***/ })

/******/ });