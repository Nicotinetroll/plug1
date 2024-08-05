import {SETTINGS} from "./settings";

export let LOCKED_HERO: Hero = undefined;

export function UpdateHeroLock(localHero: Hero) {
    if (!SETTINGS.scriptKey.IsKeyDown()) {
        LOCKED_HERO = undefined;
        return;
    }

    if (LOCKED_HERO != undefined && !LOCKED_HERO.IsDormant() && LOCKED_HERO.IsExist() && LOCKED_HERO.IsAlive()) {
        return;
    }

    const enemyHeroes = EntitySystem.GetHeroesList().filter(h =>
        !h.IsSameTeam(localHero)
        && !h.IsDormant()
        && h.IsAlive()
        && h.IsExist()
        && !h.IsIllusion())

    const cursorPos = Input.GetWorldCursorPos();

    let shortestDistance = Number.MAX_VALUE;
    let closestEnemy: Hero = undefined;

    for (const enemy of enemyHeroes) {
        if (!enemy.IsAlive()) continue;

        const distance = cursorPos.Distance(enemy.GetOrigin());

        if (distance > SETTINGS.externalSearchRadius) continue;

        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestEnemy = enemy;
        }
    }
    if (closestEnemy != undefined) {
        LOCKED_HERO = closestEnemy;
    }
}
