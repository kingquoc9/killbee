// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    duration:number = 10;
    @property
    moveAmountX:number = 200;
    //@property
    //moveAmountY:number =75;
    moveEnemy:cc.ActionInterval;

    @property(cc.Prefab)
    enemybullet:cc.Prefab  = null;
    @property
    ShootFrequency:number = 3.0;
   
    
    enemyLife:number = 1;
    playAnimation:boolean = true;

    @property({
        type:cc.AudioClip
    })
    enemypew = null;

    @property({
        type:cc.AudioClip
    })
    bumbum = null;

    // LIFE-CYCLE CALLBACKS:

    setMovements(){
        //var moveLeft = cc.moveBy(this.duration,cc.v2(-this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        //var moveRight = cc.moveBy(this.duration,cc.v2(this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        var moveLeft = cc.moveBy(this.duration,cc.v2(-this.moveAmountX)).easing(cc.easeCircleActionInOut());
        var moveRight = cc.moveBy(this.duration,cc.v2(this.moveAmountX)).easing(cc.easeCircleActionInOut());
        return cc.repeatForever(cc.sequence(moveLeft,moveRight));
    }
    spawnBullets(){
        var Bullet = cc.instantiate(this.enemybullet);
        Bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(Bullet);
        cc.audioEngine.playEffect(this.enemypew,false);
    }
    onLoad () {
        this.moveEnemy = this.setMovements();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullets,this.ShootFrequency,cc.macro.REPEAT_FOREVER,3.0);

        cc.director.preloadScene('Menu');
    }
    //target hit
    onCollisionEnter(otherCollider,selfCollider){
        if(otherCollider.name == "bullet<PolygonCollider>"){
            this.enemyLife -=1;
            if((this.enemyLife<=0)&&(this.playAnimation == true)){
                this.node.stopAllActions();
                this.playAnimation = false;
                this.node.getComponent(cc.Animation).play("Explode");

            }
        }
       
    }
   removeExplode(){
        this.node.destroy();
        this.node.parent.getComponent('Game').spawninvader();
        cc.audioEngine.playEffect(this.bumbum,true);
        this.node.parent.getComponent('Game').AddScore();
    }
    
    start () {

    }

    update (dt) {
      if(this.node.position.y<= -(this.node.parent.getContentSize().height)){
         this.node.destroy();
           cc.director.loadScene('Menu');
       }
    }
}
