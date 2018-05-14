import { IonicNativePlugin } from '@ionic-native/core';
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
export declare class SpeechKit extends IonicNativePlugin {
    /**
     * Speak text out loud in given language
     * @returns {Promise<string>}
     */
    tts(text: string, language: string): Promise<string>;
    /**
     * Try to recognize what the user said
     * @returns {Promise<string>}
     */
    asr(language: string): Promise<string>;
}
