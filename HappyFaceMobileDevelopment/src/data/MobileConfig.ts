export class MobileConfig
{
    static get()
    {
        return {
            "automaticFetch" : true,
            "interval" : 1,
            "automaticRotation" : false,
            "detectOnlyChange" : true,
            "enableMadVision": true,
            "enableTextSpeech" : true,
            "happyFaceCompatible" : false
        };
    }
}
