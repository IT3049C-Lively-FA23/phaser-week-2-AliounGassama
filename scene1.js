class scene1 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        this.lastUpdate = 0;
        this.updateRate = 66.67;

        this.ballLaunch = false;
        this.ballVelocity = 400;

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

        this.paddlePlayer = this.create_paddle(0, config.height/2);
        this.paddleCPU = this.create_paddle(config.width - 8,  config.height/2);

        this.ball = this.create_ball(config.width/2, config.height/2);

        this.input.on('pointerdown', this.launch_ball, this);

        this.ball.body.onWorldBounds = true;
        this.physics.add.collider(this.paddlePlayer, this.ball);
        this.physics.add.collider(this.paddleCPU, this.ball);
    }

    update(time, delta) {
        this.control_paddle(this.paddlePlayer, this.input.y);

        // this.physics.collide(this.paddlePlayer, this.ball);
        // this.physics.collide(this.paddleCPU, this.ball);

        this.paddleCPU.setVelocityY(this.ball.body.velocity.y);
        this.paddleCPU.setMaxVelocity(250);

        this.scorePlayerText.text = this.scorePlayer;
        this.scoreCPUText.text = this.scoreCPU;

        // if (this.ball.body.blocked.left){
        //     this.scoreCPU ++;
        //     this.sound.play('hitPlayer');
        // }

        if (time - this.lastUpdate > this.updateRate){
            if (this.ball.body.blocked.left){
                this.scoreCPU ++;
            }
            this.lastUpdate = time;
        }
    }

    create_paddle(x, y){
        var paddle = this.physics.add.sprite(x, y, 'paddle').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setImmovable(true).setScale(0.5);

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