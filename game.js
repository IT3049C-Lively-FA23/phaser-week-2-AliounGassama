var config = {
    width: 800,
    height: 600,
    scene: [preload, scene1],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }

}

var game = new Phaser.Game(config);