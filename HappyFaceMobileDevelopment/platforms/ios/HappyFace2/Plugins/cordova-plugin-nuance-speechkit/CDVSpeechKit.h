//
//  CDVSpeechKit.h
//
//  Created by Adam on 10/3/12.
//  Updated by Markus Karileet on 10/7/16
//
//

#import <Cordova/CDV.h>
#import <SpeechKit/SpeechKit.h>

@interface CDVSpeechKit : CDVPlugin {
    SKSession* session;
}
// Initialize Speech Kit
- (void) pluginInitialize;
// Start text to speech
- (void) startTTS:(CDVInvokedUrlCommand*)command;
@end
