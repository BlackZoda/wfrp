---
{"dg-publish":true,"permalink":"/0_GM/PCs/Wanda Weltschmertz/"}
---


Home: [[Characters\|Characters]]

**Species:** [[World/Races/Human\|Human]]
**Class:** [[Rules/Class/Academic\|Academic]]
**Career:** [[Rules/Career/Wizard\|Wizard]]
**Career Level:** 1
**Career Path:** [[Rules/Career/Wizard’s Apprentice (level 1)\|Wizard’s Apprentice (level 1)]]
**Size:** Average
**Age:** 24
**Height:** 1.72m 
**Hair:** Blonde
**Eyes:** Blue
**Star Sign:** 

```math
# Characteristics
WS=34
BS=31
S=26
T=32
I=33
Ag=27
Dex=29
Int=36
WP=29
Fel=31

# Characteristics Advances
WS_advances=0
BS_advances=0
S_advances=0
T_advances=0
I_advances=0
Ag_advances=0
Dex_advances=0
Int_advances=4
WP_advances=5
Fel_advances=0
Tot_CharAdvances = @sum =>

# CURRENT CHARACTERISTICS
WS_current = WS+WS_advances=>
BS_current = BS+BS_advances=>
S_current = S+S_advances=>
T_current = T+T_advances=>
I_current = I+I_advances=>
Ag_current = Ag+Ag_advances=>
Dex_current = Dex+Dex_advances=>
Int_current = Int+Int_advances=>
WP_current = WP+WP_advances=>
Fel_current = Fel+Fel_advances=>

# SKILLS

# Basic Skills Advances
Art_advances = 0 # Art specialisation
Athletics_advances = 0
Bribery_advances = 0
Charm_advances = 0
CharmAnimal_advances = 0
Climb_advances = 0
Cool_advances = 5
ConsumeAlcohol_advances = 5
Dodge_advances = 5
Drive_advances = 0
Endurance_advances = 0
Entertain_advances = 0 # Entertain specialisation
Gamble_advances = 0
Gossip_advances = 5
Haggle_advances = 5
Intimidate_advances = 0
Intuition_advances = 5
Leadership_advances = 5
MeleeBasic_advances = 0
Melee_advances = 10 # Melee specialisation
Navigation_advances = 0
OutdoorSurvival_advances = 0
Perception_advances = 5
Ride_advances = 0 # Ride specialisation
Row_advances = 0
Stealth_advances = 0 # Stealth specialisation
Tot_BSA = @sum

# Basic Skills
Art = Dex_current + Art_advances => #spec
Athletics = Ag_current + Athletics_advances =>
Bribery = Fel_current + Bribery_advances =>
Charm = Fel_current + Charm_advances =>
CharmAnimal = WP_current + CharmAnimal_advances =>
Climb = S_current + Climb_advances =>
Cool = WP_current + Cool_advances =>
ConsumeAlcohol = T_current + ConsumeAlcohol_advances =>
Dodge = Ag_current + Dodge_advances =>
Drive = Ag_current + Drive_advances =>
Endurance = T_current + Endurance_advances =>
Entertain = Fel_current + Entertain_advances =>
Gamble = Int_current + Gamble_advances =>
Gossip = Fel_current + Gossip_advances =>
Haggle = Fel_current + Haggle_advances =>
Intimidate = S_current + Intimidate_advances =>
Intuition = I_current + Intuition_advances =>
Leadership = Fel_current + Leadership_advances =>
MeleeBasic = WS_current + MeleeBasic_advances =>
Melee = WS_current + Melee_advances => #spec
Navigation = I_current + Navigation_advances =>
OutdoorSurvival = Int_current + OutdoorSurvival_advances =>
Perception = I_current + Perception_advances =>
Ride = Ag_current +Ride_advances => #spc
Row = S_current + Row_advances =>
Stealth = Ag_current + Stealth_advances => #spec

# Grouped & Advanced Skill Advances
ChannelingAzyr_advances = 5
Evaluate_advances = 3
LanguageMagick_advances = 5
LoreMagic_advances = 5
LoreReikland_advances = 3
MeleePolearm_advances = 10
Tot_ASA = @sum =>

# Grouped & Advanced Skills
ChannelingAzyr = WP_current + ChannelingAzyr_advances =>
Evaluate = Int_current + Evaluate_advances =>
LanguageMagick = Int_current + LanguageMagick_advances =>
LoreMagic = Int_current + LoreMagic_advances =>

# Total Skill Advances
Tot_ASA + Tot_BSA =>

# FATE & RESILIENCE
Fate = 4
Fortune = 4

## Motivation = Success
Resilience = 3
Resolve = 3

# MOVEMENT
Movement = 4 =>
Walk = Movement * 2 =>
Run = Walk * 2 =>

# BONUSES
WSB = floor(WS_current/10) =>
BSB = floor(BS_current/10) =>
SB = floor(S_current/10) =>
TB = floor(T_current/10) =>
IB = floor(I_current/10) =>
AgB = floor(Ag_current/10) =>
DexB = floor(Dex_current/10) =>
IntB = floor(Int_current/10) =>
WPB = floor(WP_current/10) =>

# TRAPPINGS & ENCUMBERANCE

encumberance = 0

# Weapons
# Armour
# Trappings

max_encumberance = SB + TB =>
Enumberance_total = encumberance - 0 =>

# WOUNDS
Hardy = 0 # Times the talent is taken
Wounds = SB + TB * 2 + WPB + TB * Hardy =>
WoundsLost = 0
CurrentWounds = max(Wounds - WoundsLost, 0) =>
```

## [[Rules/Talents/Talent\|Talents]]
| Name                    | Times Taken | Description                         |
| ----------------------- | ----------- | ----------------------------------- |
| [[Rules/Talents/Doomed\|Doomed]]              | 1           | *Thy lips sealed thy fate*          |
| [[Rules/Talents/Linguistics\|Linguistics]]         | 1           | Int test to learn languages         |
| [[Rules/Talents/Perfect Pitch\|Perfect Pitch]]       | 1           | Add [[Rules/Skills/Entertain\|Entertain]] (Sing) to career  |
| [[Rules/Talents/Petty Magic\|Petty Magic]]         | 1           | Learn and cast [[Rules/Magic/Spells/Petty Spells/Petty Spells\|Petty Spells]]     |
| [[Rules/Talents/ReadWrite\|ReadWrite]]           | 1           | You can read and write              |
| [[Rules/Talents/Savvy\|Savvy]]               | 1           | +5 Int, allready included           |
| [[Rules/Talents/Aethyric Attunement\|Aethyric Attunement]] | 1           | No miscast on successful Channeling |
## [[Rules/Trappings/Trappings\|Trappings]]
| Name                   | Enc |
| ---------------------- | --- |
| Clothing               |     |
| [[Rules/Trappings/Weapons/Melee Weapon/Dagger\|Dagger]]             |     |
| [[Rules/Magic/Casting/Grimoire\|Grimoire]]           |     |
| Pouch                  |     |
| [[Rules/Trappings/Weapons/Melee Weapon/Quarter Staff\|Quarter Staff]]      |     |
| Slingbag               |     |
| [[Spell Ingredients\|Spell Ingredients]]  |     |
| [[Writing Kit\|Writing Kit]]        |     |
| 10 Sheets of Parchment |     |
## [[Rules/Trappings/Weapons/Weapon\|Weapons]]
| Name              | Group                  | Enc | Range/Reach | Damage | Qualities                 |
| ----------------- | ---------------------- | --- | ----------- | ------ | ------------------------- |
| [[Rules/Trappings/Weapons/Melee Weapon/Dagger\|Dagger]]        | [[Rules/Trappings/Weapons/Melee Weapon/Basic Melee Weapon\|Basic Melee Weapon]] | 0   | Very Short  | SB + 2 |                           |
| [[Rules/Trappings/Weapons/Melee Weapon/Quarter Staff\|Quarter Staff]] | [[Rules/Trappings/Weapons/Melee Weapon/Polearm Weapon\|Polearm Weapon]]     | 2   | Long        | SB + 4 | [[Rules/Trappings/Weapons/Quaity/Defensive\|Defensive]], [[Rules/Trappings/Weapons/Weapon Quality/Pummel\|Pummel]] |
## [[Rules/Trappings/Armour/Armour\|Armour]]
| Name | Locations | Enc | AP  | Qualities |
| ---- | --------- | --- | --- | --------- |
|      |           |     |     |           |
## [[Rules/Attributes/Ambition\|Ambitions]]
**Short term:**
**Long term:**
## [[Rules/Psychology/Psychology\|Psychology]]
* [[Rules/Psychology/Psychology\|Psychology]]
## [[Rules/Corruption/Corruption\|Corruption]] & [[Rules/Mutations/Mutation\|Mutation]]
* [[Rules/Corruption/Corruption\|Corruption]]
## [[Rules/Tables/Starting Wealth Table\|Wealth]]
**D:** 20
**SS:** 3
**GC:** 
## [[Spell\|Spell]]s & [[Prayer\|Prayer]]s
| Name          | CN  | Range | Target  | Duration | Effect                 |
| ------------- | --- | ----- | ------- | -------- | ---------------------- |
| [[Rules/Magic/Spells/Petty Spells/Gust\|Gust]]      | 0   | 34    | Special | Instant  | Creates a gust of wind |
| [[Rules/Magic/Spells/Petty Spells/Light\|Light]]     | 0   | You   | You     | 34 min   | Create a small light   |
| [[Rules/Magic/Spells/Petty Spells/Open Lock\|Open Lock]] | 0   | Touch | Special | Instant  | Open non-magical locks |