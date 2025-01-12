
import { Terraria } from "../ModImports.js";

export class ModBiome {
  constructor() {
    this.biomeID = 10;
    this.biomeName = "";
    this.biomeDescription = "";
    this.biomeBackground = new Terraria.Color(0, 0, 0);
    this.biomeMusic = 0;
    this.biomeNPCs = [];
  }

  Register() {
    const newBiomeIndex = Terraria.Main.biome.length;
    Terraria.Main.biome = Terraria.Main.biome.cloneResized(newBiomeIndex + 1);
    Terraria.Main.biome[newBiomeIndex] = this;
    Terraria.WorldGen.UpdateBiomeData();
    return this;
  }

  SetBackground(color) {
    this.biomeBackground = color;
    return this;
  }

  AddNPC(npcID) {
    this.biomeNPCs.push(npcID);
    return this;
  }

  SetMusic(musicID) {
    this.biomeMusic = musicID;
    return this;
  }
}