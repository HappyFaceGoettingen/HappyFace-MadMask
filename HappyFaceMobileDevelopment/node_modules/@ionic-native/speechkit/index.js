var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';
/**
 * @name SpeechKit
 * @description
 * Implementation of Nuance SpeechKit SDK on Ionic
 *
 * @usage
 * ```typescript
 * import { SpeechKit } from '@ionic-native/speechkit';
 *
 * constructor(private speechkit: SpeechKit) { }
 *
 *
 * this.speechkit.tts('Text to be read out loud', 'ENG-GBR').then(
 *   (msg) => { console.log(msg); },
 *   (err) => { console.log(err); }
 * );
 * ```
 */
var SpeechKit = (function (_super) {
    __extends(SpeechKit, _super);
    function SpeechKit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Speak text out loud in given language
     * @returns {Promise<string>}
     */
    SpeechKit.prototype.tts = function (text, language) { return; };
    /**
     * Try to recognize what the user said
     * @returns {Promise<string>}
     */
    SpeechKit.prototype.asr = function (language) { return; };
    SpeechKit.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SpeechKit.ctorParameters = function () { return []; };
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], SpeechKit.prototype, "tts", null);
    __decorate([
        Cordova({
            platforms: ['Android']
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SpeechKit.prototype, "asr", null);
    SpeechKit = __decorate([
        Plugin({
            pluginName: 'SpeechKit',
            plugin: 'cordova-plugin-nuance-speechkit',
            pluginRef: 'plugins.speechkit',
            repo: 'https://github.com/Shmarkus/cordova-plugin-nuance-speechkit',
            platforms: ['Android', 'iOS']
        })
    ], SpeechKit);
    return SpeechKit;
}(IonicNativePlugin));
export { SpeechKit };
//# sourceMappingURL=index.js.map