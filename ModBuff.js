import { ModLocalization } from "./ModLocalization.js";
import {ModHooks} from "./ModHooks.js";
import { BuffLoader } from "./Loaders/BuffLoader.js";
import { ModTexturedType } from "./ModTexturedType.js"
import { Terraria, Microsoft } from "./ModImports.js";

export class ModBuff extends ModTexturedType {

    Buff = undefined;
    Type = undefined;

    constructor() {
        super();
    }

    SetStaticDefaults() {
    	this.Buff.Name = Terraria.Lang._buffNameCache[this.Type];
    }

    SetDefaults() {
        // Set default properties for the buff here
    }

    UpdatePlayer(player, buffIndex) {
        // Code to update player with this buff
    }

    UpdateNPC(npc, buffIndex) {
        // Code to update NPC with this buff
    }

    ReApply(player, time, buffIndex) {
        // Code to handle reapplying the buff to a player
        return false;
    }

    ReApplyNPC(npc, time, buffIndex) {
        // Code to handle reapplying the buff to an NPC
        return false;
    }

    ModifyBuffText(refBuffName, refTip, refRare) {
        // Modify the text of the buff's name, tip, and rarity
    }

    CustomBuffTipSize(buffTip, sizes) {
        // Custom code to modify the size of the buff tip
    }

    DrawCustomBuffTip(buffTip, spriteBatch, originX, originY) {
        // Custom code to draw the buff tip
    }

    PreDraw(spriteBatch, buffIndex, drawParams) {
        // Code to handle pre-drawing the buff
        return true;
    }

    PostDraw(spriteBatch, buffIndex, drawParams) {
        // Code to handle post-drawing the buff
    }

    RightClick(buffIndex) {
        // Code to handle right-clicking the buff
        return true;
    }

    static register(buff) {
        BuffLoader.register(buff);
    }

    static isModType(type) {
        return BuffLoader.isModType(type);
    }

    static isModBuff(buff) {
        return BuffLoader.isModBuff(buff);
    }

    static getByName(name) {
        return BuffLoader.getByName(name);
    }

    static getTypeByName(name) {
        return BuffLoader.getTypeByName(name);
    }

    static getModBuff(type) {
        return BuffLoader.getModBuff(type);
    }
}