---
{"dg-publish":true,"permalink":"/Templates/Character Sheet/"}
---

Home: [[Characters\|Characters]]
## Personal Details
**Species:** 
**Class:** 
**Career:** 
**Career Level:** 
**Career Path:** 
**Size:** 
**Age:** 
**Height:** 
**Hair:** 
**Eyes:** 
**Star Sign:** 
## Fate
**Fate:** 
**Fortune:** 
## Resilience
**Resilience:** 
**Resolve:** 
**Motivation:** 
## Experience
**Current:** 
**Spent:** 
**Total:** 
## Characteristics
| Characteristic  | Initial | Advances | Current |
| --------------- | ------- | -------- | ------- |
| Weapon Skill    |         |          |         |
| Ballistic Skill |         |          |         |
| Strength        |         |          |         |
| Toughness       |         |          |         |
| Initiative      |         |          |         |
| Agility         |         |          |         |
| Dexterity       |         |          |         |
| Intelligence    |         |          |         |
| Willpower       |         |          |         |
| Fellowship      |         |          |         |
## Basic Skills
[[Rules/Skills/Art\|Art]] (Dex) = 
[[Rules/Skills/Athletics\|Athletics]] (Ag) = 
[[Rules/Skills/Bribery\|Bribery]] (Fel) = 
[[Rules/Skills/Charm\|Charm]] (Fel) = 
[[Rules/Skills/Charm Animal\|Charm Animal]] (WP) = 
[[Rules/Skills/Climb\|Climb]] (S) = 
[[Rules/Skills/Cool\|Cool]] (WP) = 
[[Rules/Skills/Consume Alcohol\|Consume Alcohol]] (T) = 
[[Rules/Skills/Dodge\|Dodge]] (Ag) = 
[[Rules/Skills/Drive\|Drive]] (Ag) = 
[[Rules/Skills/Endurance\|Endurance]] (T) = 
[[Rules/Skills/Entertain\|Entertain]] (Fel) = 
[[Rules/Skills/Gamble\|Gamble]] (Int) = 
[[Rules/Skills/Gossip\|Gossip]] (Fel) = 
[[Rules/Skills/Haggle\|Haggle]] (Fel) = 
[[Rules/Skills/Intimidate\|Intimidate]] (S) = 
[[Rules/Skills/Intuition\|Intuition]] (I) = 
[[Rules/Skills/Leadership\|Leadership]] (Fel) = 
[[Rules/Skills/Melee\|Melee]] **(Basic)** (WS) = 
[[Rules/Skills/Melee\|Melee]] (WS) = 

## Grouped & Advanced Skills

## [[Rules/Talents/Talent\|Talents]]
| Name       | Times Taken | Description |
| ---------- | ----------- | ----------- |
| [[Rules/Talents/Doomed\|Doomed]] | 1           |             |
## [[Rules/Trappings/Trappings\|Trappings]]
| Name     | Enc |
| -------- | --- |
| Clothing | –   |
## [[Rules/Trappings/Weapons/Weapon\|Weapons]]
| Name | Group | Enc | Range/Reach | Damage | Qualities |
| ---- | ----- | --- | ----------- | ------ | --------- |
|      |       |     |             |        |           |
## [[Rules/Trappings/Armour/Armour\|Armour]]
| Name | Location | Enc | AP  | Qualities |
| ---- | -------- | --- | --- | --------- |
|      |          |     |     |           |
## [[Rules/Attributes/Ambition\|Ambitions]]
**Short term:**
**Long term:**
## [[Rules/Psychology/Psychology\|Psychology]]
* [[Rules/Psychology/Psychology\|Psychology]]
## [[Rules/Corruption/Corruption\|Corruption]] & [[Rules/Mutations/Mutation\|Mutation]]
* [[Rules/Corruption/Corruption\|Corruption]]
## [[Rules/Tables/Starting Wealth Table\|Wealth]]
**D:** 
**SS:** 
**GC:** 
## [[Spell\|Spell]]s & [[Prayer\|Prayer]]s
| Name | CN  | Range | Target | Duration | Effect |
| ---- | --- | ----- | ------ | -------- | ------ |
| –    |     |       |        |          |        |

```math
# Characteristics
WS=30
BS=30
S=30
T=30
I=30
Ag=30
Dex=30
Int=30
WP=30
Fel=30

# Characteristics Advances
WS_advances=0
BS_advances=0
S_advances=0
T_advances=0
I_advances=0
Ag_advances=0
Dex_advances=0
Int_advances=0
WP_advances=0
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
Art_advances = 0 #spec
Athletics_advances = 0
Bribery_advances = 0
Charm_advances = 0
CharmAnimal_advances = 0
Climb_advances = 0
Cool_advances = 0
ConsumeAlcohol_advances = 0
Dodge_advances = 0
Drive_advances = 0
Endurance_advances = 0
Entertain_advances = 0 # Entertain specialisation
Gamble_advances = 0
Gossip_advances = 0
Haggle_advances = 0
Intimidate_advances = 0
Intuition_advances = 0
Leadership_advances = 0
MeleeBasic_advances = 0
Melee_advances = 0 # Melee specialisation
Navigation_advances = 0
OutdoorSurvival_advances = 0
Perception_advances = 0
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
LanguageBretonnian_advances = 0
Tot_ASA = @sum =>

# Grouped & Advanced Skills
LanguageBretonnian = Int_current + LanguageBretonnian_advances =>

# Total Skill Advances
Tot_ASA + Tot_BSA =>

# FATE & RESILIENCE
Fate = 2
Fortune = 2

## Motivation = Success
Resilience = 2
Resolve = 2

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
