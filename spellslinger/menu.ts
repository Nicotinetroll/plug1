import {SETTINGS} from "./settings";
import {
    DefensiveCast,
    getAbilityImagesByDefensiveCast,
    getAbilityImagesByOffensiveCast,
    getAbilityImagesByStealPriority,
    OffensiveCast,
    StealPriority
} from "./abilities";


export function setupMenu() {
    let whereAt = ['Heroes', 'Intelligence', 'Rubick', '[I] Spellslinger'];

    // Menu.SetImage(whereAt, );

    SETTINGS.scriptEnabled = Menu.AddToggle(whereAt, 'Enabled', false)
        .OnChange(state => (SETTINGS.scriptEnabled = state.newValue))
        .GetValue();

    SETTINGS.scriptKey = Menu.AddKeyBind(whereAt, 'Key', Enum.ButtonCode.BUTTON_CODE_NONE)

    const targetSettingsMenu = ["Heroes", "Targeting"];
    SETTINGS.externalSearchRadius = (Menu.GetFolderOptions([...targetSettingsMenu])[2] as MenuSliderHandler)
        .OnChange(state => (SETTINGS.externalSearchRadius = state.newValue))
        .GetValue()

    SETTINGS.externalOffensiveDontCastOnLotusOrb = (Menu.GetFolderOptions([...targetSettingsMenu])[3] as MenuToggleHandler)
        .OnChange(state => (SETTINGS.externalOffensiveDontCastOnLotusOrb = state.newValue))
        .GetValue()

    SETTINGS.externalOffensiveDontCastOnBladeMail = (Menu.GetFolderOptions([...targetSettingsMenu])[4] as MenuToggleHandler)
        .OnChange(state => (SETTINGS.externalOffensiveDontCastOnBladeMail = state.newValue))
        .GetValue()

    Menu.AddButton(whereAt, "Targeting settings", () => Menu.OpenFolder(targetSettingsMenu));

    SETTINGS.internalHumanizerDelayMs = Menu.AddSlider(whereAt, "Humanizer delay (ms)", 0, 2000, 500, 10)
        .SetTip("Delay between stealing and casting spells, +- 25%. Set to 0ms to rage, and to high number to stay safe")
        .OnChange(state => (SETTINGS.internalHumanizerDelayMs = state.newValue))
        .GetValue();

    SETTINGS.humanizerWiggle = Menu.AddSlider(whereAt, "Humanizer wiggle distance", 0, 200, 40, 1)
        .SetTip("Adds random distance between 0 and set value to ground targets. Set to 0 to rage, and to high number to stay safe")
        .OnChange(state => (SETTINGS.humanizerWiggle = state.newValue))
        .GetValue();

    let spellStealPriorityMenu = [...whereAt, "Spell steal priority"];

    SETTINGS.highPriorityCooldownGrace = Menu.AddSlider(spellStealPriorityMenu, "High priority cooldown grace (seconds)", 0, 120, 10, 1)
        .SetTip("Keep or steal high priority spells, even if they're on cooldown for up to specified seconds")
        .OnChange(state => (SETTINGS.highPriorityCooldownGrace = state.newValue))
        .GetValue();

    SETTINGS.stealWalkDistance = Menu.AddSlider(spellStealPriorityMenu, "Extra walk distance", 0, 5000, 200, 10)
        .SetTip("Rubick will walk this distance towards the enemy if they're out of range")
        .OnChange(state => (SETTINGS.stealWalkDistance = state.newValue))
        .GetValue();

    SETTINGS.fogMemoryLength = Menu.AddSlider(spellStealPriorityMenu, "Fog memory length (seconds)", 0, 600, 20, 1)
        .SetTip("How long to remember the last used ability when a hero is no longer visible. If a hero uses an ability in the fog, the memory will be wrong")
        .OnChange(state => (SETTINGS.fogMemoryLength = state.newValue))
        .GetValue();

    SETTINGS.stealOutOfCombo = Menu.AddToggle(spellStealPriorityMenu, "Always steal high priority spells", true)
        .SetTip("Steal high priority spells even if the combo key isn't held down")
        .OnChange(state => (SETTINGS.stealOutOfCombo = state.newValue))
        .GetValue();

    const abilityImagesWithHighPriority = getAbilityImagesByStealPriority(StealPriority.High);
    Menu.AddMultiSelect(spellStealPriorityMenu, 'High', abilityImagesWithHighPriority, true)
        .SetTip("If multiple spells are available to steal, always steal these first")

    const abilityImagesWithMediumPriority = getAbilityImagesByStealPriority(StealPriority.Medium);
    Menu.AddMultiSelect(spellStealPriorityMenu, 'Medium', abilityImagesWithMediumPriority, true);

    const abilityImagesWithLowPriority = getAbilityImagesByStealPriority(StealPriority.Low);
    Menu.AddMultiSelect(spellStealPriorityMenu, 'Low', abilityImagesWithLowPriority, true)
        .SetTip("Only steal these spells if a spell slot is free");

    Menu.AddButton(spellStealPriorityMenu, "Show 'Never steal' group", () => {
        const abilityImagesWithNeverPriority = getAbilityImagesByStealPriority(StealPriority.Never);
        Menu.AddMultiSelect(spellStealPriorityMenu, 'Never steal', abilityImagesWithNeverPriority, true);
    });

    let offensiveCastRulesMenu = [...whereAt, "Offensive cast rules"];

    SETTINGS.safetyHeroCount = Menu.AddSlider(offensiveCastRulesMenu, "Maximum safe nearby heroes", 0, 5, 2, 1)
        .SetTip("'Cast only if safe' spells won't be cast if there are more nearby heroes than this setting")
        .OnChange(state => (SETTINGS.safetyHeroCount = state.newValue))
        .GetValue();

    SETTINGS.safetyRadius = Menu.AddSlider(offensiveCastRulesMenu, "Safety radius around target", 0, 5000, 1000, 10)
        .SetTip("The radius to look for nearby heroes around the target when casting `Cast only if safe` spells")
        .OnChange(state => (SETTINGS.safetyRadius = state.newValue))
        .GetValue();

    Menu.AddButton(offensiveCastRulesMenu, "Blade Mail & Lotus Orb settings", () => Menu.OpenFolder(targetSettingsMenu));

    const castAlwaysOffensiveAbilities = getAbilityImagesByOffensiveCast(OffensiveCast.Always);
    Menu.AddMultiSelect(offensiveCastRulesMenu, 'Cast always', castAlwaysOffensiveAbilities, true);

    const castOnlyIfSafeOffensiveAbilities = getAbilityImagesByOffensiveCast(OffensiveCast.OnlyIfSafe);
    Menu.AddMultiSelect(offensiveCastRulesMenu, 'Cast only if safe', castOnlyIfSafeOffensiveAbilities, true)
        .SetTip("See 'Maximum nearby heroes' and 'Radius around target' settings");

    Menu.AddButton(offensiveCastRulesMenu, "Show 'Never cast' group", () => {
        const neverCastOffensiveAbilities = getAbilityImagesByOffensiveCast(OffensiveCast.Never);
        Menu.AddMultiSelect(offensiveCastRulesMenu, 'Never cast', neverCastOffensiveAbilities, true);
    });

    let defensiveCastRulesMenu = [...whereAt, "Defensive cast rules"];

    const castOnInjuredAllyDefensiveAbilities = getAbilityImagesByDefensiveCast(DefensiveCast.MostInjured);
    Menu.AddMultiSelect(defensiveCastRulesMenu, 'Cast on most injured ally', castOnInjuredAllyDefensiveAbilities, true)
        .SetTip("These spells will prioritize the ally missing the most health");

    const castOnClosestToEnemyDefensiveAbilities = getAbilityImagesByDefensiveCast(DefensiveCast.ClosestToEnemy);
    Menu.AddMultiSelect(defensiveCastRulesMenu, 'Cast on ally closest to enemies', castOnClosestToEnemyDefensiveAbilities, true)
        .SetTip("These spells will be cast on the ally closest to most enemies");

    const castOnSelfDefensiveAbilities = getAbilityImagesByDefensiveCast(DefensiveCast.Self);
    Menu.AddMultiSelect(defensiveCastRulesMenu, 'Cast on self', castOnSelfDefensiveAbilities, true)
        .SetTip("These spells will only be cast on self")

    Menu.AddButton(defensiveCastRulesMenu, "Show 'Never cast' group", () => {
        const neverCastDefensiveAbilities = getAbilityImagesByDefensiveCast(DefensiveCast.Never);
        Menu.AddMultiSelect(defensiveCastRulesMenu, 'Never cast', neverCastDefensiveAbilities, true);
    });
}
