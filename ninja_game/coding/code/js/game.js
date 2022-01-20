
const key = {
    keyDown : {},
    keyValue : {
        37: 'left',
        39: 'right',
        88: 'attack',
        67: 'slide',
        13: 'enter'

    }
}

const allMonsterComProp = {
    arr: []
}

//수리검 관리
const bulletComProp = {
    launch: false,
    arr: []
}

const gameBackground = {
    gameBox: document.querySelector('.game')
}

const stageInfo = {
    stage: [],
    totalScore: 0,
    monster: [
        {defaultMon: greenMon, bossMon: greenMonBoss},
        {defaultMon: yellowMon, bossMon: yellowMonBoss},
        {defaultMon: pinkMon, bossMon: pinkMonBoss},
        {defaultMon: pinkMon, bossMon: zombieKing}
    ],
    callPosition: [1000, 5000, 9000, 12000]
}

const gameProp = {
    screenWidth : window.innerWidth,
    screenHeight : window.innerHeight,
    gameOver : false
}

const renderGame = () => {
    hero.keyMotion();   // 키눌림에 딜레이없이 잘 움직임
    setGameBackground();

    npcOne.crash();
    npcTwo.crash();

    bulletComProp.arr.forEach((arr,i) => {
        arr.moveBullet();
    });
    allMonsterComProp.arr.forEach((arr, i) => {
        arr.moveMonster();
    });
    stageInfo.stage.clearCheck();
    window.requestAnimationFrame(renderGame);
}

const endGame = () => {
    gameProp.gameOver = true;
    key.keyDown.left = false;
    key.keyDown.right = false;
    document.querySelector('.game_over').classList.add('active');
}

const setGameBackground = () => {
    let parallaxValue = Math.min(0, (hero.movex-gameProp.screenWidth/3) * -1);

    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
}

const windowEvent = () => {
    window.addEventListener('keydown', e => {
        // console.log(e.which);
        if(!gameProp.gameOver) key.keyDown[key.keyValue[e.which]] = true;
        if(key.keyDown['enter']){
            npcOne.talk();
            npcTwo.talk();
        }
    });

    window.addEventListener('keyup', e => {
        key.keyDown[key.keyValue[e.which]] = false;
    });

    window.addEventListener('resize', e => {
        gameProp.screenWidth = window.innerWidth;
        gameProp.screenHeight = window.innerHeight;
    });
}
const loadImg = () => {
    const preLoadImgSrc = ['../../lib/images/ninja_attack.png', '../../lib/images/ninja_run.png', '../../lib/images/ninja_slide.png'];
    preLoadImgSrc.forEach( arr => {
        const img = new Image();
        img.src = arr;
    });
}

let hero;
let npcOne;
let npcTwo;

const init = () => {  
    hero = new Hero('.hero');
    stageInfo.stage = new Stage();
    npcOne = new Npc(levelQuest);
    npcTwo = new Npc(levelQuestTwo);

    // 몬스터 각각 생산
    // allMonsterComProp.arr[0] = new Monster(greenMonBoss, gameProp.screenWidth + 700);
    // allMonsterComProp.arr[1] = new Monster(yellowMonBoss, gameProp.screenWidth + 1400);
    // allMonsterComProp.arr[2] = new Monster(pinkMonBoss, gameProp.screenWidth + 2100);

    //몬스터 대량 생산
    // for(let i=0; i <= 10; i++){
    //     if(i === 10){
    //         allMonsterComProp.arr[i] = new Monster(greenMonBoss, gameProp.screenWidth + 600 * i);
    //     }else{
    //         allMonsterComProp.arr[i] = new Monster(greenMon, gameProp.screenWidth + 700 * i);
    //     } 
    // }

    loadImg();
    windowEvent();
    renderGame();
}

window.onload = () => {
    init();
}
