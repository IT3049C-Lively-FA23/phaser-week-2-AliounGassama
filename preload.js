class preload extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('ball', 'assets/images/ball.png');
        this.load.audio('hitPlayer', 'assets/audios/hit1');
        this.load.audio('hitCPU', 'assets/audios/hit2');
    }
    
    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}