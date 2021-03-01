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
    BulletSpeed:number = 500;

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(otherCollider,selfCollider){
        if(otherCollider.name == "player<PolygonCollider>" && selfCollider.name == "enemybullet<PolygonCollider>"){
           // this.node.destroy();
            cc.director.loadScene('Menu');
        }
        if(otherCollider.name == "invader<PolygonCollider>"){
            this.node.destroy();
        }
        

    }

    onLoad () {
        cc.director.preloadScene('Menu');
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }

    start () {

    }

    update (dt) {
        this.node.setPosition(this.node.position.x,this.node.position.y -= this.BulletSpeed*dt);
        if(this.node.position.y <= -(this.node.parent.getContentSize().height)){
            this.node.destroy();
        }
    }
}
