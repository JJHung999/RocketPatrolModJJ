class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/meow.wav');
        this.load.audio('sfx_explosion', './assets/bong.wav');
        this.load.audio('sfx_rocket', './assets/meow.wav');

        // load music
        //Song: Desmeon - Hellcat [NCS Release]
        //Music provided by NoCopyrightSounds
        //Free Download/Stream: http://ncs.io/hellcat
        //Watch: http://youtu.be/JSY6vBPunpY
        this.load.audio('menu_music', './assets/Desmeon_Hellcat.wav');

        //custom menu images
        this.load.image('menu','./assets/MenuBackground3.png');
    }

    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //Play music on a loop
        var music = this.sound.add('menu_music');
        music.setLoop(true);
        music.play();

        //create menu image
        this.menuImage = this.add.sprite(game.config.width/2,game.config.height/2,'menu');

        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'The Adventurous Cat', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        //menuConfig.color = '#000';
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // single player mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            singlePlayer: 1    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene"); 
          this.sound.removeByKey('menu_music');   
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // 2 player mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            singlePlayer: 0  
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");
          this.sound.removeByKey('menu_music');     
        }
      }
}
