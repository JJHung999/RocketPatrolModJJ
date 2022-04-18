// Cat prefab 
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame, player);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track cat's firing status
        this.moveSpeed = 8;         // pixels per frame
        this.sfxCat = scene.sound.add('sfx_rocket')  // add cat sfx
        this.playerNum = player; //Player ID
    }

    update() {
        // left/right movement
        if(this.playerNum==1){
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // jump button
            if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isFiring) {
                this.isFiring = true;
                this.sfxCat.play();
            }
        }

        if(this.playerNum==2){
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
