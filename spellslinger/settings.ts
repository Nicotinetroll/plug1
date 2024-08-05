class Settings {
    scriptEnabled: boolean = false;
    scriptKey: MenuKeyBindHandler = null;
    highPriorityCooldownGrace: number = 0;
    stealWalkDistance: number = 0;
    safetyRadius: number = 0;
    safetyHeroCount: number = 0;
    humanizerWiggle: number = 0;
    fogMemoryLength: number = 0;
    stealOutOfCombo: boolean = false;

    externalSearchRadius: number = 0;
    externalOffensiveDontCastOnLotusOrb: boolean = false;
    externalOffensiveDontCastOnBladeMail: boolean = false;

    internalHumanizerDelayMs: number = 0;
}

export let SETTINGS = new Settings();