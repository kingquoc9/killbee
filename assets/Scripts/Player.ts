// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    moveleft:number = 0;
    
    moveright:number = 0;

    // LIFE-CYCLE CALLBACKS:

    //bullets
    @property(cc.Prefab)
    bullet:cc.Prefab = null;
    @property({type:cc.AudioClip})
    beam = null;
   // @property({type:cc.AudioClip})
   // bumbum = null;

   // playerLife:number = 1;
   // playAnimation:boolean = true;

    shootBullets(){
        var bullet = cc.instantiate(this.bullet);
        bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(bullet);
        cc.audioEngine.playEffect(this.beam,false);
    }
    //Sh.Button
    startshootBullets(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                this.shootBullets();
                break;
        }
    }
    stopshootBullets(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
                
                break;
        }
    }
    //Move
    movePlayer(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveleft = 1;
                break;
            case cc.macro.KEY.right:
                this.moveright = 1;
                break;
        }
    }
    stopPlayer(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveleft = 0;
                break;
            case cc.macro.KEY.right:
                this.moveright = 0;
                break;
        }
    }



    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.movePlayer,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.stopPlayer,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.startshootBullets, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopshootBullets, this);  
    }

    //target hit
   // onCollisionEnter(otherCollider,selfCollider){
     //   if(otherCollider.name == "enemybullet<PolygonCollider>"){
      //      this.playerLife -=1;
      //      if((this.playerLife<=0)&&(this.playAnimation == true)){
     //           this.node.stopAllActions();
     //           this.playAnimation = false;
       //         this.node.getComponent(cc.Animation).play();

        //    }
      //  }
       
   // }
   //removeplayerExplode(){
        
  //      cc.audioEngine.playEffect(this.bumbum,true);
   //     this.node.parent.getComponent('Game').MinusLives();
   // }

    start () {

    }
    update (dt) {
        if(this.moveleft == 1){
            this.node.setPosition(this.node.position.x -= 300*dt,this.node.position.y);
        }
        if(this.moveright == 1){
            this.node.setPosition(this.node.position.x += 300*dt,this.node.position.y);
        }
    }

    
}
