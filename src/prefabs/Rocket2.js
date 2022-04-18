// Cat prefab 
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track cat's firing status
        this.moveSpeed = 8;         // pixels per frame
        this.sfxCat = scene.sound.add('sfx_rocket')  // add cat sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // jump button
        if(Phaser.Input.Keyboard.JustDown(keyT) && !this.isFiring) {
            this.isFiring = true;
            this.sfxCat.play();
        }

        // if jumped, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        //go down
        if(this.y <= borderUISize * 3 + borderPadding){
            this.fall()
            //this.reset();
        }

        //force reset going down
        if (this.y >= game.config.height){
            this.reset();}

    }

    // reset Cat to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.moveSpeed = 8;
    }

    fall(){
        this.moveSpeed = this.moveSpeed*(-1);
        this.y -= this.moveSpeed;
    }
}
