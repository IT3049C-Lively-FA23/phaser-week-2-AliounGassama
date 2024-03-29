var config = {
    width: 800,
    height: 600,
    scene: [preload],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 240
        }
    }

}

var game = new Phaser.Game(config);