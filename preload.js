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
        this.ballLaunch = false;
        this.ballVelocity = 400;
        this.maxCPUSpeed = 235

        this.scorePlayer = 0;
        this.scoreCPU = 0;
        this.scorePlayerText = this.add.text(128, 128, '0',
        {
            font: '64px Comic Sans',
            align: 'center'
        });
        this.scoreCPUText = this.add.text(config.width - 128, 128, '0',
        {
            font: '64px Comic Sans',
            align: 'center'
        });

        this.paddlePlayer = this.create_paddle(8 , config.height/2);
        this.paddleCPU = this.create_paddle(config.width - 8,  config.height/2);

        this.ball = this.create_ball(config.width/2, config.height/2);

        this.input.on('pointerdown', this.launch_ball, this);

        this.ball.body.onWorldBounds = true;

        this.physics.add.collider(this.ball, this.paddlePlayer);
        this.physics.add.collider(this.ball, this.paddleCPU);

        this.physics.world.on('worldbounds', (body, up, down, left, right) =>
        {
            if (left) { this.cpuPoint = true }
            if (right) { this.playerPoint = true }
        });
    }

    update() {
        this.control_paddle(this.paddlePlayer, this.input.y);

        this.paddleCPU.setVelocityY(this.ball.body.velocity.y);
        this.paddleCPU.setMaxVelocity(this.maxCPUSpeed);

        this.scorePlayerText.text = this.scorePlayer;
        this.scoreCPUText.text = this.scoreCPU;

        if (this.cpuPoint){
            this.scoreCPU ++;
            this.cpuPoint = false
        }

        if (this.playerPoint){
            this.scorePlayer ++;
            this.playerPoint = false
        }

    }

    create_paddle(x, y){
        var paddle = this.physics.add.sprite(x, y, 'paddle').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setImmovable(true).setScale(0.5).setFrame();

        return paddle;
    }

    create_ball(x, y){
        var ball = this.physics.add.sprite(x, y, 'ball').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setBounce(1);
        ball.setCircle(ball.width/2);

        return ball;
    }

    control_paddle(paddle, y){
        paddle.y = y;

        if (paddle.y < paddle.height/4){
            paddle.y =  paddle.height/4;
        }
        else if (paddle.y > config.height - (paddle.height/4)){
            paddle.y = config.height - (paddle.height/4);
        }
    }

    launch_ball(){
        if (this.ballLaunch) {
            this.ball.setPosition(config.width/2, config.height/2)
            this.ball.setVelocity(0);
            this.ballLaunch = false;
        } else {
            this.ball.setVelocity(this.ballVelocity);
            this.ballLaunch = true;
        }
    }
}