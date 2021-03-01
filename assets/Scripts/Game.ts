// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    invader:cc.Prefab = null;

    @property(cc.Label)
    score:cc.Label = null;
   // @property(cc.Label)
    //live:cc.Label = null;

    ActualScore:number = 0;
    //ActualLives:number = 3;
   
    // LIFE-CYCLE CALLBACKS:

    
    spawnCount:number = 0;

    spawninvader()
    {
        var invader = [this.invader,this.invader,this.invader];
       // var random = Math.floor(Math.random()*invader.length);
        var newinvader = cc.instantiate(this.invader);
        //var randomX = [170,0,-170];
        //var positions = [
            //cc.v2(-140,130),cc.v2(-150,100)
       // ];
       // var randX = Math.floor(Math.random()*positions.length);
       // newinvader.setPosition(randX,(this.node.position.y*2)+(newinvader.getContentSize().height*2));
       newinvader.setPosition(cc.v2(-160,100));
        
        this.node.addChild(newinvader);

    }
  //  spawnSwarm(){
       // var ranks = this.config.invaderRanks + 0.1 * limitLevel;
    //var files = this.config.invaderFiles + 0.2 * limitLevel;
    //}
    

    AddScore(){
        this.ActualScore += 10;
        this.score.string = "Score: "+this.ActualScore.toString();

       
    }
    //MinusLives(){
      //  this.ActualLives -=1;
     //   this.live.int = "Lives: "+this.ActualLives.toInt();
  //  }

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.spawninvader();
    }

    start () {

    }

     update (dt) {


     }
}
