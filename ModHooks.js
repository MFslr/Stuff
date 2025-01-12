import { Terraria, ReLogic, Microsoft } from "./ModImports.js";

import { ExamplePlayer } from "../Main/ExamplePlayer.js";

import { ModPlayer } from "./ModPlayer.js";
import { ModTexture } from "./ModTexture.js";
import { TileData } from "./TileData.js";

import { ModProjectile } from "./ModProjectile.js";

import { GlobalTile } from "./GlobalTile.js";
import { GlobalItem } from "./GlobalItem.js";
import { GlobalNPC } from "./GlobalNPC.js";
import { GlobalProjectile } from "./GlobalProjectile.js";

import { ItemLoader } from "./Loaders/ItemLoader.js";
import { BuffLoader } from "./Loaders/BuffLoader.js";
import { NPCLoader } from "./Loaders/NPCLoader.js";
import { NPCLoader2 } from "./Loaders/NPCLoader2.js";
import { CombinedLoader } from "./Loaders/CombinedLoader.js";
import { PlayerLoader } from "./Loaders/PlayerLoader.js";

const DustID = new NativeClass('Terraria.ID', 'DustID')
            
              function mNext(maxValue){
return Terraria.Main.rand['int Next(int maxValue)'](maxValue)
}

export class ModHooks {
	
	static OnHitTemp = [];
    static ExtractinatorTemp = {};

    static isInitialized = false;

    static initialize() {
        if (ModHooks.isInitialized) return;
        
        
        
        
        Terraria.Main.Initialize_AlmostEverything.hook((original, self) => {
    original(self);
    BuffLoader.InitializeRegisteredBuffs();
    NPCLoader2.InitializeRegisteredNPCs();
    ItemLoader.InitializeRegisteredItems();
    ModProjectile.InitializeRegisteredProjectiles();
    
});
        
   /*Terraria.NPC.GetBossHeadTextureIndex.hook((original, self) => {
   if(self.type == 689){
   return 39
   }
    return original(self);
    })*/
    
        Terraria.Projectile.SetDefaults.hook((original, self, type) => {
            original(self, type);
            
            for (let proj of GlobalProjectile.RegisteredProjectile) {
                proj.SetDefaults(self);
             }
            
            const projectile = ModProjectile.getModProjectile(type);
            projectile?.SetStaticDefaults();
            projectile?.SetDefaults();
            //tl.log("Projectile.SetDefaults: " + JSON.stringify(projectile?.Projectile));
            Object.assign(self, projectile?.Projectile);
        });

        Terraria.WorldGen.KillTile.hook((original, i, j, fail, effectOnly, noItem) => {
            original(i, j, fail, effectOnly, noItem);

            const tileData = new TileData(i, j);
            let tileType = tileData.type;

            for (let tile of GlobalTile.RegisteredTiles) {
                tile.KillTile(i, j, tileType, fail, effectOnly, noItem);
            }
        })
        
        Terraria.NPC.SetDefaults.hook((original, self, type, spawnparams) => {
    original(self, type, spawnparams);
    
    if(type <= 687){
   for (let npc of GlobalNPC.RegisteredNPC) {
   npc.SetDefaults(self);
   }
   }
            
            if(self.type == 1){
              //Terraria.Main.npcShop[type]
              //self.aiStyle = 7
              self.townNPC = true
              self.friendly = true
              
             // Terraria.Main.LocalPlayer.TalkNPC.SetChatButtons("texto", "texto2")
              
            }
            
            const npc = NPCLoader2.getModNPC(type);
            npc?.SetDefaults();
            npc?.SetStaticDefaults();
            Object.assign(self, npc?.NPC);
          })
          
          Terraria.NPC.GetChat.hook((original, type) => {
            
const messages = [
    "Eu te amo meu Mestre...",
    "Você é incrível!",
    "Sempre ao seu lado, mestre.",
    "Pronto para servir!",
    "Seu fiel seguidor está aqui.",
    "Obrigado por tudo, mestre.",
    "Estou aqui para você.",
    "Vamos conquistar o mundo juntos!",
    "Sempre prontos para a batalha.",
    "Seu comando é minha missão."
];

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}


if (type.type == 1) {
    return getRandomMessage();
}

            
            return original(type)
          })
          
          let abc = false
          
          Terraria.Main.GUIChatDraw.hook((original, self) => {
            //original(self)
            
            
            //tl.log(`talkNPC: ${Terraria.Main.player[Terraria.Main.myPlayer].talkNPC}`)
            
            //tl.log(JSON.stringify(Object.keys(Terraria.Main.player[Terraria.Main.myPlayer].talkNPC), null, 4));
            
            if (Terraria.Main.player[Terraria.Main.myPlayer].talkNPC == 1)
           
                {
                	tl.log(`talkSlime: ${Terraria.Main.player[Terraria.Main.myPlayer].talkNPC}`)
                   //return Terraria.Main.OpenShop(7);
                }
                
           
            
            original(self)
            
          })
          
          

        Terraria.NPC.AI.hook((original, self) => {
            original(self);
            
            if(self.type == 1 && !self.SpawnedFromStatue){
            self.ai[1] = 1
            }
            
            for (let npc of GlobalNPC.RegisteredNPC) {
                npc.NPCAI(self);
            }
            
if(self.type == 689){
if (mNext(5) == 0) {
     let dust = Terraria.Dust.NewDust(self.position, self.width + 4, self.height + 4, DustID.GoldCoin, self.velocity.X * 0.4, self.velocity.Y * 0.4, 100, Microsoft.Xna.Framework.Graphics.Color.new(), 2);
} }
       
if(self.type == 688){
	
	Terraria.Main.spriteBatch['void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color)'](Terraria.GameContent.TextureAssets.Npc[688].Value, self.position, null, Microsoft.Xna.Framework.Graphics.Color.new());
	
if (mNext(5) == 0) {
let dust = Terraria.Dust.NewDust(self.position, self.width + 4, self.height + 4, DustID.SilverCoin, self.velocity.X * 0.4, self.velocity.Y * 0.4, 100, Microsoft.Xna.Framework.Graphics.Color.new(), 2);
} }
        
        });
        
        Terraria.Projectile.AI.hook((original, self) => {
    original(self); 
});

        Terraria.NPC.NPCLoot.hook((original, self) => {
            if (!NPCLoader.PreKill(self)) {
                return;
            }
            
            original(self);
            
            NPCLoader.NPCLoot(self);
            NPCLoader.OnKill(self);
            //NPCLoader2.OnKill(self);
        });
        
        
        Terraria.Chest.SetupShop.hook((original, self, type) => {
            original(self, type);
            
            let nextSlot = 0;
            for (let i = 0; i < 40; i++) {
                const item = self.item[i];
                if (item.type > 0) {
                    nextSlot++;
                }
            }
            for (let j = 0; j < nextSlot; j++) {
                self.item[j].isAShopItem = true;
            }
            
            NPCLoader.SetupShop(type, self, nextSlot);
            
        });

        Terraria.Player.Update.hook((original, self, a) => {
        
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PreUpdate();
            }
            original(self, a);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PostUpdate();
            }
            
            
            
        })

        
Terraria.Lang.GetItemName.hook((original, id) => {
   
    id = Terraria.ID.ItemID.FromNetId(id);

    if (id < ItemLoader.MAX_VANILLA_ID) {
        return original(id);
    }

    const cache = Terraria.Lang._itemNameCache;

    if (id > 0 && cache[id] != null) {
        return cache[id];
    }

    return Terraria.Localization.LocalizedText.Empty;
});

        Terraria.Item.Prefix.hook((original, self, pre) => {
            if (self.type < ItemLoader.MAX_VANILLA_ID) {
                return original(self, pre);
            }

            if (pre === 0 || self.type === 0) {
                return false;
            }

            let unifiedRandom = Terraria.WorldGen ? Terraria.WorldGen.genRand : Terraria.Main.rand;
            let prefix = pre;
            let damage = 1.0;
            let knockBack = 1.0;
            let animation = 1.0;
            let scale = 1.0;
            let shootSpeed = 1.0;
            let mana = 1.0;
            let crit = 0;
            let flag = true;
            while (flag) {
                damage = 1.0;
                knockBack = 1.0;
                animation = 1.0;
                scale = 1.0;
                shootSpeed = 1.0;
                mana = 1.0;
                crit = 0;
                flag = false;
                if (pre === -1 && unifiedRandom['int Next(int maxValue)'](4) === 0) {
                    prefix = 0;
                }

                if (pre < -1) {
                    prefix = -1;
                }

                if (prefix === -1 || prefix === -2 || prefix === -3) {
                    const modPrefix = ItemLoader.ChoosePrefix(self, unifiedRandom);
					if (modPrefix >= 0) {
					    prefix = modPrefix;
					} else if (ItemLoader.MeleePrefix(self)) {
                        let meleeRandom = unifiedRandom['int Next(int maxValue)'](40);
                        switch (meleeRandom) {
                            case 0:
                                prefix = 1;
                                break;
                            case 1:
                                prefix = 2;
                                break;
                            case 2:
                                prefix = 3;
                                break;
                            case 3:
                                prefix = 4;
                                break;
                            case 4:
                                prefix = 5;
                                break;
                            case 5:
                                prefix = 6;
                                break;
                            case 6:
                                prefix = 7;
                                break;
                            case 7:
                                prefix = 8;
                                break;
                            case 8:
                                prefix = 9;
                                break;
                            case 9:
                                prefix = 10;
                                break;
                            case 10:
                                prefix = 11;
                                break;
                            case 11:
                                prefix = 12;
                                break;
                            case 12:
                                prefix = 13;
                                break;
                            case 13:
                                prefix = 14;
                                break;
                            case 14:
                                prefix = 15;
                                break;
                            case 15:
                                prefix = 36;
                                break;
                            case 16:
                                prefix = 37;
                                break;
                            case 17:
                                prefix = 38;
                                break;
                            case 18:
                                prefix = 53;
                                break;
                            case 19:
                                prefix = 54;
                                break;
                            case 20:
                                prefix = 55;
                                break;
                            case 21:
                                prefix = 39;
                                break;
                            case 22:
                                prefix = 40;
                                break;
                            case 23:
                                prefix = 56;
                                break;
                            case 24:
                                prefix = 41;
                                break;
                            case 25:
                                prefix = 57;
                                break;
                            case 26:
                                prefix = 42;
                                break;
                            case 27:
                                prefix = 43;
                                break;
                            case 28:
                                prefix = 44;
                                break;
                            case 29:
                                prefix = 45;
                                break;
                            case 30:
                                prefix = 46;
                                break;
                            case 31:
                                prefix = 47;
                                break;
                            case 32:
                                prefix = 48;
                                break;
                            case 33:
                                prefix = 49;
                                break;
                            case 34:
                                prefix = 50;
                                break;
                            case 35:
                                prefix = 51;
                                break;
                            case 36:
                                prefix = 59;
                                break;
                            case 37:
                                prefix = 60;
                                break;
                            case 38:
                                prefix = 61;
                                break;
                            case 39:
                                prefix = 81;
                                break;
                        }
                    } else if (ItemLoader.WeaponPrefix(self)) {
                        let weaponRandom = unifiedRandom['int Next(int maxValue)'](14);
                        switch (weaponRandom) {
                            case 0:
                                prefix = 36;
                                break;
                            case 1:
                                prefix = 37;
                                break;
                            case 2:
                                prefix = 38;
                                break;
                            case 3:
                                prefix = 53;
                                break;
                            case 4:
                                prefix = 54;
                                break;
                            case 5:
                                prefix = 55;
                                break;
                            case 6:
                                prefix = 39;
                                break;
                            case 7:
                                prefix = 40;
                                break;
                            case 8:
                                prefix = 56;
                                break;
                            case 9:
                                prefix = 41;
                                break;
                            case 10:
                                prefix = 57;
                                break;
                            case 11:
                                prefix = 59;
                                break;
                            case 12:
                                prefix = 60;
                                break;
                            case 13:
                                prefix = 61;
                                break;
                        }
                    } else if (ItemLoader.RangedPrefix(self)) {
                        let rangedRandom = unifiedRandom['int Next(int maxValue)'](35);
                        switch (rangedRandom) {
                            case 0:
                                prefix = 16;
                                break;
                            case 1:
                                prefix = 17;
                                break;
                            case 2:
                                prefix = 18;
                                break;
                            case 3:
                                prefix = 19;
                                break;
                            case 4:
                                prefix = 20;
                                break;
                            case 5:
                                prefix = 21;
                                break;
                            case 6:
                                prefix = 22;
                                break;
                            case 7:
                                prefix = 23;
                                break;
                            case 8:
                                prefix = 24;
                                break;
                            case 9:
                                prefix = 25;
                                break;
                            case 10:
                                prefix = 58;
                                break;
                            case 11:
                                prefix = 36;
                                break;
                            case 12:
                                prefix = 37;
                                break;
                            case 13:
                                prefix = 38;
                                break;
                            case 14:
                                prefix = 53;
                                break;
                            case 15:
                                prefix = 54;
                                break;
                            case 16:
                                prefix = 55;
                                break;
                            case 17:
                                prefix = 39;
                                break;
                            case 18:
                                prefix = 40;
                                break;
                            case 19:
                                prefix = 56;
                                break;
                            case 20:
                                prefix = 41;
                                break;
                            case 21:
                                prefix = 57;
                                break;
                            case 22:
                                prefix = 42;
                                break;
                            case 23:
                                prefix = 44;
                                break;
                            case 24:
                                prefix = 45;
                                break;
                            case 25:
                                prefix = 46;
                                break;
                            case 26:
                                prefix = 47;
                                break;
                            case 27:
                                prefix = 48;
                                break;
                            case 28:
                                prefix = 49;
                                break;
                            case 29:
                                prefix = 50;
                                break;
                            case 30:
                                prefix = 51;
                                break;
                            case 31:
                                prefix = 59;
                                break;
                            case 32:
                                prefix = 60;
                                break;
                            case 33:
                                prefix = 61;
                                break;
                            case 34:
                                prefix = 82;
                                break;
                        }
                    } else if (ItemLoader.MagicPrefix(self)) {
                        let magicRandom = unifiedRandom['int Next(int maxValue)'](36);
                        switch (magicRandom) {
                            case 0:
                                prefix = 26;
                                break;
                            case 1:
                                prefix = 27;
                                break;
                            case 2:
                                prefix = 28;
                                break;
                            case 3:
                                prefix = 29;
                                break;
                            case 4:
                                prefix = 30;
                                break;
                            case 5:
                                prefix = 31;
                                break;
                            case 6:
                                prefix = 32;
                                break;
                            case 7:
                                prefix = 33;
                                break;
                            case 8:
                                prefix = 34;
                                break;
                            case 9:
                                prefix = 35;
                                break;
                            case 10:
                                prefix = 52;
                                break;
                            case 11:
                                prefix = 36;
                                break;
                            case 12:
                                prefix = 37;
                                break;
                            case 13:
                                prefix = 38;
                                break;
                            case 14:
                                prefix = 53;
                                break;
                            case 15:
                                prefix = 54;
                                break;
                            case 16:
                                prefix = 55;
                                break;
                            case 17:
                                prefix = 39;
                                break;
                            case 18:
                                prefix = 40;
                                break;
                            case 19:
                                prefix = 56;
                                break;
                            case 20:
                                prefix = 41;
                                break;
                            case 21:
                                prefix = 57;
                                break;
                            case 22:
                                prefix = 42;
                                break;
                            case 23:
                                prefix = 43;
                                break;
                            case 24:
                                prefix = 44;
                                break;
                            case 25:
                                prefix = 45;
                                break;
                            case 26:
                                prefix = 46;
                                break;
                            case 27:
                                prefix = 47;
                                break;
                            case 28:
                                prefix = 48;
                                break;
                            case 29:
                                prefix = 49;
                                break;
                            case 30:
                                prefix = 50;
                                break;
                            case 31:
                                prefix = 51;
                                break;
                            case 32:
                                prefix = 59;
                                break;
                            case 33:
                                prefix = 60;
                                break;
                            case 34:
                                prefix = 61;
                                break;
                            case 35:
                                prefix = 83;
                                break;
                        }
                    } else {
                        if (!self.IsAPrefixableAccessory()) {
                            return false;
                        }
                        prefix = unifiedRandom['int Next(int minValue, int maxValue)'](62, 81);
                    }
                }

                switch (pre) {
                    case -3:
						return true;
					case -1: {
                        if ((prefix === 7 || prefix === 8 || prefix === 9 || prefix === 10 || prefix === 11 || prefix === 22 || prefix === 23 ||
                            prefix === 24 || prefix === 29 ||prefix === 30 || prefix === 31 || prefix === 39 || prefix === 40 || prefix === 56 ||
                            prefix === 41 || prefix === 47 || prefix === 48 || prefix === 49) && !unifiedRandom['int Next(int maxValue)'](3) !== 0) {
                            prefix = 0;
                        }
                        break;
                    }	
                }

                switch (prefix) {
                    case 1:
                        scale = 1.12;
                        break;
                    case 2:
                        scale = 1.18;
                        break;
                    case 3:
                        damage = 1.05;
                        crit = 2;
                        scale = 1.05;
                        break;
                    case 4:
                        damage = 1.1;
                        scale = 1.1;
                        knockBack = 1.1;
                        break;
                    case 5:
                        damage = 1.15;
                        break;
                    case 6:
                        damage = 1.1;
                        break;
                    case 81:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        scale = 1.1;
                        break;
                    case 7:
                        scale = 0.82;
                        break;
                    case 8:
                        knockBack = 0.85;
                        damage = 0.85;
                        scale = 0.87;
                        break;
                    case 9:
                        scale = 0.9;
                        break;
                    case 10:
                        damage = 0.85;
                        break;
                    case 11:
                        animation = 1.1;
                        knockBack = 0.9;
                        scale = 0.9;
                        break;
                    case 12:
                        knockBack = 1.1;
                        damage = 1.05;
                        scale = 1.1;
                        animation = 1.15;
                        break;
                    case 13:
                        knockBack = 0.8;
                        damage = 0.9;
                        scale = 1.1;
                        break;
                    case 14:
                        knockBack = 1.15;
                        animation = 1.1;
                        break;
                    case 15:
                        knockBack = 0.9;
                        animation = 0.85;
                        break;
                    case 16:
                        damage = 1.1;
                        crit = 3;
                        break;
                    case 17:
                        animation = 0.85;
                        shootSpeed = 1.1;
                        break;
                    case 18:
                        animation = 0.9;
                        shootSpeed = 1.15;
                        break;
                    case 19:
                        knockBack = 1.15;
                        shootSpeed = 1.05;
                        break;
                    case 20:
                        knockBack = 1.05;
                        shootSpeed = 1.05;
                        damage = 1.1;
                        animation = 0.95;
                        crit = 2;
                        break;
                    case 21:
                        knockBack = 1.15;
                        damage = 1.1;
                        break;
                    case 82:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        shootSpeed = 1.1;
                        break;
                    case 22:
                        knockBack = 0.9;
                        shootSpeed = 0.9;
                        damage = 0.85;
                        break;
                    case 23:
                        animation = 1.15;
                        shootSpeed = 0.9;
                        break;
                    case 24:
                        animation = 1.1;
                    knockBack = 0.8;
                        break;
                    case 25:
                        animation = 1.1;
                    damage = 1.15;
                    crit = 1;
                        break;
                    case 58:
                        animation = 0.85;
                        damage = 0.85;
                        break;
                    case 26:
                        mana = 0.85;
                        damage = 1.1;
                        break;
                    case 27:
                        mana = 0.85;
                        break;
                    case 28:
                        mana = 0.85;
                        damage = 1.15;
                        knockBack = 1.05;
                        break;
                    case 83:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        animation = 0.9;
                        mana = 0.9;
                        break;
                    case 29:
                        mana = 1.1;
                        break;
                    case 30:
                        mana = 1.2;
                        damage = 0.9;
                        break;
                    case 31:
                        knockBack = 0.9;
                        damage = 0.9;
                        break;
                    case 32:
                        mana = 1.15;
                        damage = 1.1;
                        break;
                    case 33:
                        mana = 1.1;
                        knockBack = 1.1;
                        animation = 0.9;
                        break;
                    case 34:
                        mana = 0.9;
                        knockBack = 1.1;
                        animation = 1.1;
                        damage = 1.1;
                        break;
                    case 35:
                        mana = 1.2;
                        damage = 1.15;
                        knockBack = 1.15;
                        break;
                    case 52:
                        mana = 0.9;
                        damage = 0.9;
                        animation = 0.9;
                        break;
                    case 84:
                        knockBack = 1.17;
                        damage = 1.17;
                        crit = 8;
                        break;
                    case 36:
                        crit = 3;
                        break;
                    case 37:
                        damage = 1.1;
                        crit = 3;
                        knockBack = 1.1;
                        break;
                    case 38:
                        knockBack = 1.15;
                        break;
                    case 53:
                        damage = 1.1;
                        break;
                    case 54:
                        knockBack = 1.15;
                        break;
                    case 55:
                        knockBack = 1.15;
                        damage = 1.05;
                        break;
                    case 59:
                        knockBack = 1.15;
                        damage = 1.15;
                        crit = 5;
                        break;
                    case 60:
                        damage = 1.15;
                        crit = 5;
                        break;
                    case 61:
                        crit = 5;
                        break;
                    case 39:
                        damage = 0.7;
                        knockBack = 0.8;
                        break;
                    case 40:
                        damage = 0.85;
                        break;
                    case 56:
                        knockBack = 0.8;
                        break;
                    case 41:
                        knockBack = 0.85;
                        damage = 0.9;
                        break;
                    case 57:
                        knockBack = 0.9;
                        damage = 1.18;
                        break;
                    case 42:
                        animation = 0.9;
                        break;
                    case 43:
                        damage = 1.1;
                        animation = 0.9;
                        break;
                    case 44:
                        animation = 0.9;
                        crit = 3;
                        break;
                    case 45:
                        animation = 0.95;
                        break;
                    case 46:
                        crit = 3;
                        animation = 0.94;
                        damage = 1.07;
                        break;
                    case 47:
                        animation = 1.15;
                        break;
                    case 48:
                        animation = 1.2;
                        break;
                    case 49:
                        animation = 1.08;
                        break;
                    case 50:
                        damage = 0.8;
                        animation = 1.15;
                        break;
                    case 51:
                        knockBack = 0.9;
                        animation = 0.9;
                        damage = 1.05;
                        crit = 2;
                        break;

                }

                if (damage != 1.0 && Math.round(self.damage * damage) === self.damage) {
                    flag = true;
                    prefix = -1;
                }
                if (animation != 1.0 && Math.round(self.useAnimation * animation) === self.useAnimation) {
                    flag = true;
                    prefix = -1;
                }
                if (mana != 1.0 && Math.round(self.mana * mana) === self.mana) {
                    flag = true;
                    prefix = -1;
                }
                if (knockBack != 1.0 && self.knockBack == 0.0) {
                    flag = true;
                    prefix = -1;
                }
                if (pre === -2 && prefix === 0) {
                    prefix = -1;
                    flag = true;
                }

                if (!flag && !ItemLoader.AllowPrefix(self, prefix)) {
                    flag = true;
                }
            }

            self.damage = Math.round(self.damage * damage);
            self.useAnimation = Math.round(self.useAnimation * animation);
            self.useTime = Math.round(self.useTime * animation);
            self.reuseDelay = Math.round(self.reuseDelay * animation);
            self.mana = Math.round(self.mana * mana);
            self.knockBack *= knockBack;
            self.scale *= scale;
            self.shootSpeed *= shootSpeed;
            self.crit += crit;

            let value = 1.0 * damage * (2.0 - animation) * (2.0 - mana) * scale * knockBack * shootSpeed * (1.0 + crit * 0.02);
            if (prefix === 62 || prefix === 69 || prefix === 73 || prefix === 77) {
                value *= 1.05;
            }

            if (prefix === 63 || prefix === 70 || prefix === 74 || prefix === 78 || prefix === 67) {
                value *= 1.1;
            }

            if (prefix === 64 || prefix === 71 || prefix === 75 || prefix === 79 || prefix === 66) {
                value *= 1.15;
            }

            if (prefix === 65 || prefix === 72 || prefix === 76 || prefix === 80 || prefix === 68) {
                value *= 1.2;
            }

            if (value >= 1.2) {
                self.rare += 2;
            } else if (value >= 1.05) {
                self.rare++;
            } else if (value <= 0.8) {
                self.rare -= 2;
            } else if (value <= 0.95) {
                self.rare--;
            }

            if (self.rare > -11) {
                if (self.rare < -1) {
                    self.rare = -1;
                }
                if (self.rare > 11) {
                    self.rare = 11;
                }
            }
            
            value *= value;
            self.value = self.value * value;
            self.prefix = prefix;
            return true;
        });
        
        ReLogic.Content.AssetRepository.LoadAsset.hook((origianal, self, asset, mode) => {
        	original(self, i, Terraria.GameContent.TextureAssets.Npc[688], ReLogic.Content.AssetRequestMode.ImmediateLoad);

           // (Terraria.GameContent.TextureAssets.Npc[688].Name, ReLogic.Content.AssetRequestMode.ImmediateLoad);
            //(Terraria.GameContent.TextureAssets.Npc[689].Name, ReLogic.Content.AssetRequestMode.ImmediateLoad);
        
    })

        

        
        Terraria.Item['void SetDefaults(int Type, bool noMatCheck, ItemVariant variant)'].hook((original, self, type, noMatCheck, variant) => {
            if (type < ItemLoader.MAX_VANILLA_ID) {
                original(self,type, noMatCheck, variant);
                ItemLoader.SetDefaults(self);
                return;
            }

            /*self.tooltipContext = -1;
            self.BestiaryNotes = "";
            self.sentry = false;
            self.canBePlacedInVanityRegardlessOfConditions = false;
            self.DD2Summon = false;
            self.shopSpecialCurrency = -1;
            self.expert = false;
            self.isAShopItem = false;
            self.expertOnly = false;
            self.instanced = false;
            self.questItem = false;
            self.fishingPole = 0;
            self.bait = 0;
            self.hairDye = -1;
            self.makeNPC = 0;
            self.dye = 0;
            self.paint = 0;
            self.tileWand = -1;
            self.notAmmo = false;
            self.netID = 0;
            self.prefix = 0;
            self.crit = 0;
            self.mech = false;
            self.flame = false;
            self.reuseDelay = 0;
            self.melee = false;
            self.magic = false;
            self.ranged = false;
            self.summon = false;
            self.placeStyle = 0;
            self.buffTime = 0;
            self.buffType = 0;
            self.mountType = -1;
            self.cartTrack = false;
            self.material = false;
            self.noWet = false;
            self.vanity = false;
            self.mana = 0;
            self.wet = false;
            self.wetCount = 0;
            self.lavaWet = false;
            self.channel = false;
            self.manaIncrease = 0;
            self.timeSinceTheItemHasBeenReservedForSomeone = 0;
            self.noMelee = false;
            self.noUseGraphic = false;
            self.lifeRegen = 0;
            self.shootSpeed = 0;
            self.active = true;
            self.alpha = 0;
            self.ammo = Terraria.ID.AmmoID.None;
            self.useAmmo = Terraria.ID.AmmoID.None;
            self.autoReuse = false;
            self.accessory = false;
            self.axe = 0;
            self.healMana = 0;
            self.bodySlot = -1;
            self.legSlot = -1;
            self.headSlot = -1;
            self.potion = false;
            self.color = Microsoft.Xna.Framework.Graphics.Color.new();
            self.glowMask = -1;
            self.consumable = false;
            self.createTile = -1;
            self.createWall = -1;
            self.damage = -1;
            self.defense = 0;
            self.hammer = 0;
            self.healLife = 0;
            self.holdStyle = 0;
            self.knockBack = 0;
            self.maxStack = 1;
            self.pick = 0;
            self.rare = 0;
            self.scale = 1;
            self.shoot = 0;
            self.stack = 1;
            self.tileBoost = 0;
            self.useStyle = 0;
            self.useTime = 100;
            self.useAnimation = 100;
            self.value = 0;
            self.useTurn = false;
            self.buy = false;
            self.handOnSlot = -1;
            self.handOffSlot = -1;
            self.backSlot = -1;
            self.frontSlot = -1;
            self.shoeSlot = -1;
            self.waistSlot = -1;
            self.wingSlot = -1;
            self.shieldSlot = -1;
            self.neckSlot = -1;
            self.faceSlot = -1;
            self.balloonSlot = -1;
            self.uniqueStack = false;
            self.favorited = false;
            self.type = type;*/
            const item = ItemLoader.getModItem(type);
            item?.SetDefaults();
            Object.assign(self, item?.Item);
        });

        Terraria.Player.UpdateArmorSets.hook((original, self, i) => {
            original(self, i);
            const armor = self.armor;
            ItemLoader.UpdateArmorSet(self, armor[0], armor[1], armor[2])
        });
        

         
        Terraria.Utils["Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)"].hook((original, tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY) => {
            //const textureOverrideInfo = ModTexture.overrideFrames[tex._sourceLoadAsset];
           
           // if (textureOverrideInfo != undefined && textureOverrideInfo != -1) {
                //horizontalFrames = textureOverrideInfo;
                //tl.log("frameX: " + frameX) // 0
                //tl.log("frameY: " + frameY) // 0
                //tl.log("sizeOffsetX: " + sizeOffsetX) // 0
                //tl.log("sizeOffsetY: " + sizeOffsetY) // 0
          //  }
            let result = original(tex, horizontalFrames, verticalFrames, frameX, frameY, sizeOffsetX, sizeOffsetY);
            return result;
        })

        Terraria.Item.GetDrawHitbox.hook((original, type, user) => {
            if (type >= ItemLoader.MAX_VANILLA_ID) {
                const texture = Terraria.GameContent.TextureAssets.Item[type].Value;
                const rectangle = Microsoft.Xna.Framework.Rectangle.new();
                rectangle.X = 0;
                rectangle.Y = 0;
                rectangle.Width = texture.Width;
                rectangle.Height = texture.Height;
                return rectangle;
            }
            return original(type, user);
        });
        
        Terraria.Player.UpdateBuffs.hook((original, self, i) => {
        	original(self, i);
        for (let j = 0; j < self.maxBuffs; j++) {
        	if (self.buffType[j] >= 355) {
        Terraria.Main.NewText(`Buff: ${self.buffType[j]}`, 250, 132, 232);
            BuffLoader.UpdatePlayer(self, j);
        }
    }
        })

        Terraria.Player.UpdateEquips.hook((original, self, a) => {
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PreUpdateEquips();
            }
            original(self, a);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.PostUpdateEquips();
            }

            for (let k = 0; k < 10; k++) {
            const armor = self.armor[k];
            if (self.IsItemSlotUnlockedAndUsable(k)) {
            ItemLoader.UpdateEquip(armor, self);
            }
            }

            for (let j = 0; j < 58; j++) {
                const inventory = self.inventory[j];
                ItemLoader.UpdateInventory(inventory, self);
            }
            
            
            
        });

        Terraria.Player.ApplyEquipFunctional.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateAccessory(currentItem, self)
        });

        /*Terraria.Main['Vector2 DrawPlayerItemPos(float gravdir, int itemtype)'].hook((original, self, gravdir, itemtype) => {
            const result = original(gravdir, itemtype);
            if (itemtype >= ItemLoader.MAX_VANILLA_ID) {
                let holdoutOffset = ItemLoader.HoldoutOffset(gravdir, itemtype);
                if (holdoutOffset) {
                	
                    result.X -= holdoutOffset.X;
                    result.Y += holdoutOffset.Y;
                    
                }
            }
            return result;
        });*/

        Terraria.Item.CheckLavaDeath.hook((original, self, i) => {
            original(self, i);

            const canBurnInLava = ItemLoader.CanBurnInLava(self);
            if (canBurnInLava) {
                self.active = false;
                self.type = 0;
                self.stack = 0;
            }
        });

        Terraria.Player.ApplyEquipVanity.hook((original, self, itemSlot, currentItem) => {
            original(self, itemSlot, currentItem);

            ItemLoader.UpdateVanity(currentItem, self);
        });

        Terraria.Player.Spawn.hook((original, self, context) => {
            original(self, context);

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.OnRespawn();
            }
        });

        Terraria.Player.OnHit.hook((original, self, x, y, victim) => {
            original(self, x, y, victim);

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.OnHitAnything(x, y, victim);
            }
        });

        Terraria.Player.UpdateLifeRegen.hook((original, self) => {
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.UpdateBadLifeRegen();
            }

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.UpdateLifeRegen();
            }

            original(self);
        });

        Terraria.Player.UpdateDead.hook((original, self) => {
            original(self);

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.UpdateDead();
            }
        });

        Terraria.Player.ResetEffects.hook((original, self) => {
            original(self);

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.ResetEffects();
            }
        });

        Terraria.Player.Hooks.EnterWorld.hook((original, playerIndex) => {
            original(playerIndex);
            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = Terraria.Main.player[playerIndex];
                player.OnEnterWorld(player.player);
            }
        });
		
		Terraria.NPC.StrikeNPC.hook((original, self, damage, knockBack, hitDirection, crit, noEffect, fromNet) => {
            let result = original(self, damage, knockBack, hitDirection, crit, noEffect, fromNet);
            
            if(self.type == 689){
            	
            Terraria.GameContent.TextureAssets.Npc[688] = Terraria.GameContent.TextureAssets.Npc[1]
            
            }
            
            ModHooks.OnHitTemp[self.whoAmI] = {hitDirection, crit, noEffect, fromNet};
            return result;
            
        });

        Terraria.Player.ApplyNPCOnHitEffects.hook((original, self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone) => {
            original(self, sItem, itemRectangle, damage, knockBack, npcIndex, dmgRandomized, dmgDone);
            
            ItemLoader.OnHitNPC(sItem, self, Terraria.Main.npc[npcIndex], dmgDone, knockBack, ModHooks.OnHitTemp[npcIndex].crit);

            ModHooks.OnHitTemp = [{}];
        });
        
        
        
        Terraria.Main.DrawNPC.hook((original, self, iNPCIndex, behindTiles, lightMap, lightRegion) => {
        	
        original(self, iNPCIndex, behindTiles, lightMap, lightRegion);

    const npc = Terraria.Main.npc[iNPCIndex];
    const effects = npc.direction == -1 ? Microsoft.Xna.Framework.Graphics.SpriteEffects.None : Microsoft.Xna.Framework.Graphics.SpriteEffects.FlipHorizontally
    const nVector2 = Microsoft.Xna.Framework.Vector2.new()["void .ctor(float x, float y)"];
    Terraria.Main.spriteBatch['void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)']
        (Terraria.GameContent.TextureAssets.Npc[npc.type].Value, npc.position, null, Microsoft.Xna.Framework.Graphics.Color.White, npc.rotation, npc.getRect(), nVector2(1, 1), effects, 0);
    
            for (let i = 0; i < npc.buffType.length; i++) {
        if (npc.buffType[i] > 0) {
            BuffLoader.UpdateNPC(npc, i);
        }
    }
        
        })

        Terraria.Main.AnglerQuestSwap.hook((original) => {
            Terraria.Main.anglerWhoFinishedToday.Clear();
            Terraria.Main.anglerQuestFinished = false;

            const flag = Terraria.NPC.downedBoss1 || Terraria.NPC.downedBoss2 || Terraria.NPC.downedBoss3 || Terraria.Main.hardMode || Terraria.NPC.downedSlimeKing || Terraria.NPC.downedQueenBee;
            let flag2 = true;
        
            while (flag2) {
                flag2 = false;
                Terraria.Main.anglerQuest = Terraria.Main.rand['int Next(int maxValue)'](Terraria.Main.anglerQuestItemNetIDs.length);
                const num = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest];
                const hardMode = Terraria.Main.hardMode;
                const crimson = Terraria.WorldGen.crimson;

                if (num === 2454 && (!hardMode || crimson)) {
                    flag2 = true;
                }
                if (num === 2457 && crimson) {
                    flag2 = true;
                }
                if (num === 2462 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2463 && (!hardMode || !crimson)) {
                    flag2 = true;
                }
                if (num === 2465 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2468 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2471 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2473 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2477 && !crimson) {
                    flag2 = true;
                }
                if (num === 2480 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2483 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2484 && !hardMode) {
                    flag2 = true;
                }
                if (num === 2485 && crimson) {
                    flag2 = true;
                }
                if ((num === 2476 || num === 2453 || num === 2473) && !flag) {
                    flag2 = true;
                }
                if (num >= ItemLoader.MAX_VANILLA_ID) {
                    flag2 = ItemLoader.IsAnglerQuestAvailable(num);
                }
            }
        });

        Terraria.Lang.AnglerQuestChat.hook((original, turnIn) => {
            const obj = Terraria.Lang.CreateDialogSubstitutionObject(null);
            const turnInText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.TurnIn_', obj), null)['string FormatWith(object obj)'](obj);
            if (turnIn) {
                return turnInText;
            }

            const noQuestText = Terraria.Localization.Language.SelectRandom(Terraria.Lang['LanguageSearchFilter CreateDialogFilter(string startsWith, object substitutions)']('AnglerQuestText.NoQuest_', obj), null)['string FormatWith(object obj)'](obj);
            if (Terraria.Main.anglerQuestFinished) {
                return noQuestText;
            }

            const id = (Terraria.Main.npcChatCornerItem = Terraria.Main.anglerQuestItemNetIDs[Terraria.Main.anglerQuest]);
            const modQuestText = ItemLoader.AnglerChat(id);
            const vanillaQuestText = Terraria.Localization.Language['string GetTextValueWith(string key, object obj)']('AnglerQuestText.Quest_' + Terraria.ID.ItemID.Search.GetName(id), obj);

            return modQuestText ?? vanillaQuestText;
        });

        Terraria.Player.ExtractinatorUse.hook((original, self, extractType) => {
            const heldItem = self.HeldItem.type;
            if (heldItem < ItemLoader.MAX_VANILLA_ID) {
               return original(self, extractType);
            }
        
            const result = ModHooks.ExtractinatorTemp;
            ItemLoader.ExtractinatorUse(result, extractType);
        
            if (result.type > 0 && result.stack > 0) {
                const position = self.Center;
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)'](position.X, position.Y, 1, 1, result.type, result.stack, false, -1, false, false);
            }
        });

        Terraria.Player.ItemCheck_ApplyUseStyle.hook((original, self, mountOffset, sItem, heldItemFrame) => {
            original(self, mountOffset, sItem, heldItemFrame);

            ItemLoader.UseStyle(sItem, self, heldItemFrame);
        });

        Terraria.Player.ItemCheck_Shoot.hook((original, self, i, sItem, weaponDamage) => {
            if (!CombinedLoader.CanShoot(self, sItem)) {
                return;
            }

            const pointPosition = self.RotatedRelativePoint(self.MountedCenter, true, true);
            const velocity = Microsoft.Xna.Framework.Vector2.new();
            velocity.X = Terraria.Main.mouseX + Terraria.Main.screenPosition.X - pointPosition.X;
            velocity.Y = Terraria.Main.mouseY + Terraria.Main.screenPosition.Y - pointPosition.Y;
            if (!CombinedLoader.Shoot(self, sItem, pointPosition, velocity, sItem.shoot, weaponDamage, sItem.knockBack)) {
                return;
            }

            original(self, i, sItem, weaponDamage);
        });

        Terraria.Player.ItemCheck_CheckCanUse.hook((original, self, sItem) => {	
            const item = self.HeldItem;
            if (item.type < ItemLoader.MAX_VANILLA_ID || CombinedLoader.CanUseItem(self, sItem)) {
                return original(self, sItem);
            }
        });

        Terraria.Player.ItemCheck.hook((original, self) => {
            const item = self.HeldItem;
            if (item.type >= ItemLoader.MAX_VANILLA_ID) {
                ItemLoader.HoldItem(item, self);

                if (!self.JustDroppedAnItem) {
                    if (self.ItemTimeIsZero && self.itemAnimation > 0) {
                        if (ItemLoader.UseItem(item, self)) {
                            self['void ApplyItemTime(Item sItem)'](item);
                        }
                    }
                }

                     if (self.whoAmI === Terraria.Main.myPlayer) {
                         if (self.itemTimeMax !== 0 && self.itemTime === self.itemTimeMax && item.consumable) {
                              if (ItemLoader.ConsumeItem(item, self)) {
                            
                              }
                         }
                    }
            }
            
            original(self);
        });

        Terraria.Player.QuickMount_GetItemToUse.hook((original, self) => {
            let item = null;
            const mountEquip = self.miscEquips[3];
            if ((mountEquip.type < ItemLoader.MAX_VANILLA_ID || mountEquip.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, mountEquip)) &&
                mountEquip.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[mountEquip.mountType]) {
                item = mountEquip;
            }

            if (item === null) {
                for (let i = 0; i < 58; i++) {
                    const inventory = self.inventory[i];
                    if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                        inventory.mountType !== -1 && !Terraria.ID.MountID.Sets.Cart[inventory.mountType]) {
                        item = inventory;
                        break;
                    }
                }
            }

            return item;
        });

        Terraria.Player.QuickMount.hook((original, self) => {
            if (self.mount.Active) {
                Terraria.Mount.Dismount(self.mount, self);
            } else {
                if (self.frozen || self.tongued || self.webbed || self.stoned || self.gravDir === -1.0 || self.dead || self.noItems) {
                    return;
                }
        
                const item = self.QuickMount_GetItemToUse();
                if (item !== null && item.mountType !== -1 && Terraria.Mount.CanMount(self.mount, item.mountType, self)) {
                    if (!self.QuickMinecartSnap()) {
                        Terraria.Mount.SetMount(self.mount, item.mountType, self, false);
                        ItemLoader.UseItem(item, self);
                        if (item.UseSound !== null) {
                            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](item.UseSound, self.Center);
                        }
                    }
                } else {
                    self.QuickMinecart();
                }
            }
        });

        Terraria.Player.RecalculateLuck.hook((original, self) => {
            let luck = PlayerLoader.Luck;

            if (PlayerLoader.PreModifyLuck(self, luck)) {
                original(self);
                luck.value = self.luck;
                for (let player of ModPlayer.RegisteredPlayers) {
                    player.player = self;
                    player.ModifyLuck(luck);
                }
                self.luck = luck.value;
            }
        });

        Terraria.Player.ItemCheck_ApplyManaRegenDelay.hook((original, self, sItem) => {
            if (CombinedLoader.GetManaCost(sItem, self) > 0) {
                self.manaRegenDelay = self.maxRegenDelay;
            }
        });

        Terraria.Player.ItemCheck_PayMana.hook((original, self, sItem, canUse) => {
            let flag = self.altFunctionUse === 2;
            let flag2 = false;

            if (sItem.type === 2795) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.TurretFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.shoot > 0 && Terraria.ID.ProjectileID.Sets.MinionTargettingFeature[sItem.shoot] && flag) {
                flag2 = true;
            }

            if (sItem.type === 3006) {
                flag2 = true;
            }

            if (sItem.type !== 3269 && !CombinedLoader.CheckMana(sItem, self, -1, !flag2)) {
                canUse = false;
            }

            return canUse;
        });

        Terraria.Player.GetDyeTraderReward.hook((original, self) => {
            original(self);

            let rewardPool = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.GetDyeTraderReward(rewardPool);
            }

            const num = rewardPool[Terraria.Main.rand['int Next(int maxValue)'](rewardPool.length)];
            const item = Terraria.Item.new();
            item['void SetDefaults(int Type)'](num);
            item.stack = 3;
            item.position = self.Center;
            const item2 = self.GetItem(self.whoAmI, item, Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
            if (item2.stack > 0) {
                Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                (self.position.X, self.position.Y, self.width, self.height, item2.type, item2.stack, false, 0, true, false);
            }
        });

        Terraria.Player.GetAnglerReward.hook((original, self, angler, questItemType) => {
            original(self, angler, questItemType);

            let rewardItems = [];

            for (let player of ModPlayer.RegisteredPlayers) {
                player.player = self;
                player.AnglerQuestReward(rewardItems);
            }
            for (let i = 0; i < rewardItems.length; i++) {
                const getItem = self.GetItem(self.whoAmI, rewardItems[i], Terraria.GetItemSettings.NPCEntityToPlayerInventorySettings, false);
                if (getItem.stack > 0) {
                    Terraria.Item['int NewItem(int X, int Y, int Width, int Height, int Type, int Stack, bool noBroadcast, int pfix, bool noGrabDelay, bool reverseLookup)']
                    (self.position.X, self.position.Y, self.width, self.height, getItem.type, getItem.stack, false, 0, true, false);
                }
            }
        });

        Terraria.Player.QuickMana_GetItemToUse.hook((original, self) => {
            for (let i = 0; i < 58; i++) {
                const inventory = self.inventory[i];
                if ((inventory.type < ItemLoader.MAX_VANILLA_ID || inventory.type >= ItemLoader.MAX_VANILLA_ID && CombinedLoader.CanUseItem(self, inventory)) &&
                inventory.stack > 0 && inventory.healMana > 0 && (self.potionDelay === 0 || !inventory.potion)) {
                    return inventory;
                }
            }

            return null;
        });

        Terraria.Player.QuickMana.hook((original, self) => {
            if (self.cursed || self.CCed || self.dead || self.statMana === self.statManaMax2) {
                return;
            }

            let num = 0;
            const inventory = self.inventory;
            while (true) {
                if (num < 58) {
                    if (inventory[num].stack > 0 && inventory[num].healMana > 0 && (self.potionDelay === 0 || !inventory[num].potion)) {
                        break;
                    }

                    num++;
                    continue;
                }
                if (inventory[num].type < ItemLoader.MAX_VANILLA_ID) {
                    return original(self);
                }

                return;
            }

            Terraria.Audio.SoundEngine['SoundEffectInstance PlaySound(LegacySoundStyle type, Vector2 position)'](inventory[num].UseSound, self.position);
            if (inventory[num].potion) {
                self.potionDelay = self.potionDelayTime;
                self.AddBuff(21, self.potionDelay, true, false);
            }
            ItemLoader.UseItem(inventory[num], self);

            const healLife = CombinedLoader.GetHealLife(inventory[num], self, true);
            const healMana = CombinedLoader.GetHealMana(inventory[num], self, true);
            self.statLife += healLife;
            self.statMana += healMana;

            if (self.statLife > self.statLifeMax2) {
                self.statLife = self.statLifeMax2;
            }
        
            if (self.statMana > self.statManaMax2) {
                self.statMana = self.statManaMax2;
            }

            if (healLife > 0 && Terraria.Main.myPlayer === self.whoAmI) {
                self.HealEffect(healLife, true);
            }

            if (healMana > 0) {
                self.AddBuff(94, Terraria.Player.manaSickTime, true, false);
                if (Terraria.Main.myPlayer === self.whoAmI) {
                    self.ManaEffect(healMana);
                }
            }

            if (ItemLoader.ConsumeItem(inventory[num], self)) {
                inventory[num].stack--;
            }

            if (inventory[num].stack <= 0) {
                Terraria.Item.TurnToAir(inventory[num]);
            }
        });

        ModHooks.isInitialized = true;
    }
}