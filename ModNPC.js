import { ModRecipe } from "./ModRecipe.js";
import { ModTexturedType } from "./ModTexturedType.js"
import { Terraria } from "./ModImports.js";
import { NPCLoader2 } from "./Loaders/NPCLoader2.js";

export class ModNPC extends ModTexturedType {

    NPC = undefined;
    Type = undefined;

    constructor() {
        super();
    }

    SetStaticDefaults() {
      
    }

    SetDefaults() {
     
    }
    
    SetChatButtons(button, button2)
	{
	}
	
	OnKill(npc){
		
	}
    
    PreDraw(spriteBatch, screenPos, drawColor) {
		return true;
    }
    
    PostDraw(spriteBatch, screenPos, drawColor) {
      
    }

    static register(npc) {
        NPCLoader2.register(npc);
    }
    
    static register2(npc) {
        NPCLoader2.register2(npc);
    }

    static isModType(type) {
        return NPCLoader2.isModType(type);
    }

    static isModNPC(npc) {
        return NPCLoader2.isModNPC(npc);
    }

    static getByName(name) {
        return NPCLoader2.getByName(name);
    }

    static getTypeByName(name) {
        return NPCLoader2.getTypeByName(name);
    }

    static getModNPC(type) {
        return NPCLoader2.getModNPC(type);
    }

}