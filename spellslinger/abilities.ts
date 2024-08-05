import "./settings"

function makeFullPath(abilityName: string): string {
    return `panorama/images/spellicons/${abilityName}.vtex_c`
}

export enum StealPriority {
    Never,
    Low,
    Medium,
    High,
}

export enum OffensiveCast {
    Never,
    OnlyIfSafe,
    AlwaysBetween,
    Always
}

export enum DefensiveCast {
    Never,
    MostInjured,
    ClosestToEnemy,
    Self
}

class AbilityInfo {
    image: string;
    priority: StealPriority
    offensive: OffensiveCast
    defensive: DefensiveCast

    constructor(image: string,
                priority: StealPriority,
                offensive: OffensiveCast,
                defensive: DefensiveCast) {
        this.image = makeFullPath(image);
        this.priority = priority;
        this.offensive = offensive;
        this.defensive = defensive;
    }
}

interface AbilitySettings {
    [abilityName: string]: AbilityInfo;
}

function describe(
    abilityName: string,
    priority: StealPriority,
    offensive: OffensiveCast,
    defensive: DefensiveCast
): { [key: string]: AbilityInfo } {
    return {[abilityName]: new AbilityInfo(abilityName + "_png", priority, offensive, defensive)};
}

export const ABILITIES: AbilitySettings = {
    ...describe("alchemist_acid_spray", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("alchemist_unstable_concoction", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("alchemist_unstable_concoction_throw", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("alchemist_chemical_rage", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("axe_berserkers_call", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("axe_battle_hunger", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("axe_culling_blade", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("bristleback_viscous_nasal_goo", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bristleback_quill_spray", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("centaur_hoof_stomp", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("centaur_double_edge", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("centaur_stampede", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("centaur_work_horse", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("centaur_mount", StealPriority.Never, OffensiveCast.Never, DefensiveCast.MostInjured),

    ...describe("chaos_knight_chaos_bolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("chaos_knight_reality_rift", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("chaos_knight_phantasm", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("dawnbreaker_fire_wreath", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("dawnbreaker_celestial_hammer", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dawnbreaker_solar_guardian", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.MostInjured),

    ...describe("doom_bringer_scorched_earth", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("doom_bringer_doom", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("dragon_knight_breathe_fire", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dragon_knight_dragon_tail", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dragon_knight_elder_dragon_form", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("dragon_knight_fireball", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("earth_spirit_rolling_boulder", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("earth_spirit_boulder_smash", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("earth_spirit_magnetize", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("earth_spirit_geomagnetic_grip", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("earth_spirit_petrify", StealPriority.Never, OffensiveCast.Never, DefensiveCast.MostInjured),

    ...describe("earthshaker_fissure", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("earthshaker_enchant_totem", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("earthshaker_echo_slam", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("elder_titan_echo_stomp", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("elder_titan_ancestral_spirit", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("elder_titan_earth_splitter", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("huskar_inner_fire", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("huskar_life_break", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("kunkka_torrent", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("kunkka_x_marks_the_spot", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("kunkka_ghostship", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("kunkka_torrent_storm", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("kunkka_tidal_wave", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("legion_commander_overwhelming_odds", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("legion_commander_press_the_attack", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("legion_commander_duel", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("life_stealer_rage", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("life_stealer_open_wounds", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("life_stealer_infest", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("mars_spear", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("mars_gods_rebuke", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("mars_arena_of_blood", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("night_stalker_void", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("night_stalker_crippling_fear", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("night_stalker_darkness", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("ogre_magi_fireblast", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ogre_magi_ignite", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ogre_magi_bloodlust", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("ogre_magi_smash", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("ogre_magi_unrefined_fireblast", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("omniknight_purification", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("omniknight_martyr", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("omniknight_hammer_of_purity", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("omniknight_guardian_angel", StealPriority.High, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),

    ...describe("primal_beast_onslaught", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("primal_beast_trample", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("primal_beast_uproar", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("primal_beast_pulverize", StealPriority.Never, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("primal_beast_rock_throw", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("pudge_meat_hook", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("pudge_flesh_heap", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("pudge_dismember", StealPriority.High, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("slardar_sprint", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("slardar_slithereen_crush", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("slardar_amplify_damage", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("spirit_breaker_charge_of_darkness", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("spirit_breaker_bulldoze", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("spirit_breaker_greater_bash", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("spirit_breaker_planar_pocket", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("sven_storm_bolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("sven_warcry", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("sven_gods_strength", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("tidehunter_gush", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tidehunter_anchor_smash", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tidehunter_ravage", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tidehunter_dead_in_the_water", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("shredder_whirling_death", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shredder_timber_chain", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("shredder_chakram", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shredder_flamethrower", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("shredder_reactive_armor", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("shredder_twisted_chakram", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("tiny_avalanche", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tiny_toss", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("tiny_tree_channel", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("treant_natures_grasp", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("treant_leech_seed", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("treant_living_armor", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.MostInjured),
    ...describe("treant_eyes_in_the_forest", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("tusk_ice_shards", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tusk_snowball", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("tusk_tag_team", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("tusk_walrus_punch", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tusk_walrus_kick", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("abyssal_underlord_firestorm", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("abyssal_underlord_pit_of_malice", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("abyssal_underlord_dark_portal", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("undying_decay", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("undying_tombstone", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("undying_soul_rip", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.MostInjured),
    ...describe("undying_flesh_golem", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("skeleton_king_hellfire_blast", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("skeleton_king_bone_guard", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("skeleton_king_reincarnation", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("antimage_blink", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("antimage_counterspell", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("antimage_mana_void", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("antimage_mana_overload", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("arc_warden_flux", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("arc_warden_magnetic_field", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.MostInjured),
    ...describe("arc_warden_spark_wraith", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("arc_warden_tempest_double", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("bloodseeker_bloodrage", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("bloodseeker_blood_bath", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bloodseeker_rupture", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bloodseeker_blood_mist", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("bounty_hunter_shuriken_toss", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bounty_hunter_wind_walk", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Self),
    ...describe("bounty_hunter_track", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("clinkz_strafe", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("clinkz_tar_bomb", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("clinkz_wind_walk", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("clinkz_burning_barrage", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("clinkz_burning_army", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("clinkz_death_pact", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("drow_ranger_wave_of_silence", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("drow_ranger_glacier", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("ember_spirit_searing_chains", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ember_spirit_sleight_of_fist", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ember_spirit_flame_guard", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("ember_spirit_fire_remnant", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("faceless_void_time_walk", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("faceless_void_time_dilation", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("faceless_void_time_zone", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("faceless_void_chronosphere", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("gyrocopter_rocket_barrage", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("gyrocopter_homing_missile", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("gyrocopter_flak_cannon", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("gyrocopter_call_down", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),

    ...describe("hoodwink_acorn_shot", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("hoodwink_bushwhack", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("hoodwink_sharpshooter", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("hoodwink_hunters_boomerang", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("hoodwink_decoy", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("hoodwink_scurry", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("juggernaut_blade_fury", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("juggernaut_healing_ward", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("juggernaut_omni_slash", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("juggernaut_swift_slash", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("luna_lucent_beam", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("luna_moon_glaive", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("luna_eclipse", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("medusa_mystic_snake", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("medusa_stone_gaze", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("meepo_earthbind", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("meepo_poof", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("meepo_petrify", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("monkey_king_boundless_strike", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("monkey_king_tree_dance", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("monkey_king_primal_spring", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("monkey_king_wukongs_command", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("morphling_waveform", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("morphling_adaptive_strike_agi", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("morphling_adaptive_strike_str", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("naga_siren_mirror_image", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("naga_siren_ensnare", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("naga_siren_deluge", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("naga_siren_song_of_the_siren", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("phantom_assassin_stifling_dagger", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("phantom_assassin_phantom_strike", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("phantom_assassin_blur", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("phantom_assassin_fan_of_knives", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("phantom_lancer_spirit_lance", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("phantom_lancer_doppelwalk", StealPriority.Low, OffensiveCast.AlwaysBetween, DefensiveCast.Self),
    ...describe("phantom_lancer_juxtapose", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("razor_plasma_field", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("razor_static_link", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("razor_eye_of_the_storm", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("riki_smoke_screen", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("riki_tricks_of_the_trade", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("riki_blink_strike", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("nevermore_shadowraze1", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("nevermore_shadowraze2", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("nevermore_shadowraze3", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("nevermore_requiem", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("slark_dark_pact", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("slark_pounce", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("slark_shadow_dance", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("slark_depth_shroud", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),

    ...describe("sniper_take_aim", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("sniper_assassinate", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("sniper_concussive_grenade", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("sniper_shrapnel", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("spectre_spectral_dagger", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("spectre_haunt_single", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("spectre_haunt", StealPriority.High, OffensiveCast.Always, DefensiveCast.Self),

    ...describe("templar_assassin_refraction", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("templar_assassin_meld", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("templar_assassin_trap", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("templar_assassin_psionic_trap", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("templar_assassin_trap_teleport", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("terrorblade_reflection", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("terrorblade_conjure_image", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("terrorblade_metamorphosis", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("terrorblade_sunder", StealPriority.High, OffensiveCast.Never, DefensiveCast.MostInjured),
    ...describe("terrorblade_demon_zeal", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("terrorblade_terror_wave", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("troll_warlord_whirling_axes_ranged", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("troll_warlord_whirling_axes_melee", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("troll_warlord_battle_trance", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("ursa_earthshock", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("ursa_overpower", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("ursa_enrage", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("viper_nethertoxin", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("viper_viper_strike", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("viper_nose_dive", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("weaver_the_swarm", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("weaver_shukuchi", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("weaver_time_lapse", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("ancient_apparition_cold_feet", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ancient_apparition_ice_vortex", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("ancient_apparition_ice_blast", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("ancient_apparition_ice_blast_release", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("crystal_maiden_crystal_nova", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("crystal_maiden_frostbite", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("crystal_maiden_crystal_clone", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("crystal_maiden_freezing_field", StealPriority.High, OffensiveCast.Always, DefensiveCast.Self),

    ...describe("death_prophet_carrion_swarm", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("death_prophet_spirit_siphon", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("death_prophet_exorcism", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("disruptor_thunder_strike", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("disruptor_glimpse", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("disruptor_kinetic_fence", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("disruptor_static_storm", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("disruptor_kinetic_field", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("enchantress_enchant", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("enchantress_natures_attendants", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("enchantress_bunny_hop", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("enchantress_little_friends", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("grimstroke_dark_artistry", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("grimstroke_ink_creature", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("grimstroke_spirit_walk", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("grimstroke_soul_chain", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("grimstroke_dark_portrait", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("jakiro_dual_breath", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("jakiro_ice_path", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("jakiro_macropyre", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("keeper_of_the_light_illuminate", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("keeper_of_the_light_blinding_light", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("keeper_of_the_light_chakra_magic", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("keeper_of_the_light_spirit_form", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("keeper_of_the_light_radiant_bind", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("keeper_of_the_light_recall", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    // leshrac's ability cooldowns are bugged: `leshrac_pulse_nova` and `leshrac_greater_lightning_storm` never show as used
    ...describe("leshrac_split_earth", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("leshrac_diabolic_edict", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("leshrac_lightning_storm", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("leshrac_pulse_nova", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("leshrac_greater_lightning_storm", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("lich_frost_nova", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lich_frost_shield", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("lich_sinister_gaze", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lich_chain_frost", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lich_ice_spire", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),

    ...describe("lina_dragon_slave", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lina_light_strike_array", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lina_laguna_blade", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lina_flame_cloak", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("lion_impale", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lion_voodoo", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lion_mana_drain", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("lion_finger_of_death", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("muerta_dead_shot", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("muerta_the_calling", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("muerta_pierce_the_veil", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("muerta_parting_shot", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("furion_sprout", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("furion_teleportation", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("furion_force_of_nature", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("furion_wrath_of_nature", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("furion_curse_of_the_forest", StealPriority.High, OffensiveCast.Always, DefensiveCast.Self),

    ...describe("necrolyte_death_pulse", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("necrolyte_ghost_shroud", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    // `OffensiveCast.Never` because we want kill stealer to cast it for us
    ...describe("necrolyte_reapers_scythe", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("necrolyte_death_seeker", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),

    ...describe("oracle_fortunes_end", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("oracle_fates_edict", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.ClosestToEnemy),
    ...describe("oracle_purifying_flames", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("oracle_false_promise", StealPriority.High, OffensiveCast.Never, DefensiveCast.MostInjured),
    ...describe("oracle_rain_of_destiny", StealPriority.High, OffensiveCast.Never, DefensiveCast.MostInjured),

    ...describe("obsidian_destroyer_astral_imprisonment", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("obsidian_destroyer_sanity_eclipse", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("puck_illusory_orb", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("puck_waning_rift", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("puck_phase_shift", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("puck_dream_coil", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("pugna_nether_blast", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("pugna_decrepify", StealPriority.Never, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("pugna_nether_ward", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("pugna_life_drain", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("queenofpain_shadow_strike", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("queenofpain_blink", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("queenofpain_scream_of_pain", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("queenofpain_sonic_wave", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("shadow_demon_disruption", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("shadow_demon_disseminate", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_demon_shadow_poison", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_demon_demonic_purge", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_demon_demonic_cleanse", StealPriority.High, OffensiveCast.Never, DefensiveCast.MostInjured),

    ...describe("shadow_shaman_ether_shock", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_shaman_voodoo", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_shaman_shackles", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("shadow_shaman_mass_serpent_ward", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),

    ...describe("silencer_curse_of_the_silent", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("silencer_global_silence", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("skywrath_mage_arcane_bolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("skywrath_mage_concussive_shot", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("skywrath_mage_ancient_seal", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("skywrath_mage_mystic_flare", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("storm_spirit_static_remnant", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("storm_spirit_electric_vortex", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("storm_spirit_ball_lightning", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("storm_spirit_overload", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("tinker_laser", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("tinker_march_of_the_machines", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("tinker_defense_matrix", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("tinker_keen_teleport", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("tinker_warp_grenade", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("warlock_fatal_bonds", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("warlock_shadow_word", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.MostInjured),
    ...describe("warlock_upheaval", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("warlock_rain_of_chaos", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("witch_doctor_paralyzing_cask", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("witch_doctor_voodoo_restoration", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    // "witch_doctor_maledict" is `StealPriority.High` instead of Medium because the StealPriority is used as the cast order,
    // and we want to cast maledict before any other offensive ability, like "rubick_fade_bolt".
    ...describe("witch_doctor_maledict", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("witch_doctor_death_ward", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("witch_doctor_voodoo_switcheroo", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("zuus_arc_lightning", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("zuus_lightning_bolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("zuus_heavenly_jump", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("zuus_thundergods_wrath", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("zuus_cloud", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("abaddon_death_coil", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.MostInjured),
    ...describe("abaddon_aphotic_shield", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("abaddon_borrowed_time", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("bane_enfeeble", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bane_brain_sap", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("bane_nightmare", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("bane_fiends_grip", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("batrider_sticky_napalm", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("batrider_flamebreak", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("batrider_firefly", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("batrider_flaming_lasso", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("beastmaster_wild_axes", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("beastmaster_call_of_the_wild_boar", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("beastmaster_call_of_the_wild_hawk", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("beastmaster_inner_beast", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("beastmaster_primal_roar", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("brewmaster_thunder_clap", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("brewmaster_cinder_brew", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("brewmaster_primal_split", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("broodmother_insatiable_hunger", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("broodmother_spin_web", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("broodmother_spawn_spiderlings", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("broodmother_sticky_snare", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("chen_penitence", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("chen_holy_persuasion", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("chen_hand_of_god", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("rattletrap_battery_assault", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("rattletrap_power_cogs", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("rattletrap_rocket_flare", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("rattletrap_hookshot", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("rattletrap_jetpack", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("rattletrap_overclocking", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("dark_seer_vacuum", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dark_seer_ion_shell", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.ClosestToEnemy),
    ...describe("dark_seer_surge", StealPriority.Low, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("dark_seer_wall_of_replica", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("dark_willow_bramble_maze", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dark_willow_shadow_realm", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("dark_willow_cursed_crown", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dark_willow_terrorize", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("dark_willow_bedlam", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Self),

    ...describe("dazzle_poison_touch", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    // `DefensiveCast.Never` because we want auto saver cast to shallow grave for us
    ...describe("dazzle_shallow_grave", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("dazzle_shadow_wave", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("dazzle_bad_juju", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("enigma_malefice", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("enigma_demonic_conversion", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("enigma_midnight_pulse", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("enigma_black_hole", StealPriority.High, OffensiveCast.AlwaysBetween, DefensiveCast.Never),

    ...describe("invoker_cold_snap", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("invoker_ghost_walk", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("invoker_ice_wall", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("invoker_emp", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("invoker_tornado", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("invoker_alacrity", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("invoker_deafening_blast", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    // Melonity isn't happy when "invoker_sun_strike"" is on Rubick instead of Invoker; lots of errors in log
    ...describe("invoker_sun_strike", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("invoker_forge_spirit", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("invoker_chaos_meteor", StealPriority.Medium, OffensiveCast.AlwaysBetween, DefensiveCast.Never),

    ...describe("wisp_tether", StealPriority.Low, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("wisp_spirits", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("wisp_overcharge", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("wisp_relocate", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("lone_druid_spirit_bear", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lone_druid_savage_roar_bear", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lone_druid_true_form", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lone_druid_spirit_link", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("lycan_summon_wolves", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lycan_howl", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lycan_shapeshift", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("lycan_wolf_bite", StealPriority.High, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),

    ...describe("magnataur_shockwave", StealPriority.High, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("magnataur_empower", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("magnataur_skewer", StealPriority.Low, OffensiveCast.OnlyIfSafe, DefensiveCast.Never),
    ...describe("magnataur_reverse_polarity", StealPriority.High, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("magnataur_horn_toss", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),

    ...describe("marci_grapple", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("marci_companion_run", StealPriority.Low, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("marci_bodyguard", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.ClosestToEnemy),
    ...describe("marci_unleash", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("mirana_starfall", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Self),
    ...describe("mirana_arrow", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("mirana_leap", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("mirana_invis", StealPriority.High, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("nyx_assassin_impale", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("nyx_assassin_jolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
    // `DefensiveCast.Never` because we want auto dodge activate this for us
    ...describe("nyx_assassin_spiked_carapace", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("nyx_assassin_vendetta", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("nyx_assassin_burrow", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),

    ...describe("pangolier_swashbuckle", StealPriority.Low, OffensiveCast.AlwaysBetween, DefensiveCast.Never),
    ...describe("pangolier_shield_crash", StealPriority.Never, OffensiveCast.Never, DefensiveCast.Never),
    ...describe("pangolier_gyroshell", StealPriority.Medium, OffensiveCast.Never, DefensiveCast.Self),
    // `DefensiveCast.Never` because we want autosaver activate this one for us
    ...describe("pangolier_rollup", StealPriority.Low, OffensiveCast.Never, DefensiveCast.Never),

    ...describe("phoenix_fire_spirits", StealPriority.Low, OffensiveCast.Always, DefensiveCast.Never),
    ...describe("phoenix_launch_fire_spirit", StealPriority.Low, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("phoenix_icarus_dive", StealPriority.Never, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("phoenix_sun_ray", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("phoenix_supernova", StealPriority.High, OffensiveCast.Never , DefensiveCast.Never),

    ...describe("sandking_burrowstrike", StealPriority.Low, OffensiveCast.OnlyIfSafe , DefensiveCast.Never),
    ...describe("sandking_sand_storm", StealPriority.Medium, OffensiveCast.Never , DefensiveCast.Self),
    ...describe("sandking_epicenter", StealPriority.High, OffensiveCast.Always , DefensiveCast.Never),

    ...describe("snapfire_scatterblast", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("snapfire_firesnap_cookie", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("snapfire_lil_shredder", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Self),
    ...describe("snapfire_mortimer_kisses", StealPriority.High, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("snapfire_gobble_up", StealPriority.Medium, OffensiveCast.Never , DefensiveCast.ClosestToEnemy),
    ...describe("snapfire_spit_creep", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),

    ...describe("techies_sticky_bomb", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("techies_reactive_tazer", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Self),
    ...describe("techies_suicide", StealPriority.Low, OffensiveCast.OnlyIfSafe , DefensiveCast.Never),
    ...describe("techies_land_mines", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),

    ...describe("vengefulspirit_magic_missile", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("vengefulspirit_wave_of_terror", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("vengefulspirit_nether_swap", StealPriority.Medium, OffensiveCast.OnlyIfSafe , DefensiveCast.MostInjured),

    ...describe("venomancer_venomous_gale", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("venomancer_plague_ward", StealPriority.Medium, OffensiveCast.AlwaysBetween , DefensiveCast.Never),
    ...describe("venomancer_noxious_plague", StealPriority.High, OffensiveCast.Always , DefensiveCast.Never),

    ...describe("visage_grave_chill", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("visage_soul_assumption", StealPriority.Medium, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("visage_summon_familiars", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("visage_gravekeepers_cloak", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("visage_silent_as_the_grave", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Self),

    ...describe("void_spirit_aether_remnant", StealPriority.Medium, OffensiveCast.AlwaysBetween , DefensiveCast.Never),
    ...describe("void_spirit_dissimilate", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Never),
    ...describe("void_spirit_resonant_pulse", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("void_spirit_astral_step", StealPriority.Low, OffensiveCast.OnlyIfSafe , DefensiveCast.Never),

    ...describe("windrunner_shackleshot", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("windrunner_powershot", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("windrunner_windrun", StealPriority.Low, OffensiveCast.Never , DefensiveCast.Self),
    // "windrunner_focusfire" has `DefensiveCast.Self` because the AOE facet cannot be cast on a target
    ...describe("windrunner_focusfire", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Self),
    ...describe("windrunner_gale_force", StealPriority.Medium, OffensiveCast.AlwaysBetween , DefensiveCast.Never),

    ...describe("winter_wyvern_arctic_burn", StealPriority.Medium, OffensiveCast.Never , DefensiveCast.Self),
    ...describe("winter_wyvern_splinter_blast", StealPriority.Medium, OffensiveCast.Always , DefensiveCast.Never),
    ...describe("winter_wyvern_cold_embrace", StealPriority.Medium, OffensiveCast.Never , DefensiveCast.MostInjured),
    ...describe("winter_wyvern_winters_curse", StealPriority.High, OffensiveCast.Never , DefensiveCast.Never),

    ...describe("rubick_fade_bolt", StealPriority.Medium, OffensiveCast.Always, DefensiveCast.Never),
}

export function getAbilityImagesByStealPriority(priority: StealPriority): string[] {
    return Object.entries(ABILITIES)
        .filter(([, abilityInfo]) => abilityInfo.priority === priority)
        .map(([, abilityInfo]) => abilityInfo.image);
}

export function getAbilityImagesByOffensiveCast(offensive: OffensiveCast): string[] {
    return Object.entries(ABILITIES)
        .filter(([, abilityInfo]) => abilityInfo.offensive === offensive)
        .map(([, abilityInfo]) => abilityInfo.image);
}

export function getAbilityImagesByDefensiveCast(defensive: DefensiveCast): string[] {
    return Object.entries(ABILITIES)
        .filter(([, abilityInfo]) => abilityInfo.defensive === defensive)
        .map(([, abilityInfo]) => abilityInfo.image);
}

// avoid bkb
// avoid lotus