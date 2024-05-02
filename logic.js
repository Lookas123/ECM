Game.registerMod("extraContent",{
    init:function(){
        this.spritesheet=App?this.dir+"/img.png":"https://raw.githubusercontent.com/Lookas123/ECM/main/ExtraContent.png" //hurrah github
        this.createAchievements=function(){
            this.achievements = []
            this.achievements.push(new Game.Achievement("Block of gold", "Click <b>77,777 golden cookies.</b> <q>Worth approximately 9 ingots.</q>",[0,0,this.spritesheet]))
            this.achievements.push(new Game.Achievement("Tendless cycle", "Ascend <b>10,000 times.</b> <q>Now you can tend to the cookie again.</q>",[1,0,this.spritesheet]))
            this.achievements.push(new Game.Achievement("Repopulation", "Have a <b>full ring of shiny wrinklers.</b> <q>You bought elder spice already? Too bad</q>",[2,0,this.spritesheet]))
            this.achievements.push(new Game.Achievement("Passive income", "Have your stock market profits surpass <b>the age of cookie clicker.</b> <q>To balance out birthday cookie.</q>",[3,0,this.spritesheet]))
            this.achievements.push(new Game.Achievement("Plant based diet", "Sacrifice the garden <b>50</b> times. <q>Those hornets must be fat by now.</q>",[4,18, "img/gardenPlants.png"]))
            this.achievements.push(new Game.Achievement("Hole in your pocket", "Bake a ridiculous number of cookies (current requirement: <b>1 quinvigintillion</b>). <q>Which at this point, is just the entire multiverse.</q>",[26,17]))
            this.achievements.push(new Game.Achievement("The will of the wondrous wizards wealthy wand", "Cast <b>999,999</b> spells. <q>Which wizard? Will.</q>",[27,11]))
            this.achievements.push(new Game.Achievement("Go outside", "Run out of extra content. <q>and take a shower.</q>",[4,0,this.spritesheet]))
            for(let i of this.achievements){i.pool="shadow";i.order=69420;}
            LocalizeUpgradesAndAchievs()
        }
        this.checkAchievements=function(){
            if (Game.goldenClicks>=77777)Game.Win("Block of gold")
            if (Game.resets>=10000)Game.Win("Tendless cycle")
            if (Game.Objects.Bank.minigameLoaded&&Game.Objects.Bank.minigame.profit>=(Date.now()-new Date(2013,7,8))/1000) Game.Win("Passive income")
            if (Game.cookiesEarned+Game.cookiesReset>1e78 && Game.version <= 2.052){Game.Win("Hole in your pocket")}else{Game.Achievements["Hole in your pocket"].won=0}
            if(Game.Objects["Wizard tower"].minigameLoaded&&Game.Objects['Wizard tower'].minigame.spellsCastTotal>=999999)Game.Win("The will of the wondrous wizards wealthy wand")
            if(Game.Objects.Farm.minigameLoaded && Game.Objects.Farm.minigame.convertTimes >= 50)Game.Win("Plant based diet")
            let shiny = 1;
            for(let i of Game.wrinklers) if(i.type==0) shiny = 0;
            if(shiny) Game.Win("Repopulation")
            let all = 1;
            for(let i of Game.mods.extraContent.achievements) if (i.won==0)all=0;
            if (all) Game.Win("Go outside")
        }
        if(Game.ready) this.createAchievements()
        else Game.registerHook("create", this.createAchievements)
	Game.registerHook("check", this.checkAchievements)
    },
    save: function(){
        let str = "";
        for(let i of this.achievements)str+=i.won
        return str;
    },
    load: function(str){
        for(let i in this.achievements)this.achievements[i].won=Number(str[i])
    }
})