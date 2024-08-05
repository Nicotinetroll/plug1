import AbilityBehavior = Enum.AbilityBehavior;
import TargetTeam = Enum.TargetTeam;
import GameActivity = Enum.GameActivity;

export function hasFlag(flags: AbilityBehavior | TargetTeam, flag: AbilityBehavior | TargetTeam): boolean {
    return (flags & flag) === flag;
}

export function getGameActivityFlags(input: number): string {
    let flags: string[] = [];

    // Iterate over each enum value in GameActivity
    for (const key in GameActivity) {
        if (isNaN(Number(key))) { // Check if key is not a numeric index
            const value = GameActivity[key as keyof typeof GameActivity];
            if (typeof value === 'number' && (input & value) === value) {
                flags.push(key);
            }
        }
    }

    // Join flags with ' | ' separator and return as a string
    return flags.join(" | ");
}
