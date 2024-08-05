import AbilityBehavior = Enum.AbilityBehavior;
import TargetTeam = Enum.TargetTeam;
import TeamType = Enum.TeamType;
import "./settings"
import "./abilities"


import {ABILITIES, DefensiveCast, OffensiveCast, StealPriority} from "./abilities";
import {SETTINGS} from "./settings";
import {LOCKED_HERO, UpdateHeroLock} from "./targetlock";
import {setupMenu} from "./menu";
import {hasFlag} from "../utils/util";

const INPUT_THROTTLE_KEY = "KEY_SPELL_CAST";

let script: ScriptDescription = {};

script.OnScriptLoad = () => {
    setupMenu();
};

function isTargetSafe(target: Hero): boolean {
    const heroCount = target.GetHeroesInRadius(SETTINGS.safetyRadius, TeamType.TEAM_ENEMY).filter(h => !h.IsDormant() && h.IsExist() && h.IsAlive())
    return heroCount.length <= SETTINGS.safetyHeroCount;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHumanizerDelay(): number {
    return SETTINGS.internalHumanizerDelayMs / 1000 * getRandomNumber(0.75, 1.25);
}

function getRandomWiggleOffset() {
    return getRandomNumber(-SETTINGS.humanizerWiggle, SETTINGS.humanizerWiggle);
}


function castAbility(ability: Ability, target: Hero, localHero: Hero, ownerPlayer: Player, castBetween: boolean = false) {
    if (Engine.OnceAtByKey(getHumanizerDelay(), INPUT_THROTTLE_KEY)) {
        const abilityBehaviorFlags = ability.GetBehavior();

        if (castBetween && hasFlag(abilityBehaviorFlags, AbilityBehavior.DOTA_ABILITY_BEHAVIOR_POINT)) {
            const targetOrigin = target.GetOrigin();
            if (AbilityBehavior.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) {
                ownerPlayer.PrepareUnitOrders(
                    Enum.UnitOrder.DOTA_UNIT_ORDER_VECTOR_TARGET_POSITION,
                    null,
                    targetOrigin,
                    ability,
                    Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
                    localHero,
                    false,
                    true);
            }
            const betweenPosition = targetOrigin.add(localHero.GetOrigin()).Scaled(0.5);
            ownerPlayer.PrepareUnitOrders(
                Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,
                null,
                betweenPosition,
                ability,
                Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
                localHero,
                false,
                true);
            return;
        }
        if (hasFlag(abilityBehaviorFlags, AbilityBehavior.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET)) {
            ownerPlayer.PrepareUnitOrders(
                Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET,
                target,
                null,
                ability,
                Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
                localHero,
                false,
                true);
        } else if (hasFlag(abilityBehaviorFlags, AbilityBehavior.DOTA_ABILITY_BEHAVIOR_POINT)) {
            const targetOrigin = target.GetOrigin();
            const targetPositionWithWiggle = target.GetOrigin().add(new Vector(getRandomWiggleOffset(), getRandomWiggleOffset(), targetOrigin.z));
            ownerPlayer.PrepareUnitOrders(
                Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION,
                null,
                targetPositionWithWiggle,
                ability,
                Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
                localHero,
                false,
                true);
        } else {
            if (!localHero.IsPositionInRange(target.GetOrigin(), ability.GetAOERadius(), 0)) {
                return;
            }
            ownerPlayer.PrepareUnitOrders(
                Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET,
                null,
                null,
                ability,
                Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
                localHero,
                false,
                true);
        }
    }
}

function isAbilityInRange(ability: Ability, localHero: Hero, target: Hero, castBetween: boolean) {
    if (castBetween) {
        // We only need to be in range of the midpoint between us and the target
        const localHeroOrigin = localHero.GetOrigin();
        const midPoint = localHeroOrigin.add(target.GetOrigin()).Scaled(0.5);
        return localHeroOrigin.Distance(midPoint) <= getRealCastRange(localHero, ability);
    }

    const heroesInRange = localHero.GetHeroesInRadius(getRealCastRange(localHero, ability), TeamType.TEAM_BOTH);
    return heroesInRange && heroesInRange.some(h => h === target);
}

function castAbilityOnEnemy(ability: Ability, localHero: Hero, ownerPlayer: Player) {
    if (!LOCKED_HERO) return false;

    const target = LOCKED_HERO;
    const abilityInfo = ABILITIES[ability.GetName()]
    if (!abilityInfo) {
        // We don't cast abilities we don't know
        return false;
    }

    if (abilityInfo.offensive === OffensiveCast.Never) return false;
    if (abilityInfo.offensive === OffensiveCast.OnlyIfSafe && !isTargetSafe(target)) return false;
    if (target.GetModifier("modifier_antimage_counterspell")) return false;
    if (SETTINGS.externalOffensiveDontCastOnBladeMail && target.GetModifier("modifier_item_blade_mail_reflect")) return false;
    if (!SETTINGS.externalOffensiveDontCastOnLotusOrb && target.GetModifier("modifier_item_lotus_orb_active")) return false;
    if (!isAbilityInRange(ability, localHero, target, abilityInfo.offensive === OffensiveCast.AlwaysBetween)) return false;

    castAbility(ability, target, localHero, ownerPlayer, abilityInfo.offensive === OffensiveCast.AlwaysBetween);
    return true;
}

function findMostInjuredAlly(localHero: Hero, ability: Ability) {
    const allyHeroes = localHero.GetHeroesInRadius(getRealCastRange(localHero, ability), TeamType.TEAM_FRIEND).filter(h => !h.IsDormant() && h.IsExist() && h.IsExist())
    if (allyHeroes.length === 0) return;

    if (allyHeroes.length > 1) {
        allyHeroes.sort((a, b) => (b.GetMaxHealth() - b.GetHealth()) - (a.GetMaxHealth() - a.GetHealth()));
    }

    const proposedTarget = allyHeroes[0];
    if (proposedTarget.GetMaxHealth() - proposedTarget.GetHealth() === 0) {
        // No one is missing any health
        return undefined;
    }
    return proposedTarget;
}

function findAllyClosestToEnemy(localHero: Hero, ability: Ability): Hero {
    const allyHeroes = localHero.GetHeroesInRadius(getRealCastRange(localHero, ability), TeamType.TEAM_FRIEND).filter(h => !h.IsDormant() && h.IsExist() && h.IsAlive());
    if (allyHeroes.length === 0) return;

    // for each ally hero, check how many enemies are around them
    let closestAlly: Hero = null;
    let maxEnemiesAround = -1;

    allyHeroes.forEach(ally => {
        const enemiesAround = ally.GetHeroesInRadius(750, TeamType.TEAM_ENEMY).filter(e => !e.IsDormant() && e.IsExist() && e.IsAlive()).length;
        if (enemiesAround > maxEnemiesAround) {
            maxEnemiesAround = enemiesAround;
            closestAlly = ally;
        }
    });

    if (maxEnemiesAround <= 0) {
        return undefined;
    }

    return closestAlly;
}

function castAbilityOnAlly(ability: Ability, localHero: Hero, ownerPlayer: Player) {
    const abilityInfo = ABILITIES[ability.GetName()]
    // We don't cast abilities we don't know
    if (!abilityInfo) return false;

    if (abilityInfo.defensive === DefensiveCast.Never) return false;

    if (abilityInfo.defensive === DefensiveCast.Self) {
        castAbility(ability, localHero, localHero, ownerPlayer);
        return true;
    }

    if (abilityInfo.defensive === DefensiveCast.MostInjured) {
        const mostInjuredTarget = findMostInjuredAlly(localHero, ability);
        if (!mostInjuredTarget) return false;

        castAbility(ability, mostInjuredTarget, localHero, ownerPlayer);
        return true;
    }

    if (abilityInfo.defensive === DefensiveCast.ClosestToEnemy) {
        const allyTarget = findAllyClosestToEnemy(localHero, ability);
        if (!allyTarget) return false;

        castAbility(ability, allyTarget, localHero, ownerPlayer);
        return true;
    }

    return false;
}

// Returns true if cast happened, false otherwise
function tryCastAbilities(abilities: Ability[], localHero: Hero, localPlayer: Player): boolean {
    if (localHero.IsChannellingAbility()) {
        return;
    }

    for (const ability of abilities) {
        if (ability.IsInAbilityPhase()) {
            // we already have an ability is in wind-up stage, lets avoid accidentally cancelling it
            return;
        }
    }

    /*
     * Sorts abilities so the highest priority ability is cast first
     *
     * "ability_name_1": { priority: StealPriority.High, ... },
     * ...
     */
    const sortedAbilities = abilities
        .filter(ability => ability.CanCast())
        .map(ability => {
            const abilityInfo = ABILITIES[ability.GetName()];
            return {
                ability,
                priority: abilityInfo ? abilityInfo.priority : StealPriority.Low
            };
        });

    sortedAbilities.sort((a, b) => b.priority - a.priority);

    for (const {ability} of sortedAbilities) {
        const targetTeam = ability.GetTargetTeam();
        const isDefensive = hasFlag(targetTeam, TargetTeam.DOTA_UNIT_TARGET_TEAM_BOTH | TargetTeam.DOTA_UNIT_TARGET_TEAM_FRIENDLY)
            && !hasFlag(targetTeam, TargetTeam.DOTA_UNIT_TARGET_TEAM_NONE);

        if (!isDefensive && castAbilityOnEnemy(ability, localHero, localPlayer)) {
            // Offensive cast successful
            return true;
        }

        if (castAbilityOnAlly(ability, localHero, localPlayer)) {
            return true;
        }
    }

    return false;
}

class HeroHistory {
    abilityName: string;
    lastCastTime: number;
    lastSeen: number;

    constructor(abilityHandle: string, lastCastTime: number, gameTime: number) {
        this.abilityName = abilityHandle;
        this.lastCastTime = lastCastTime;
        this.lastSeen = gameTime;
    }

    OnSeen(when: number) {
        this.lastSeen = when;
    }
}

interface HeroHandleToAbilityUseHistoryDictionary {
    [heroHandle: number]: HeroHistory;
}

let HERO_HANDLE_TO_MOST_RECENT_ABILITY: HeroHandleToAbilityUseHistoryDictionary = {};

interface SelfSpellTimers {
    [spell: string]: number // value is deadline game time for when spell comes of cooldown
}

let SELF_SPELL_TIMERS: SelfSpellTimers = {};

function getRealAbilityCooldown(ability: Ability) {
    const abilityChargeTimeRemaining = ability.GetAbilityChargeRestoreTimeRemaining();
    if (abilityChargeTimeRemaining > 0 && ability.GetAbilityCurrentCharges() <= 0) {
        return abilityChargeTimeRemaining;
    }
    return ability.GetCooldown(); // noinspection JSDeprecatedSymbols
}

function updateSelfAbilities(stolenAbility1: Ability, stolenAbility2: Ability, gameTime: number) {

    const remainingCooldown1 = getRealAbilityCooldown(stolenAbility1);
    if (remainingCooldown1 > 0) {
        SELF_SPELL_TIMERS[stolenAbility1.GetName()] = gameTime + remainingCooldown1;
    }

    const remainingCooldown2 = getRealAbilityCooldown(stolenAbility2);
    if (remainingCooldown2 > 0) {
        SELF_SPELL_TIMERS[stolenAbility2.GetName()] = gameTime + remainingCooldown2;
    }
}

function updateEnemyHistory(localHero: Hero, gameTime: number) {
    const enemyHeroes = EntitySystem.GetHeroesList().filter(h => !h.IsSameTeam(localHero) && !h.IsIllusion());

    for (const enemy of enemyHeroes) {
        if (enemy.IsDormant()) {
            continue;
        }

        const enemyHandle = enemy.GetHandle();
        const lastState = HERO_HANDLE_TO_MOST_RECENT_ABILITY[enemyHandle]
        if (lastState) {
            lastState.OnSeen(gameTime);
        }

        const abilities = enemy.GetAbilities()
        for (const ability of abilities) {
            if (!ability.IsStealable()) {
                continue;
            }

            if (ability.GetAbilityChargeRestoreTimeRemaining() <= 0 && ability.SecondsSinceLastUse() <= 0) {
                continue;
            }

            let abilityCastTime = ability.GetCastStartTime();
            if (abilityCastTime === 0) {
                // instant activated abilities don't have a start time, so we have to estimate it
                abilityCastTime = gameTime - ability.SecondsSinceLastUse();
            }

            const abilityHistory = new HeroHistory(ability.GetName(), ability.GetCastStartTime(), gameTime);
            if (lastState === undefined || lastState.lastCastTime < abilityHistory.lastCastTime) {
                HERO_HANDLE_TO_MOST_RECENT_ABILITY[enemyHandle] = abilityHistory;
                // console.log(`Updating from ${lastState ? JSON.stringify(lastState) : "nothing"}`);
                // console.log(`Updating to ${JSON.stringify(abilityHistory)}`);
            }
        }
    }
}

function stealFrom(localHero: Hero, stealAbility: Ability, enemy: Hero, localPlayer: Player) {
    if (Engine.OnceAtByKey(getHumanizerDelay(), INPUT_THROTTLE_KEY)) {
        localPlayer.PrepareUnitOrders(
            Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET,
            enemy,
            null,
            stealAbility,
            Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY,
            localHero,
            false,
            true);
    }
}

function getRealCastRange(hero: Hero, ability: Ability) {
    switch (ability.GetName()) {
        case "rattletrap_rocket_flare":
        case "invoker_sun_strike":
        case "zuus_cloud": {
            return 10000; // some big amount
        }
    }
    const targetRange = ability.GetCastRange() + hero.GetCastRangeBonus() + hero.GetHullRadius() * 2;
    const aoeRange = ability.GetAOERadius() + hero.GetHullRadius();
    return Math.max(targetRange, aoeRange);
}

enum StealRequest {
    DontSteal,
    Any,
    MediumOrAbove,
    HighOnly
}

export function getStealGraceInSeconds(ability: string): number {
    const abilityInfo = ABILITIES[ability];

    if (!abilityInfo) return 0;
    if (abilityInfo.priority != StealPriority.High) return 0;

    return SETTINGS.highPriorityCooldownGrace;
}

function trySteal(stolenAbility1: Ability, stolenAbility2: Ability, abilitySteal: Ability, localHero: Hero, localPlayer: Player, gameTime: number, onlyHighPriority = false) {
    if (!abilitySteal.CanCast()) {
        // if the steal ability is not learned, on cooldown, or muted, don't even both trying to steal
        return;
    }

    const stolenAbilityName1 = stolenAbility1.GetName();
    const stolenAbilityName2 = stolenAbility2.GetName();

    function getStealRequest(): StealRequest {
        if (!localHero.HasAghanimScepter()) {
            // if we don't have aghs, we only care about the first stolen spell.
            // if its empty, steal
            if (stolenAbilityName1 === "rubick_empty1") {
                return StealRequest.Any;
            }

            let abilityInfo = ABILITIES[stolenAbilityName1];
            if (!abilityInfo) {
                // If we don't have AbilityInfo for this spell, replace it with anything else
                return StealRequest.Any;
            }

            if (getRealAbilityCooldown(stolenAbility1) > getStealGraceInSeconds(stolenAbilityName1)) {
                // if its on cooldown, lets take anything equal or better
                return StealRequest.MediumOrAbove;
            } else {
                // if its off cooldown, only steal upgrades (e.g. upgrade low to medium)
                if (abilityInfo.priority === StealPriority.Low) {
                    return StealRequest.MediumOrAbove;
                }
                if (abilityInfo.priority === StealPriority.Medium) {
                    return StealRequest.HighOnly;
                }
                if (abilityInfo.priority === StealPriority.High) {
                    return StealRequest.DontSteal;
                }
            }
        } else {
            // If we have aghs, we steal if either slot is empty
            if (stolenAbilityName1 === "rubick_empty1" || stolenAbilityName2 === "rubick_empty2") {
                return StealRequest.Any
            }

            // If both slots are filled, we should steal if the 2nd slot is on cooldown because this slot will be
            // replaced with the 1st spell when Spell Steal is used. If it's not empty, check if its on cooldown.

            let abilityInfo = ABILITIES[stolenAbilityName2];
            if (!abilityInfo) {
                // If we don't have AbilityInfo for this spell, replace it with anything else
                return StealRequest.Any;
            }

            if (getRealAbilityCooldown(stolenAbility2) > getStealGraceInSeconds(stolenAbilityName2)) {
                // if its on cooldown, lets take anything equal or better
                return StealRequest.MediumOrAbove;
            } else {
                // if its off cooldown, only steal upgrades (e.g. upgrade low to medium)
                if (abilityInfo.priority === StealPriority.Low) {
                    return StealRequest.MediumOrAbove;
                }
                if (abilityInfo.priority === StealPriority.Medium) {
                    return StealRequest.HighOnly;
                }
                if (abilityInfo.priority === StealPriority.High) {
                    return StealRequest.DontSteal;
                }
            }
        }
    }

    let bShouldSteal = onlyHighPriority ? StealRequest.HighOnly : getStealRequest();
    if (bShouldSteal === StealRequest.DontSteal) return;

    const enemyHeroesInRange = localHero.GetHeroesInRadius(getRealCastRange(localHero, abilitySteal) + SETTINGS.stealWalkDistance, TeamType.TEAM_ENEMY);

    interface triplet {
        priority: StealPriority;
        enemy: Hero;
        abilityName: string
    }

    let allNearbyAbilities: triplet[] = []

    for (const enemy of enemyHeroesInRange) {
        const abilityHistory = HERO_HANDLE_TO_MOST_RECENT_ABILITY[enemy.GetHandle()];
        if (!abilityHistory) {
            // hero has no ability history; no idea what I'm stealing
            continue;
        }

        if (gameTime > abilityHistory.lastSeen + SETTINGS.fogMemoryLength) {
            // we haven't seen the hero with this ability for too long; not confident in what I'm stealing
            continue;
        }

        if (gameTime < abilityHistory.lastCastTime + getHumanizerDelay()) {
            // the enemy hasn't held this ability for long enough; if we steal it too fast, its sus
            continue;
        }

        const enemyAbilityName = abilityHistory.abilityName;

        console.log(`${enemyAbilityName} === ${stolenAbilityName1} ${enemyAbilityName} === ${stolenAbilityName2}`)
        if (enemyAbilityName === stolenAbilityName1 || enemyAbilityName === stolenAbilityName2) {
            // we already have this ability
            continue;
        }

        const abilityInfo = ABILITIES[enemyAbilityName]
        if (!abilityInfo) {
            // this ability doesn't have AbilityInfo; we don't steal abilities we don't know
            continue
        }

        if (abilityInfo.priority === StealPriority.Never){
            continue;
        }

        const cooldownDeadline = SELF_SPELL_TIMERS[enemyAbilityName]
        if (cooldownDeadline) {
            const grace = getStealGraceInSeconds(abilityHistory.abilityName)
            // if the cooldown deadline is at or before current game time, the ability is ready to be stolen
            // if the ability is high priority, even if the deadline has `grace` to go, we take it
            if (gameTime < cooldownDeadline - grace) {
                continue
            }
        }

        allNearbyAbilities.push({priority: abilityInfo.priority, enemy: enemy, abilityName: enemyAbilityName})
    }

    if (allNearbyAbilities.length <= 0) {
        // no abilities nearby to steal
        return;
    }

    allNearbyAbilities.sort((a, b) => b.priority - a.priority);

    const bestNearbyAbility = allNearbyAbilities[0];
    if (bShouldSteal === StealRequest.HighOnly && bestNearbyAbility.priority != StealPriority.High) {
        // all nearby abilities are not good enough
        return;
    }

    if (bShouldSteal === StealRequest.MediumOrAbove && bestNearbyAbility.priority < StealPriority.Medium) {
        // all nearby abilities are not good enough
        return;
    }

    stealFrom(localHero, abilitySteal, bestNearbyAbility.enemy, localPlayer);
}


function doUpdate() {
    if (!SETTINGS.scriptEnabled) return;
    if (!SETTINGS.scriptKey) return;

    const localPlayer = EntitySystem.GetLocalPlayer();
    if (!localPlayer) return;

    let localHero = EntitySystem.GetLocalHero();
    if (!localHero) return;

    if (!(localHero.GetUnitName() === "npc_dota_hero_rubick")) return;

    const ABILITY_INDEX_FADE_BOLT = 1;
    const ABILITY_INDEX_EMPTY1 = 3;
    const ABILITY_INDEX_EMPTY2 = 4;
    const ABILITY_INDEX_SPELL_STEAL = 5;

    let abilityFadeBolt = localHero.GetAbilityByIndex(ABILITY_INDEX_FADE_BOLT);
    let abilityStolen1 = localHero.GetAbilityByIndex(ABILITY_INDEX_EMPTY1);
    let abilityStolen2 = localHero.GetAbilityByIndex(ABILITY_INDEX_EMPTY2);
    let abilitySteal = localHero.GetAbilityByIndex(ABILITY_INDEX_SPELL_STEAL);

    const gameTime = GameRules.GetGameTime();

    updateSelfAbilities(abilityStolen1, abilityStolen2, gameTime);
    updateEnemyHistory(localHero, gameTime);
    UpdateHeroLock(localHero);

    if (!SETTINGS.scriptKey.IsKeyDown()) {
        if (SETTINGS.stealOutOfCombo) {
            trySteal(abilityStolen1, abilityStolen2, abilitySteal, localHero, localPlayer, gameTime, true);
        }
        return;
    }

    const castableAbilities = [abilityFadeBolt, abilityStolen1, abilityStolen2];
    if (!tryCastAbilities(castableAbilities, localHero, localPlayer)) {
        trySteal(abilityStolen1, abilityStolen2, abilitySteal, localHero, localPlayer, gameTime);
    }
}

script.OnUpdate = () => {
    // const startTime = new Date().getTime();

    doUpdate();

    // const endTime = new Date().getTime();
    // const elapsedTime = endTime - startTime;
    // console.log(`doUpdate took ${elapsedTime} ms`);
};

script.OnGameStart = () => {
    HERO_HANDLE_TO_MOST_RECENT_ABILITY = {};
    SELF_SPELL_TIMERS = {};
}

script.OnDraw = () => {
    function drawLineFromLocalHeroToTargetHero() {
        if (!LOCKED_HERO) return;

        let localHero = EntitySystem.GetLocalHero();
        if (!localHero) return;

        Renderer.DrawWorldLine(localHero.GetOrigin(), LOCKED_HERO.GetOrigin());
    }

    drawLineFromLocalHeroToTargetHero();
};

RegisterScript(script);
