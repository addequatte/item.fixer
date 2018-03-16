"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fittingItems = function () {
    function fittingItems(args) {
        _classCallCheck(this, fittingItems);

        this.settings = {
            rowCount: args.rowCount ? args.rowCount : 3,
            boxSelector: args.boxSelector ? args.boxSelector : '#fittingBox',
            itemSelector: 'img'
        };
        this.fittingBox = document.querySelector(this.settings.boxSelector);
        this.items = this.fittingBox.querySelectorAll(this.settings.itemSelector);
        this.boxWidth = this.fittingBox.offsetWidth;
        this.allWidth = 0;
        this.itemArr = [];

        this.init();
    }

    _createClass(fittingItems, [{
        key: 'init',
        value: function init() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    item.style.height = '100px';
                    this.itemArr.push(item.offsetWidth);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.doFixingItems();
        }
    }, {
        key: 'doFixingItems',
        value: function doFixingItems() {
            for (var i = 0; i < this.itemArr.length; i++) {
                this.allWidth += this.itemArr[i];
                if ((i + 1) % this.settings.rowCount === 0) {
                    for (var m = i - (this.settings.rowCount - 1); m < i + 1; m++) {
                        this.items[m].style.width = this.items[m].offsetWidth * (this.boxWidth / this.allWidth) + 'px';
                        this.items[m].style.height = this.items[m].offsetHeight * (this.boxWidth / this.allWidth) + 'px';
                    }
                    this.allWidth = 0;
                }
                if (i === this.itemArr.length - 1 && this.allWidth !== 0) {
                    var a = void 0;
                    if (this.itemArr.length > this.settings.rowCount) a = this.itemArr.length % this.settings.rowCount - 1;else a = this.itemArr.length - 1;
                    for (var _m = i - a; _m < this.itemArr.length; _m++) {
                        this.items[_m].style.width = this.items[_m].offsetWidth * (this.boxWidth / this.allWidth) + 'px';
                        this.items[_m].style.height = this.items[_m].offsetHeight * (this.boxWidth / this.allWidth) + 'px';
                    }
                }
            }
        }
    }]);

    return fittingItems;
}();