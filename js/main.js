window.onload = function() {
    // William Aulson
    // CS 325 Digital Assignment #6
    // Inferior Megaman Knock Off
    
    "use strict";
    
    var game = new Phaser.Game( 1024, 576, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load assets
        game.load.image( 'back', 'assets/back.png' );
        game.load.image( 'floor', 'assets/floor.png' );
        game.load.image( 'wall', 'assets/wall.png' );
        game.load.image( 'platform', 'assets/platform.png' );
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('dude2', 'assets/dude2.png', 32, 48);
        game.load.spritesheet('shot', 'assets/shot.png', 20, 20);
        game.load.spritesheet('fire', 'assets/fire.png', 35, 35);
        game.load.audio('damage', 'assets/damage.mp3');
        game.load.audio('death', 'assets/death.mp3');
        game.load.audio('shoot', 'assets/shoot.mp3');
        game.load.audio('music', 'assets/music.mp3');
        
    }
    // variables
    var avatar;
    var enemy;
    //var cursors;
    var aKey;
    var dKey;
    var wKey;
    //var enterKey;
    var spaceKey;
    var floor;
    var ceiling;
    var leftWall;
    var rightWall;
    var boundGroup;
    var avatarFace = 1;
    var enemyFace = 0;
    var shotDelay = 0;
    var shotCount = 0;
    var shotEnemyDelay = 0;
    var shotEnemyCount = 0;
    var fireShotDelay = 0;
    var fireShotCount = 0;
    var fireEnemyShotDelay = 0;
    var fireEnemyShotCount = 0;
    var avatarShotGroup;
    var enemyShotGroup;
    var avatarShot;
    var enemyShot;
    var mKey;
    //var plusKey;
    var avatarFireShot;
    var avatarFireShotGroup;
    var enemyFireShot;
    var enemyFireShotGroup;
    //var platform;
    var avatarLife = 100;
    var enemyLife = 100;
    var textStyle = { font: "20px Arial", fill: "#000000", align: "center" };
    var avatarText;
    var enemyText;
    var gameRunning = false;
    var startScreen;
    var startText;
    var startText2;
    var startTextStyle = { font: "50px Arial", fill: "#000000", align: "center" };
    var music;
    var shoot;
    var damage;
    var death;
    var gameEnd = false;
    var notInScript = 0;
    var regularShoot = 0;
    var regularShootTime = 0;
    var regularShootSpeed = 0;
    var regularShootSpeedX = 0;
    var regularShootCount = 0;
    var aimValue = 0;
       
    function create() //create assets
    {
    	    game.physics.startSystem(Phaser.Physics.ARCADE);
    	    game.world.setBounds(0, 0, 1024, 576);
    	    game.add.sprite(0, 0, 'back');
    	    
    	    boundGroup = game.add.group();
    	    game.physics.arcade.enable(boundGroup);
    	    avatarShotGroup = game.add.group();
    	    game.physics.arcade.enable(avatarShotGroup);
    	    avatarFireShotGroup = game.add.group();
    	    game.physics.arcade.enable(avatarFireShotGroup);
    	    enemyShotGroup = game.add.group();
    	    game.physics.arcade.enable(enemyShotGroup);
    	    enemyFireShotGroup = game.add.group();
    	    game.physics.arcade.enable(enemyFireShotGroup);
    	    
    	    /*platform = game.add.sprite(262, 375, 'platform');
    	    game.physics.arcade.enable(platform);
    	    platform.body.allowGravity = false;
    	    platform.body.immovable = true;
    	    boundGroup.add(platform);*/
    	    
    	    leftWall = game.add.sprite(0, 0, 'wall');
    	    game.physics.arcade.enable(leftWall);
    	    leftWall.body.allowGravity = false;
    	    leftWall.body.immovable = true;
    	    boundGroup.add(leftWall);
    	    
    	    rightWall = game.add.sprite(974, 0, 'wall');
    	    game.physics.arcade.enable(rightWall);
    	    rightWall.body.allowGravity = false;
    	    rightWall.body.immovable = true;
    	    boundGroup.add(rightWall);
    	    
    	    floor = game.add.sprite(0, 526, 'floor');
    	    game.physics.arcade.enable(floor);
    	    floor.body.allowGravity = false;
    	    floor.body.immovable = true;
    	    boundGroup.add(floor);
    	    
    	    ceiling = game.add.sprite(0, 0, 'floor');
    	    game.physics.arcade.enable(ceiling);
    	    ceiling.body.allowGravity = false;
    	    ceiling.body.immovable = true;
    	    boundGroup.add(ceiling);
    	    
    	    avatar = game.add.sprite(100, 150, 'dude');
    	    game.physics.arcade.enable(avatar);
    	    avatar.body.gravity.y = 1000;
    	    avatar.animations.add('left', [0, 1, 2, 3], 10, true);
    	    avatar.animations.add('right', [5, 6, 7, 8], 10, true);
    	    avatar.frame = 5;
    	    
    	    enemy = game.add.sprite(892, 150, 'dude2');
    	    game.physics.arcade.enable(enemy);
    	    enemy.body.gravity.y = 1000;
    	    //enemy.body.immovable = true;
    	    enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    	    enemy.animations.add('right', [5, 6, 7, 8], 10, true);
    	    
    	    avatarText = game.add.text(60, 55, 'Player 1: ' + avatarLife, textStyle);
    	    enemyText = game.add.text(847, 55, 'Player 2: ' + avatarLife, textStyle);
    	    
    	    //cursors = game.input.keyboard.createCursorKeys();
    	    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    	    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    	    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    	    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    	    //plusKey = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
    	    //enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	    
    	    //starting splash screen
    	    startScreen = game.add.sprite(0, 0, 'back');
    	    startText = game.add.text(60, 55, 'Player 1\nMove: A, D, W\nShoot: Spacebar\nFire: M', startTextStyle);
    	    startText2 = game.add.text(650, 55, 'Player 2\nMove: Arrows\nShoot: Enter\nFire: Num +', startTextStyle);
    	    
    	    //audio
    	    music = game.add.audio('music');
    	    shoot = game.add.audio('shoot');
    	    shoot.allowMultiple = true;
    	    damage = game.add.audio('damage');
    	    damage.allowMultiple = true;
    	    death = game.add.audio('death');
    	        	    
    	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    	    game.input.onDown.add(fullScreenStart, this);
    	    game.paused = true;
    }
    
    function fullScreenStart() //fullscreen and pause mode
    {
    	    if (game.scale.isFullScreen)
    	    {
    	    	    game.paused = true;
    	    	    game.scale.stopFullScreen();
    	    }
    	    else
    	    {
    	    	    if (!gameRunning) //first run check
    	    	    {
    	    	    	    startScreen.destroy();
    	    	    	    startText.destroy();
    	    	    	    startText2.destroy();
    	    	    	    gameRunning = true;
    	    	    	    music.play('', 0, 1, true);
    	    	    }
    	    	    game.scale.startFullScreen(true);
    	    	    game.paused = false;
    	    }
    }
    
    function update() //run game logic
    {
    	    if ((avatarLife < 1) && (gameEnd === false)) //endgame check
    	    {
    	    	    gameEnd = true;
    	    	    gameRunning = false;
    	    	    music.stop();
    	    	    death.play('', .5, 2, false);
    	    	    game.add.sprite(0, 0, 'back');
    	    	    game.add.text(310, 150, 'Player 2 Wins!\n\nHumanity Is Saved!', startTextStyle);
    	    }
    	    else if ((enemyLife < 1) && (gameEnd === false))
    	    {
    	    	    gameEnd = true;
    	    	    gameRunning = false;
    	    	    music.stop();
    	    	    death.play('', .5, 2, false);
    	    	    game.add.sprite(0, 0, 'back');
    	    	    game.add.text(310, 150, 'Player 1 Wins!\n\nHumanity Weeps...', startTextStyle);
    	    }
    	       	    
    	    if (gameRunning) //game actually running
    	    {
    	    	    avatarText.setText('Player 1: ' + avatarLife);
    	    	    enemyText.setText('Player 2: ' + enemyLife);
    	    
    	    	    game.physics.arcade.collide(enemy, floor, null, airEnd, this);
    	    	    game.physics.arcade.overlap(avatar, enemy, null, null, this);
    	    	    game.physics.arcade.collide(avatar, boundGroup, null, null, this);
    	    	    game.physics.arcade.collide(enemy, boundGroup, null, null, this);
    	    	    game.physics.arcade.collide(avatar, enemyShotGroup, null, damageAvatar, this);
    	    	    game.physics.arcade.collide(avatar, enemyFireShotGroup, null, fireDamageAvatar, this);
    	    	    game.physics.arcade.collide(enemy, avatarShotGroup, null, damageEnemy, this);
    	    	    game.physics.arcade.collide(enemy, avatarFireShotGroup, null, fireDamageEnemy, this);
    	    	    game.physics.arcade.collide(avatarShotGroup, rightWall, null, killShot, this);
    	    	    game.physics.arcade.collide(avatarShotGroup, leftWall, null, killShot, this);
    	    	    //game.physics.arcade.collide(avatarShotGroup, platform, null, killShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, rightWall, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, leftWall, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, floor, null, killFireShot, this);
    	    	    game.physics.arcade.collide(avatarFireShotGroup, ceiling, null, killFireShot, this);
    	    	    //game.physics.arcade.collide(avatarFireShotGroup, platform, null, killFireShot, this);
    	    	    game.physics.arcade.collide(enemyShotGroup, rightWall, null, killEnemyShot, this);
    	    	    game.physics.arcade.collide(enemyShotGroup, leftWall, null, killEnemyShot, this);
    	    	    //game.physics.arcade.collide(enemyShotGroup, platform, null, killEnemyShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, rightWall, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, leftWall, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, floor, null, killEnemyFireShot, this);
    	    	    game.physics.arcade.collide(enemyFireShotGroup, ceiling, null, killEnemyFireShot, this);
    	    	    //game.physics.arcade.collide(enemyFireShotGroup, platform, null, killEnemyFireShot, this);
    	    	    
    	    	    //player 1 movement and attack
    	    	    avatar.body.velocity.x = 0;
    	    	    if (aKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    avatar.animations.play('left');
    	    	    	    avatarFace = 0;
    	    	    }
    	    	    else if (dKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    avatar.animations.play('right');
    	    	    	    avatarFace = 1;
    	    	    }
    	    	    else if (aKey.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    avatar.animations.stop();
    	    	    	    if (avatarFace)
    	    	    	    {
    	    	    	    	    avatar.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.frame = 0;   
    	    	    	    }
    	    	    	    avatarFace = 0;
    	    	    }
    	    	    else if (dKey.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    avatar.animations.stop();
    	    	    	    if (avatarFace)
    	    	    	    {
    	    	    	    	    avatar.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.frame = 0;   
    	    	    	    }
    	    	    	    avatarFace = 1;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    avatar.animations.stop();
    	    	    	    if (avatarFace)
    	    	    	    {
    	    	    	    	    avatar.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.frame = 0;   
    	    	    	    }
    	    	    }
    	    	    if (wKey.isDown && avatar.body.touching.down)
    	    	    {
    	    	    	    avatar.body.velocity.y = -600;
    	    	    }
    	    
    	    	    if (spaceKey.isDown)
    	    	    {
    	    	    	    if ((shotCount < 3) && (game.time.now > shotDelay))
    	    	    	    {
    	    	    	    	    if (avatarFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarShot = avatarShotGroup.create(avatar.x + 25, avatar.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(avatarShot);
    	    	    	    	    	    avatarShot.body.velocity.x = 450;
    	    	    	    	    	    shotDelay = game.time.now + 200;
    	    	    	    	    	    avatarShot.animations.add('shotRight', [0, 1], 10, true);
    	    	    	    	    	    avatarShot.animations.play('shotRight');
    	    	    	    	    	    shotCount = shotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarShot = avatarShotGroup.create(avatar.x - 25, avatar.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(avatarShot);
    	    	    	    	    	    avatarShot.body.velocity.x = -450;
    	    	    	    	    	    shotDelay = game.time.now + 200;
    	    	    	    	    	    avatarShot.animations.add('shotLeft', [0, 1], 10, true);
    	    	    	    	    	    avatarShot.animations.play('shotLeft');
    	    	    	    	    	    shotCount = shotCount + 1;   
    	    	    	    	    }
    	    	    	    }
    	    	    }
    	    
    	    	    if (mKey.isDown)
    	    	    {
    	    	    	    if ((fireShotCount < 2) && (game.time.now > fireShotDelay))
    	    	    	    {
    	    	    	    	    if (avatarFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarFireShot = avatarFireShotGroup.create(avatar.x + 25, avatar.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(avatarFireShot);
    	    	    	    	    	    avatarFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    avatarFireShot.scale.x = avatarFireShot.scale.x * -1;
    	    	    	    	    	    avatarFireShot.body.velocity.x = 350;
    	    	    	    	    	    avatarFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireShotDelay = game.time.now + 500;
    	    	    	    	    	    avatarFireShot.animations.add('shotFireRight', [0, 1, 2], 10, true);
    	    	    	    	    	    avatarFireShot.animations.play('shotFireRight');
    	    	    	    	    	    fireShotCount = fireShotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    avatarFireShot = avatarFireShotGroup.create(avatar.x - 25, avatar.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(avatarFireShot);
    	    	    	    	    	    avatarFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    avatarFireShot.body.velocity.x = -350;
    	    	    	    	    	    avatarFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireShotDelay = game.time.now + 500;
    	    	    	    	    	    avatarFireShot.animations.add('shotFireLeft', [0, 1, 2], 10, true);
    	    	    	    	    	    avatarFireShot.animations.play('shotFireLeft');
    	    	    	    	    	    fireShotCount = fireShotCount + 1;  
    	    	    	    	    }
    	    	    	    }
    	    	    }
    	    	    if (regularShoot)
    	    	    {
    	    	    	    if (game.time.now > regularShootTime)
    	    	    	    {
    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x, enemy.y + 5, 'shot');
    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    var y = getYRegAimAir();
    	    	    	    	    var x = getXRegAimAir();
    	    	    	    	    console.log('y: ' + y);
    	    	    	    	    console.log('x: ' + x);
    	    	    	    	    enemyShot.body.velocity.y = y;
    	    	    	    	    enemyShot.body.velocity.x = x;
    	    	    	    	    enemyShot.animations.add('regShotE', [0, 1], 10, true);
    	    	    	    	    enemyShot.animations.play('regShotE');
    	    	    	    	    regularShootTime = game.time.now + 300;
    	    	    	    	    regularShootCount = regularShootCount - 1;
    	    	    	    }
    	    	    	    if (regularShootCount === 0)
    	    	    	    {
    	    	    	    	    regularShoot = 0;
    	    	    	    }
    	    	    }
    	    	    
    	    	    if (notInScript)
    	    	    {
    	    	    	    flip();
    	    	    }
    	    	    
    	    	    if (notInScript && avatar.x < 281 && enemy.x < 281)
    	    	    {
    	    	    	    script11();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 512)
    	    	    {
    	    	    	    script12();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 743)
    	    	    {
    	    	    	    script13();
    	    	    }
    	    	    else if (notInScript && avatar.x < 281 && enemy.x < 974)
    	    	    {
    	    	    	    script14();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 281)
    	    	    {
    	    	    	    script21();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 512)
    	    	    {
    	    	    	    script22();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 743)
    	    	    {
    	    	    	    script23();
    	    	    }
    	    	    else if (notInScript && avatar.x < 512 && enemy.x < 974)
    	    	    {
    	    	    	    script24();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 281)
    	    	    {
    	    	    	    script31();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 512)
    	    	    {
    	    	    	    script32();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 743)
    	    	    {
    	    	    	    script33();
    	    	    }
    	    	    else if (notInScript && avatar.x < 743 && enemy.x < 974)
    	    	    {
    	    	    	    script34();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 281)
    	    	    {
    	    	    	    script41();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 512)
    	    	    {
    	    	    	    script42();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 743)
    	    	    {
    	    	    	    script43();
    	    	    }
    	    	    else if (notInScript && avatar.x < 974 && enemy.x < 974)
    	    	    {
    	    	    	    script44();
    	    	    }
    	    	        	    	    
    	    	    /*
    	    	    //player 2 movement and attack
    	    	    enemy.body.velocity.x = 0;
    	    	    if (cursors.left.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.x = -200;
    	    	    	    enemy.animations.play('left');
    	    	    	    enemyFace = 0;
    	    	    }
    	    	    else if (cursors.right.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.x = 200;
    	    	    	    enemy.animations.play('right');
    	    	    	    enemyFace = 1;
    	    	    }
    	    	    else if (cursors.left.isDown)
    	    	    {
    	    	    	    enemy.body.velocity.x = -200;
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    	    enemyFace = 0;
    	    	    }
    	    	    else if (cursors.right.isDown)
    	    	    {
    	    	    	    enemy.body.velocity.x = 200;
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    	    enemyFace = 1;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    enemy.animations.stop();
    	    	    	    if (enemyFace)
    	    	    	    {
    	    	    	    	    enemy.frame = 5;  
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 0;   
    	    	    	    }
    	    	    }
    	    	    if (cursors.up.isDown && enemy.body.touching.down)
    	    	    {
    	    	    	    enemy.body.velocity.y = -600;
    	    	    }
    	    
    	    	    if (enterKey.isDown)
    	    	    {
    	    	    	    if ((shotEnemyCount < 3) && (game.time.now > shotEnemyDelay))
    	    	    	    {
    	    	    	    	    if (enemyFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x + 25, enemy.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    	    enemyShot.body.velocity.x = 450;
    	    	    	    	    	    shotEnemyDelay = game.time.now + 200;
    	    	    	    	    	    enemyShot.animations.add('shotERight', [0, 1], 10, true);
    	    	    	    	    	    enemyShot.animations.play('shotERight');
    	    	    	    	    	    shotEnemyCount = shotEnemyCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyShot = enemyShotGroup.create(enemy.x - 25, enemy.y + 15, 'shot');
    	    	    	    	    	    game.physics.arcade.enable(enemyShot);
    	    	    	    	    	    enemyShot.body.velocity.x = -450;
    	    	    	    	    	    shotEnemyDelay = game.time.now + 200;
    	    	    	    	    	    enemyShot.animations.add('shotELeft', [0, 1], 10, true);
    	    	    	    	    	    enemyShot.animations.play('shotELeft');
    	    	    	    	    	    shotEnemyCount = shotEnemyCount + 1;   
    	    	    	    	    }
    	    	    	    }
    	    	    }
    	    
    	    	    if (plusKey.isDown)
    	    	    {
    	    	    	    if ((fireEnemyShotCount < 2) && (game.time.now > fireEnemyShotDelay))
    	    	    	    {
    	    	    	    	    if (enemyFace)
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyFireShot = enemyFireShotGroup.create(enemy.x + 25, enemy.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(enemyFireShot);
    	    	    	    	    	    enemyFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    enemyFireShot.scale.x = enemyFireShot.scale.x * -1;
    	    	    	    	    	    enemyFireShot.body.velocity.x = 350;
    	    	    	    	    	    enemyFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireEnemyShotDelay = game.time.now + 500;
    	    	    	    	    	    enemyFireShot.animations.add('shotEFireRight', [0, 1, 2], 10, true);
    	    	    	    	    	    enemyFireShot.animations.play('shotEFireRight');
    	    	    	    	    	    fireEnemyShotCount = fireEnemyShotCount + 1;
    	    	    	    	    }
    	    	    	    	    else
    	    	    	    	    {
    	    	    	    	    	    shoot.play('', .6, 1, false);
    	    	    	    	    	    enemyFireShot = enemyFireShotGroup.create(enemy.x - 25, enemy.y + 15, 'fire');
    	    	    	    	    	    game.physics.arcade.enable(enemyFireShot);
    	    	    	    	    	    enemyFireShot.anchor.setTo(.5,.5);
    	    	    	    	    	    enemyFireShot.body.velocity.x = -350;
    	    	    	    	    	    enemyFireShot.body.velocity.y = game.rnd.integerInRange(-75, 75);
    	    	    	    	    	    fireEnemyShotDelay = game.time.now + 500;
    	    	    	    	    	    enemyFireShot.animations.add('shotEFireLeft', [0, 1, 2], 10, true);
    	    	    	    	    	    enemyFireShot.animations.play('shotEFireLeft');
    	    	    	    	    	    fireEnemyShotCount = fireEnemyShotCount + 1;  
    	    	    	    	    }
    	    	    	    }
    	    	    }*/  
    	    }
    }
    
    function flip()
    {
    	   if (avatar.body.x < enemy.body.x)
    	    	    	    {
    	    	    	    	    enemy.frame = 0;
    	    	    	    	    enemyFace = 0;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    enemy.frame = 5;
    	    	    	    	    enemyFace = 1;
    	    	    	    } 
    }
    
    function getXRegAimAir()
    {
    	    aimValue = avatar.body.x - enemy.body.x;
    	    if (aimValue < 0)
    	    {
    	    	    console.log(-Math.sqrt((regularShootSpeed * regularShootSpeed) + (aimValue * aimValue)));
    	    	    regularShootSpeedX = game.rnd.integerInRange(-50, 50) + (-Math.sqrt((regularShootSpeed * regularShootSpeed) + (aimValue * aimValue)));
    	    }
    	    else
    	    {
    	    	    console.log(Math.sqrt((regularShootSpeed * regularShootSpeed) + (aimValue * aimValue)));
    	    	    regularShootSpeedX = game.rnd.integerInRange(-50, 50) + (Math.sqrt((regularShootSpeed * regularShootSpeed) + (aimValue * aimValue)));
    	    }
    	    return regularShootSpeedX;
    }
        
    function getYRegAimAir()
    {
    	    regularShootSpeed = game.rnd.integerInRange(450, 500);
    	    //regularShootSpeed = 0;
    	    console.log(regularShootSpeed);
    	    return regularShootSpeed;
    }
    
    function airEnd()
    {
    	    notInScript = 1;
    	    enemy.body.velocity.x = 0;
    }
    
    function readyRegShoot()
    {
    	    regularShoot = 1;
    }
    
    function script11()
    {
    	    if (game.rnd.integerInRange(1, 9) < 6)
    	    {
    	    	   enemy.body.velocity.y = -600;
    	    	   enemy.body.velocity.x = 400;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .50, flip, null);
    	    	   regularShootCount = 3;
    	    	   game.time.events.add(Phaser.Timer.SECOND * .75, readyRegShoot, null);
    	    	   notInScript = 1;
    	    	   //fire script
    	    }
    }
    
    function script12()
    {
    	    //
    }
    
    function script13()
    {
    	    //
    }
    
    function script14()
    {
    	    //
    }
    
    function script21()
    {
    	    //
    }
    
    function script22()
    {
    	    //
    }
    
    function script23()
    {
    	    //
    }
    
    function script24()
    {
    	    //
    }
    
    function script31()
    {
    	    //
    }
    
    function script32()
    {
    	    //
    }
    
    function script33()
    {
    	    //
    }
    
    function script34()
    {
    	    //
    }
    
    function script41()
    {
    	    //
    }
    
    function script42()
    {
    	    //
    }
    
    function script43()
    {
    	    //
    }
    
    function script44()
    {
    	    enemy.body.velocity.y = -600;
    	    enemy.body.velocity.x = -400;
    }
    
    //remove errant attacks
    function killShot(wall, shot)
    {
    	    shot.destroy();
    	    shotCount = shotCount - 1;
    }
    
    function killFireShot(wall, fireShot)
    {
    	    fireShot.destroy();
    	    fireShotCount = fireShotCount - 1;
    }
    
    function killEnemyShot(wall, eShot)
    {
    	    eShot.destroy();
    	    shotEnemyCount = shotEnemyCount - 1;
    }
    
    function killEnemyFireShot(wall, eFireShot)
    {
    	    eFireShot.destroy();
    	    fireEnemyShotCount = fireEnemyShotCount - 1;
    }
    
    //damage players from successful attacks
    function damageAvatar(avatar, shot)
    {
    	    if (avatarLife > 5)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    avatarLife = avatarLife - 5;
    	    shot.destroy()
    	    shotEnemyCount = shotEnemyCount - 1;
    }
    
    function fireDamageAvatar(avatar, fShot)
    {
    	    if (avatarLife > 10)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    avatarLife = avatarLife - 10;
    	    fShot.destroy()
    	    fireEnemyShotCount = fireEnemyShotCount - 1;
    }
    
    function damageEnemy(enemy, shot)
    {
    	    if (enemyLife > 5)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    enemyLife = enemyLife - 5;
    	    shot.destroy()
    	    shotCount = shotCount - 1;
    }
    
    function fireDamageEnemy(enemy, fShot)
    {
    	    if (enemyLife > 10)
    	    {
    	    	  damage.play('', .6, 1, false);  
    	    }
    	    enemyLife = enemyLife - 10;
    	    fShot.destroy()
    	    fireShotCount = fireShotCount - 1;
    }
};
