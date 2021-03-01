// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene extends cc.Component {

    @property(cc.Node) bgNode1: cc.Node = null;
    @property(cc.Node) bgNode2: cc.Node = null;

    onLoad () {

        this.startBgRoll();
    }

    startBgRoll()
    {
        let self = this;

        let winSize:cc.Size = cc.winSize;
        let speed:number = 200;

        let durTime:number = winSize.width/speed;

        let moveToAction = cc.moveTo(durTime,-winSize.width,0);
        let moveByAction = cc.moveBy(durTime,-winSize.width,0);

        let action = cc.sequence(
            cc.spawn(
                moveToAction,
                cc.targetedAction(self.bgNode2,moveByAction)
            ),
            cc.callFunc(()=>{
                self.bgNode1.position = new cc.Vec3(winSize.width,0);
            }),
            cc.spawn(
                moveByAction,
                cc.targetedAction(self.bgNode2,moveToAction)
            ),
            cc.callFunc(()=>{
                self.bgNode2.position = new cc.Vec3(winSize.width,0);
            }),
        );
        action.repeatForever();
        this.bgNode1.runAction(action);
    }
}
