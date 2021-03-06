"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var option_builder_1 = require("./option-builder");
var geo_coder_1 = require("./geo-coder");
/**
 * collection of map instance-related properties and methods
 */
var Ng2Map = (function () {
    function Ng2Map(geoCoder, optionBuilder) {
        this.geoCoder = geoCoder;
        this.optionBuilder = optionBuilder;
        this.mapReady$ = new Rx_1.Subject();
    }
    Ng2Map.prototype.setObjectEvents = function (definedEvents, thisObj, prefix) {
        definedEvents.forEach(function (definedEvent) {
            var eventName = definedEvent
                .toLowerCase()
                .replace(new RegExp("^" + prefix), '');
            thisObj[prefix].addListener(eventName, function (event) {
                thisObj[definedEvent].emit(this);
            });
        });
    };
    Ng2Map.prototype.updateGoogleObject = function (object, changes) {
        var val, currentValue, setMethodName;
        if (object) {
            for (var key in changes) {
                setMethodName = "set" + key.replace(/^[a-z]/, function (x) { return x.toUpperCase(); });
                currentValue = changes[key].currentValue;
                if (['position', 'center'].indexOf(key) !== -1 && typeof currentValue === 'string') {
                    this.geoCoder.geocode({ address: currentValue }).subscribe(function (results) {
                        object[setMethodName](results[0].geometry.location);
                    });
                }
                else {
                    val = this.optionBuilder.googlize(currentValue);
                    object[setMethodName](val);
                }
            }
        }
    };
    Ng2Map.prototype.updateProperty = function (object, key, currentValue) {
        var val, setMethodName;
        setMethodName = "set" + key.replace(/^[a-z]/, function (x) { return x.toUpperCase(); });
        if (['position', 'center'].indexOf(key) !== -1 && typeof currentValue === 'string') {
            this.geoCoder.geocode({ address: currentValue }).subscribe(function (results) {
                object[setMethodName](results[0].geometry.location);
            });
        }
        else {
            val = this.optionBuilder.googlize(currentValue);
            object[setMethodName](val);
        }
    };
    Ng2Map = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [geo_coder_1.GeoCoder, option_builder_1.OptionBuilder])
    ], Ng2Map);
    return Ng2Map;
}());
exports.Ng2Map = Ng2Map;
//# sourceMappingURL=ng2-map.js.map