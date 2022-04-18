class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('cat', './assets/CatSprite.png');
        this.load.image('cat2','./assets/Cat2Sprite.png')
        this.load.image('bird','./assets/BirdSprite.png');
        this.load.image('fish','./assets/FishSprite.png');
        this.load.image('milk','./assets/milk_bottle.png');

        //load in other cat textures
        this.load.image('catUp','./assets/CatUp.png');
        this.load.image('catDown','./assets/CatDown.png');
        this.load.image('cat2Up','./assets/Cat2Up.png');
        this.load.image('cat2Down','./assets/Cat2Down.png');

        // load parallax background
        this.load.image('sky','./assets/skybackground.png');
        this.load.image('buildings','./assets/midbackground.png');
        this.load.image('trees','./assets/frontbackground.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('catRun','./assets/CatRunSpriteSheet.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('birdFlying','./assets/BirdFlying.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('fishFlying','./assets/FishFlying.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('cat2Run','./assets/Cat2Run.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});

        //Song: Rob Gasser - Ricochet [NCS Release]
        //Music provided by NoCopyrightSounds
        //Free Download/Stream: http://ncs.io/Ricochet
        //Watch: http://youtu.be/T4Gq9pkToS8
        this.load.audio('level_music','./assets/Rob_Gasser_Ricochet.wav');
    }

    create() {

        // place the 3 tile backgrounds
        this.skybackground = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.midbackground = this.add.tileSprite(0, 0, 640, 480, 'buildings').setOrigin(0, 0);
        this.frontbackground = this.add.tileSprite(0, 0, 640, 480, 'trees').setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'catRun',
            frames: this.anims.generateFrameNumbers('catRun', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'cat2Run',
            frames: this.anims.generateFrameNumbers('cat2Run', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fishFly',
            frames: this.anims.generateFrameNumbers('fishFlying', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });        
        this.anims.create({
            key: 'birdFly',
            frames: this.anims.generateFrameNumbers('birdFlying', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });


        //Play music on a loop
        var music = this.sound.add('level_music');
        music.setLoop(true);
        music.play();

        // some sort of background
        //this.add.rectangle(0, borderUISize - borderPadding -20, game.config.width, borderUISize , 0x00FF00).setOrigin(0, 0);

        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize/8, 0xFFFD00).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize/8, game.config.width, borderUISize, 0xFFFD00).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize/8, game.config.height, 0xFFFD00).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize/8, 0, borderUISize, game.config.height, 0xFFFD00).setOrigin(0 ,0);

        // add cat (p1)
        //add cats p1 and p2
        if(game.settings.singlePlayer == 1){
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'cat', 0,1).setOrigin(0.5, 0);
        }else{
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'cat', 0,1).setOrigin(0.5, 0);
            this.p2Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'cat2', 0,2).setOrigin(0.5, 0);
        }
        // add objects (x5)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'fish', 0, 30,3).setOrigin(0, 0); //fish
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bird', 0, 20,1.5).setOrigin(0,0); //bird
        this.ship03 = new Spaceship(this, game.config.width + borderUISize, borderUISize*5 + borderPadding*2, 'bird', 0, 23,2).setOrigin(0,0); //bird
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'milk', 0, 10,1).setOrigin(0,0); //milk
        this.ship05 = new Spaceship(this, game.config.width + borderUISize, borderUISize*6 + borderPadding*4, 'milk', 0, 15,1.5).setOrigin(0,0); //milk

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // initialize score
        this.p1Score = 0;

        //display timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C3B1E1',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timerLeft = this.add.text(game.config.width-120, borderUISize - borderPadding*2, this.gameTimer, timerConfig);

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C3B1E1',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize-borderPadding, borderUISize - borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // call the animate function
        //this.animate(this.p1Rocket,'catRun');
        this.animate(this.ship01,'fishFly');
        this.animate(this.ship02,'birdFly');
        this.animate(this.ship03,'birdFly');
    }

    update() {
        // call the animate function
        //this.animate(this.p1Rocket,'catRun');

        //timer display
        this.timerLeft.text = Math.round(this.clock.delay-this.clock.elapsed)

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }


        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.sound.removeByKey('level_music') 
        }

        this.skybackground.tilePositionX += 1/2;  // update tile sprite
        this.midbackground.tilePositionX += 2;  // update tile sprite
        this.frontbackground.tilePositionX += 4;  // update tile sprite

        if(!this.gameOver) {
            if(game.settings.singlePlayer == 1){
                this.p1Rocket.update();             // update p1
            }else{
                this.p1Rocket.update();             // update p1
                this.p2Rocket.update(); 
            }
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
        }

        //resets the rockets to stop them from phasing through the ground
        if (this.p1Rocket.y>= game.config.height - borderUISize - borderPadding){
            this.p1Rocket.reset();
        }
        if(game.settings.singlePlayer == 0){
            if (this.p2Rocket.y>= game.config.height - borderUISize - borderPadding){
                this.p2Rocket.reset();
            }
        }


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }        
        if(this.checkCollision(this.p1Rocket, this.ship05)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(game.settings.singlePlayer == 0){
            if(this.checkCollision(this.p2Rocket, this.ship04)) {
                //this.p1Rocket.reset();
                this.shipExplode(this.ship04);
            }        
            if(this.checkCollision(this.p2Rocket, this.ship05)) {
                //this.p1Rocket.reset();
                this.shipExplode(this.ship05);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                //this.p1Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                //this.p1Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                //this.p1Rocket.reset();
                this.shipExplode(this.ship01);
            }
        }
    }

    checkCollision(cat, ship) {
        // simple AABB checking
        if (cat.x < ship.x + ship.width && 
            cat.x + cat.width > ship.x && 
            cat.y < ship.y + ship.height &&
            cat.height + cat.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        //this.gameTimer += ship.points  // cut because I don't how to make that update with the display
        
        this.sound.play('sfx_explosion');
      }

    //replace the still sprites with an animated one
    animate(objectSprite, spritesheet) {
        // hide default sprite
        objectSprite.alpha = 1;                         
        // create sprite at cat's position
        let anima = this.add.sprite(objectSprite.x, objectSprite.y, spritesheet).setOrigin(0, 0);
        anima.anims.play(spritesheet); // play spritesheet animation
      };
    
    //set texture
    setTexture(key, frame)
    {
        this.texture = this.scene.sys.textures.get(key);

        return this.setFrame(frame);
    }
    
}