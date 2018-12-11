$(document).ready(
    () => {
        // preload pictures while logo animation is running
        preloadPics();

        // delay start while logo animation is running
        setTimeout(() => { start(); }, 3000);
    } // end of ready
);

function start() {
    $(".logo").hide();
    $("header, .level-menu, .menu").show();

    // prepare levels
    createLevelTables();
    createLevelPageIndicator();
    styleLevelMenuToCurrenPage();
    addLevelEvents();
} // end of start


function preloadPics() {
    path = [
        "fruits/strawberry",
        "fruits/peach",
        "fruits/plum",
        "fruits/orange",
        "fruits/lime",
        "fruits/apple",
        "fruits/lemon",
        "fruits/kiwi",
        "fruits/blood_orange",
        "walls/rock_wall",
        "walls/stone_sm",
        "walls/stone_md",
        "walls/stone_lg",
        "flowers/flower1",
        "flowers/flower2",
        "flowers/flower3",
        "flowers/flower4",
        "flowers/flower5",
        "misc/basket",
        "misc/diamond",
        "shards/apple_shard1", "shards/apple_shard2", "shards/apple_shard3", "shards/apple_shard4", "shards/apple_shard5",
        "shards/blood-orange_shard1", "shards/blood-orange_shard2", "shards/blood-orange_shard3", "shards/blood-orange_shard4", "shards/blood-orange_shard5",
        "shards/kiwi_shard1", "shards/kiwi_shard2", "shards/kiwi_shard3", "shards/kiwi_shard4", "shards/kiwi_shard5",
        "shards/lemon_shard1", "shards/lemon_shard2", "shards/lemon_shard3", "shards/lemon_shard4", "shards/lemon_shard5",
        "shards/lime_shard1", "shards/lime_shard2", "shards/lime_shard3", "shards/lime_shard4", "shards/lime_shard5",
        "shards/orange_shard1", "shards/orange_shard2", "shards/orange_shard3", "shards/orange_shard4", "shards/orange_shard5",
        "shards/peach_shard1", "shards/peach_shard2", "shards/peach_shard3", "shards/peach_shard4", "shards/peach_shard5",
        "shards/plum_shard1", "shards/plum_shard2", "shards/plum_shard3", "shards/plum_shard4", "shards/plum_shard5",
        "shards/strawberry_shard1", "shards/strawberry_shard2", "shards/strawberry_shard3", "shards/strawberry_shard4", "shards/strawberry_shard5",
        "shards/blood_orange_shard1", "shards/blood_orange_shard2", "shards/blood_orange_shard3", "shards/blood_orange_shard4", "shards/blood_orange_shard5",
    ]; // end of fileName

    try {
        path.forEach(p => {
            const picVarName = p.match(/\/.+/g)[0].match(/\w+/)[0],
                img = new Image();

            img.src = `http://tschiboka.co.uk/projects/fruits_n_flowers_v2/images/${p}.png`;
            app.images[picVarName] = img;
        }); // end of forEach path
    } // end of try loading images
    catch (e) {
        throw Error("404 One or more picture couldn't be loaded from server!");
    } // end of catch
} // end of preloadPics


function createLevelPageIndicator() {
    // create as many page indicator as many tables are
    const tableNum = Math.ceil(levels.length / 25);

    // handle error and give messsage if level obj is missing
    if (!tableNum) {
        $(".level-menu__page").addClass("error--no-level")
            .html("Ooop, it looks like something went wrong: can not load levels! :(");

        throw Error("There is no levels object!");
    } // end of error handling

    for (i = 0; i < tableNum; i++) {
        const indicator = document.createElement("div"),
            light = document.createElement("div");

        $(indicator).addClass(`level-indicator to-level-page-${i + 1}`);
        $(light).addClass(`level-light to-level-page-${i + 1}`);

        if (i == 0) {
            $(light).addClass("level-light--active");
        } // end of if first page

        $(indicator).append(light);
        $(".level-menu__header__level-indicator").append(indicator);
    } // end of level page iteration
} // end of createLevelPageIndicator

function createLevelTables() {
    // get how many tables are created
    const tableNum = Math.ceil(levels.length / 25);
    let levelNum = 1;

    for (t = 0; t < tableNum; t++) {
        const table = document.createElement("table"),
            tbody = document.createElement("tbody");

        table.id = `level-page-${t + 1}`;
        $(table).addClass("level-page");

        // create rows
        for (r = 0; r < 5; r++) {
            const row = document.createElement("tr");

            // create cells
            for (c = 0; c < 5; c++) {
                const cell = document.createElement("td"),
                    box = document.createElement("div"),
                    progressBar = document.createElement("div");

                box.id = `level-btn-${levelNum} to-level-${levelNum}`;
                box.innerHTML = `${levelNum}`;

                progressBar.id = `level-progress-${levelNum} to-level-${levelNum}`;
                $(progressBar).addClass("level-progressbar");
                box.append(progressBar);

                cell.id = `level-cell-${levelNum}`;
                $(cell).addClass(`to-level-${levelNum}`);

                cell.append(box);

                // do not show cells that are out of the level array
                if (!levels[levelNum - 1]) {
                    $(box).hide();
                } // end of if theres no level at this number

                row.append(cell);
                levelNum++;
            } // end of for cell
            tbody.append(row);
        } // end of for row
        // make first table active
        if (t === 0) {
            $(table).addClass("active-page");
        }

        $(table).append(tbody);
        $(".level-menu__page").append(table);
    } // and of table for
} // end of createLevelTable


/*


        EVENTS


*/

function addLevelEvents() {
    // add eventlistener to arrows, there are only two of them, no need to delegate
    $(".level-menu__arrow-left").on("click", () => { turnLevelPage("-") });
    $(".level-menu__arrow-right").on("click", () => { turnLevelPage("+") });

    $(".level-menu__header__level-indicator").on("click", function (event) {
        // event is delegated by common class name to-level-page-n
        if (/to-level-page-/g.test($(event.target).attr("class"))) {
            const pageNum = $(event.target).attr("class").match(/to-level-page-\d+/g)[0]
                .match(/\d+/)[0]; // extract page number from class name
            turnLevelPage(pageNum);
        } // end of if target is valid elem
    }); // end of indicator click

    // add eventListeners to level buttons

    // demo just to trigger game board
    $(".to-level-1").on("click", () => startLevel(1));
} // end of addLevelEvents

function turnLevelPage(turnTo) {
    // turnTo parameter can be number or + or -
    // number turn page to the page number
    // + - increments or decrements it if possible

    const activePage = $(".active-page")[0],
        pageNum = activePage.id.match(/\d+/)[0];

    if (turnTo === "+") {
        displayPage(Number(pageNum) + 1, activePage);
    } else if (turnTo === "-") {
        displayPage(Number(pageNum) - 1, activePage);
    } else if (Number(turnTo)) {
        displayPage(turnTo, activePage);
    } else throw Error("turnLevelPage function got unvalid parameters : [" + turnTo + "]!");
} // end of turnLevelPage



function displayPage(pNum, currentActive) {
    const lastPage = Math.ceil(levels.length / 25);

    if (pNum > 0 && pNum <= lastPage) {
        $(currentActive).removeClass("active-page");
        $("#level-page-" + pNum).addClass("active-page")[0];
        styleLevelMenuToCurrenPage();
    } // end of if num in range
} // end of displayPage



function styleLevelMenuToCurrenPage() {
    const activePageNum = $(".active-page")[0].id.match(/\d+/g)[0];

    // hightlight the right page indicator
    $(".level-light--active").removeClass("level-light--active");
    $(".level-light.to-level-page-" + activePageNum).addClass("level-light--active");

    // activate available arrows
    activePageNum > 1
        ? $(".level-arrow-left").addClass("level-arrow-left--active")
        : $(".level-arrow-left").removeClass("level-arrow-left--active");
    activePageNum < Math.ceil(levels.length / 25)
        ? $(".level-arrow-right").addClass("level-arrow-right--active")
        : $(".level-arrow-right").removeClass("level-arrow-right--active");

    // change footer text accordingly
    $(".level-menu__footer__text-container")
        .html(`-&lt;[&nbsp;&nbsp;${activePageNum} / ${Math.ceil(levels.length / 25)}&nbsp;&nbsp;]&gt;-`);
} // end of styleLevelMenu




// In this function the event delegation is done by the characters id.
// Both box and picture can be targets, and their class name has their 
// unic number.
function addGameBoardEvents() {
    const
        extractRowCol = el => {
            // eleminate any invalid elements
            if ($(el).hasClass("game-board__cell-pic") || $(el).hasClass("game-board__cell-box")) {
                return el.id.match(/r\d+c\d+/g)[0];
            } // end of if invalid element
        }, // end of extract row col from id

        checkSwipeDirection = ids => {
            if (ids[0] && ids[1]) {
                // extract coordinates from ids
                const [Y1, X1] = [...ids[0].match(/\d+/g)].map(Number),
                    [Y2, X2] = [...ids[1].match(/\d+/g)].map(Number),
                    X = X2 - X1,
                    Y = Y2 - Y1;
                // check which axis is affected more by the swipe
                if (X === Y) {
                    return "NOMOVE"; // diagonal swipes are not valid
                } else
                    if (Math.abs(X) > Math.abs(Y)) {
                        if (X1 > X2) return "LEFT";
                        else return "RIGHT";
                    } else {
                        if (Y1 > Y2) return "UP";
                        else return "DOWN";
                    } // end of determining of axis
            } // end of if none of the ids missing
        }; // end of checkSwipeDirection

    let swapIds = [null, null];

    // event on a game board cell delegated to game board

    $(".game-board__table").on("mousedown touchstart", function (event) {
        event.preventDefault();
        if (app.game_interaction_enabled) {
            swapIds[0] = extractRowCol(event.target);
        } // interact only when it's allowed
    }); // end of game board mousedown

    $(".game-board__table").on("mouseup", function (event) {
        event.preventDefault();

        if (app.game_interaction_enabled) {
            if (swapIds[0]) {
                event.preventDefault();
                swapIds[1] = extractRowCol(event.target);

                // check for mobility (walls, stones...)
                if (checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds))) {
                    swipeCharacters(checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds)));
                } // end of if swipe is mobile
                // reset ids
                swapIds = [null, null];
            } // end of if mousedown or touchstart has already happened
        } // interact only when it's allowed
    }); // end of game board mouseup

    $(".game-board__table").on("touchend", function (event) {
        event.preventDefault();

        if (app.game_interaction_enabled) {
            if (swapIds[0]) {
                event.preventDefault();

                // Touchend returns the start position as a target by default
                // So we extract the end element by identifying which element
                // is on the current cursor position when the tounchend happens.
                const x = event.changedTouches[0].pageX,
                    y = event.changedTouches[0].pageY,
                    touchEndElem = document.elementFromPoint(x, y);

                swapIds[1] = extractRowCol(touchEndElem);

                // check for mobility (walls, stones...)
                if (checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds))) {
                    swipeCharacters(checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds)));
                } // end of if swipe is mobile
                // reset ids
                swapIds = [null, null];
            } // interact only when it's allowed
        } // end of if mousedown or touchstart has already happened
    }); // end of game board mouseup
} // end of addGameBoardEvents


// Check if swipe is valid in terms of immobile characters
// And return the row and column coords.
function checkswipeMobility(startId, dir) {
    if (["LEFT", "RIGHT", "UP", "DOWN"].find(dirs => dirs === dir)) {
        const [R1, C1] = startId.match(/\d+/g).map(Number);  // ROW COL

        // check board if the move is not possible because of walls and stones
        const originVal = app.board[R1][C1];
        let [R2, C2] = [R1, C1];  // copy

        // adjust it to the new direction
        switch (dir) {
            case "LEFT": { --C2; break; }
            case "RIGHT": { ++C2; break; }
            case "UP": { --R2; break; }
            case "DOWN": { ++R2; break; }
        } // end of switch

        const destinVal = app.board[R2][C2],
            immobileChars = ["S", "M", "L", "#", "U"];

        // check if swipe origin or destination are immobile
        if (immobileChars.find(ch => ch === originVal || ch === destinVal)) {
            return void (0);
        } // end of immobiliti check

        return [R1, C1, R2, C2, dir];
    } // end of if direction is valid
} // end of select


function swipeCharacters(swipeArgs) {
    function swapCharacters(r1, c1, r2, c2) {
        const temp = app.board[r1][c1];

        app.board[r1][c1] = app.board[r2][c2];
        app.board[r2][c2] = temp;
        displayBoard(); // show the new board when swap is done

        // special case for charaters with bonus classes (special gems)
        swapBonusClasses(r1, c1, r2, c2);
    } // end of swipeCharacters


    // function checks if any or both characters being swapped
    // are bonus and swaps their classes
    function swapBonusClasses(r1, c1, r2, c2) {
        const elem1 = $(`#r${r1}c${c1}-pic`),
            elem2 = $(`#r${r2}c${c2}-pic`),
            elemHasBonus = (el) => el.hasClass("bonus");

        // BOTH DIAMONDS
        // two diamonds clear all the fruits, and get extreme points 
        //(havent figured it out yet how much)
        if (app.board[r1][c1] === "*" && app.board[r2][c2] === "*") {
            const matches = [];
            console.log("2 DIAMONDS");
            app.board.map((row, rowInd) => {
                row.forEach((cell, cellInd) => {
                    // clear cell if fruit
                    if ("123456789".split("").some(fr => fr === cell)) {
                        // fill up matches with all the fruits available on board
                        matches.push(
                            {
                                "patternName": "none",
                                "sample": app.board[rowInd][cellInd],
                                "coords": [[rowInd, cellInd]]
                            } // end of match obj
                        ); // end of push

                        app.board[rowInd][cellInd] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                    } // end of if cell is fruit
                }); // end of cell iteration
            }); // end of forEach row

            // distroy diamonds
            app.board[r1][c1] = app.board[r2][c2] = "X";

            animateExplosions(matches);
        } // end of if both diamonds


        // get out of function if NONE has BONUS
        if (!elemHasBonus(elem1) && !elemHasBonus(elem2)) return void (0);

        // if one has bonus swap its classes an children
        const tempElemClass = $(elem1).hasClass("bonus") ? "bonus" : "",
            tempElemClone = $(elem1).children();

        $(elem1)
            .removeClass("bonus")
            .addClass($(elem2).hasClass("bonus") ? "bonus" : "")
            .empty()
            .append($(elem2)
                .children());

        $(elem2)
            .removeClass("bonus")
            .addClass(tempElemClass)
            .empty()
            .append(tempElemClone);

        // BOTH HAVE BONUS
    } // end of swapBonusClasses


    const [R1, C1, R2, C2, dir] = [...swipeArgs];  // destruct args

    // check if orientation is horizontal and if it is a flower and swipe them if they are
    const flowerAndHorizontal = () => {
        const flowerChars = ["A", "B", "C", "D", "E"],
            isFlower = (r, c) => flowerChars.find(fl => fl === app.board[r][c]);


        anyFlower = (isFlower(R1, C1) || isFlower(R2, C2)) ? true : false;
        isHorizontal = (dir === "LEFT" || dir === "RIGHT") ? true : false;
        return anyFlower && isHorizontal;
    };

    swapCharacters(R1, C1, R2, C2);
    const matches = checkMatches();
    console.log(JSON.stringify(matches));
    if (!matches) {
        if (!flowerAndHorizontal()) {
            app.game_interaction_enabled = false;

            // delay to see the unmatching swipe
            const swapDelay = () => setTimeout(() => {
                swapCharacters(R1, C1, R2, C2);
                clearTimeout(swapDelay);
                app.game_interaction_enabled = true; // set interaction back
            }, 150); // end of swapDelay 

            // delay and stop user interaction while showing unmatched swap
            swapDelay();
        } // end of swap back
    } // end of if no matches found
    else {
        animateExplosions(matches);
    } // end of if matches found
    displayBoard();
    checkFlowersOverBasket();
} // end of swipeCharacters



/*
 

            GAME BOARD FUNCTIONS


*/



// Check all possible match patterns and return them in an array
// Multiple matches return multiple arrays
function checkMatches() {
    const matches = [];
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern(r, c);
        } // end of cell iteration
    } // end of row iteration

    function checkPattern(r, c) {
        match("T7", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 2]);
        match("T7", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 0], [2, 1]);
        match("T7", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [0, 2], [1, 2]);
        match("T7", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [2, 2]);
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 2], [2, 2]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [2, 0], [2, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 1], [1, 1]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [2, 1], [2, 2]);
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [2, 1]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [1, 0], [1, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 2], [1, 2]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [1, 2]);
        match("I5", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]);
        match("I5", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]);
        match("L51", [r, c], [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]);
        match("L51", [r, c], [0, 0], [1, 0], [2, 0], [2, 1], [2, 2]);
        match("L52", [r, c], [0, 0], [0, 1], [0, 2], [1, 0], [2, 0]);
        match("L52", [r, c], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2]);
        match("T5", [r, c], [0, 0], [0, 1], [0, 2], [1, 1], [2, 1]);
        match("T5", [r, c], [1, 0], [1, 1], [1, 2], [0, 2], [2, 2]);
        match("T5", [r, c], [2, 0], [2, 1], [2, 2], [0, 1], [1, 1]);
        match("T5", [r, c], [0, 0], [1, 0], [2, 0], [1, 1], [1, 2]);
        match("I4H", [r, c], [0, 0], [0, 1], [0, 2], [0, 3]);
        match("I4V", [r, c], [0, 0], [1, 0], [2, 0], [3, 0]);
        match("O4", [r, c], [0, 0], [0, 1], [1, 0], [1, 1]);
        match("I3", [r, c], [0, 0], [0, 1], [0, 2]);
        match("I3", [r, c], [0, 0], [1, 0], [2, 0]);
    } // end of checking matches



    // match function arguments explained:
    // 1 - pattern name: later on we can get bonus points by referring which pattern we matched
    // 2 - [top-leftX, Y coordinates]: every single pattern search must start form top left,
    //     thus we certainly can avoid bumping into negative numbers
    // 3 - [[the pattern distance coordinates]]: the coordinates are representing the difference
    //     from the top-left coordinates, resulting dryer code.
    // The function returns false when no matches found or the matches array
    function match(patternName, [topLeftY, topLeftX], ...patterns) {
        // create ids from pattern
        const ids = patterns.map(p => [p[0] + topLeftY, p[1] + topLeftX]);


        const fruits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            isFruit = (r, c) => fruits.find(fr => fr === app.board[r][c]),
            // if any coords in range and is fruit
            validId = (ca => ca[0] < 10 && ca[1] < 8 && isFruit(ca[0], ca[1]));

        // if any of the ids are invalid, return, making the search faster if we certainly know
        // the pattern can not be matched
        for (i = 0; i < ids.length; i++) {
            if (!validId(ids[i])) return void (0);
        } // end of for ids

        chars = ids.map(ch => app.board[ch[0]][ch[1]]); // get all board values

        const isMatching = chars.every((ch, _, a) => ch === a[0]); // check  if every char is the same
        if (isMatching) {
            matches.push({
                "patternName": patternName,
                "sample": chars[0],
                "coords": [...ids]
            });

            // make matched patterns 0, so they won't be matched in other pattern searchres
            // resulting faster code running
            // and make explosion background
            ids.forEach(id => {
                app.board[id[0]][id[1]] = "X";
                $(`#r${id[0]}c${id[1]}-pic`).addClass("explosion");
            }); // end of ids iteration

        } // end of its matching 
    } // end of general match function
    // check if any of the matches has bonus
    checkBonuses();

    // get special gems, function modifies the board!!! in order to leave
    // one fruit with the special sign, avoiding destroying it
    getSpecialGems(matches);

    return matches.length ? matches : false; // return false if no matches 
} // end of checkMatches



function animateExplosions(matches) {
    // disable interaction with the gameboard while animation is going 
    // until new characters are on the board
    app.game_interaction_enabled = false;

    // parentXY is necessary for calculating the shards relative xy
    const parentXY = $(".game-board")[0].getBoundingClientRect();

    // iterate matches
    matches.map(match => {
        // iterate id coordinates
        for (i = 0; i < match.coords.length; i++) {
            const coord = match.coords[i];

            // get id XY position
            const idXY = $(`#r${coord[0]}c${coord[1]}-pic`)[0].getBoundingClientRect();

            // create 5 shards for each id
            for (sh = 0; sh < 5; sh++) {
                // create a shard
                shard = document.createElement("div");
                shard.id = `shard_r${coord[0]}c${coord[1]}`;
                $(shard).addClass("shard");

                // set x y relative to gameboard and its own piece position
                const diffX = [18, 18, 10, 2, 0], // each piece is placed a bit differently
                    diffY = [0, 14, 17, 14, 0];

                $(shard).css({ top: idXY.y - parentXY.y + diffY[sh], left: idXY.x - parentXY.x + diffX[sh] });

                // set background image according to the fruit type
                // 0 is reserved for transparent so array should start from 1
                const fruits = ["", "apple", "orange", "peach", "strawberry", "plum", "lime", "lemon", "blood_orange", "kiwi"],
                    imgName = fruits[Number(match.sample)] + "_shard" + (sh + 1),
                    imgURL = `url(${app.images[imgName].src})`;

                $(shard).css(`backgroundImage`, imgURL);
                $(shard).addClass(`shard${sh + 1}`); // add shard number for different keyframe animations

                // delay explosion on pieces randomly
                const randomDelay = ((Math.random() * 1.5) / 10).toFixed(2) + "s";
                $(shard)[0].style.animationDelay = randomDelay;
                $(shard)[0].style.WebkitAnimationDelay = randomDelay;
                $(".game-board").append(shard);
            } // end of creating five shards
        }; // end of iteration id times
    }); //end of match iteration

    // remove elements with 0.45s delay, giving time for animation
    const removeShardsDelay = setTimeout(() => {
        $(".shard").remove();

        // when animation is done start to fill the board up again
        gravity();  // make elements fill the created gaps
        clearTimeout(removeShardsDelay);
    }, 450);
} // end of animateExplosions


function gravity() {
    let currentBoard = app.board;
    // each column need to be tested against column gravity
    const columnGravityDone = Array(9).fill(false);
    let testCol = ["1", "3", "9", "X", "L", "A", "M", "S", "#", "X", "U"];

    // function returns if the column has any element that is against gravity
    // Consider: walls, stones, baskets have fixed position on the board,
    // while fruits and flowers are mobile elements 
    function checkColumnGravity(col) {
        // check if column has any X (gaps)
        if (!col.some(e => e === "X")) return true;

        // check if the first gap has any mobile element above (any fruit or flower, rest are immobile) 
        const firstGap = col.indexOf("X"),
            restOfCol = col.slice(firstGap + 1, col.length);


        return !(/[A-E1-9]/g.test(restOfCol.join("")));
    } // end of checkColumnGravity



    // function gives the special classes its own gravity
    function gravitiseColumnBonusGems(colNum, col) {
        // find the first gap
        const firstGap = col.indexOf("X");

        // check if is there any special gems above the gap
        const specialGemCoords = col.slice(firstGap + 1)
            .reverse()  // in order to have the right row index
            .map((_, cellInd) => $(`#r${cellInd}c${colNum}-pic`)[0])
            .filter(div => $(div).hasClass("bonus"))
            .reverse();

        // check the first available non wall stone or basket position under the special gems
        specialGemCoords.forEach(spGem => {
            const gemRow = Number(spGem.id.match(/\d+/)[0]),
                moveRange = col.slice(firstGap)
                    .reverse()
                    .slice(gemRow + 1),
                moveTo = moveRange.findIndex(el => [..."123456789X"].find(ch => ch === el));

            // append child div to its new cell, remove class from old one
            const clone = $(spGem).children();
            $(spGem)
                .removeClass("bonus")
                .empty();
            $(`#r${gemRow + moveTo + 1}c${colNum}-pic`)
                .addClass("bonus")
                .append(clone);
        }); // end of specialGemCoordsd iteration
    } // end of gravitiseColumnBonusGems



    // Function applies gravity on column recieved as its parameter.
    function gravitiseColumn(col) {
        // take off fixed positioned elements from column
        const fixedPosGem = ["S", "M", "L", "#", "U"],
            isFixedPosGem = (gem) => fixedPosGem.find(el => el === gem),
            newCol = col.filter(gem => isFixedPosGem(gem) ? "" : gem);
        // find first gap ("X") and remove it from column and put it on the top (end)
        const firstGap = newCol.indexOf("X");
        newCol.splice(firstGap, 1);

        newCol.push("X");

        // place fixed pos items back to their original place
        col.map((orig, oInd) => {
            if (isFixedPosGem(orig)) {
                newCol.splice(oInd, 0, orig);
            } // end of if gem is a fixedPos
        }); // end of original column iteration

        return newCol;
    } // end of gravitiseColumn


    // function iterates all columns, if column needs gravity, apply
    // else correct columnGravityDone array 
    function gravitiseBoard(board) {
        const updateColumnGravityDone = (c, cn) => {
            columnGravityDone[cn] = checkColumnGravity(c);
            return columnGravityDone[cn];
        } // end of update...

        for (colNum = 0; colNum < board[0].length; colNum++) {
            // check if column need gravity end skip the ones 
            // that have no altering needed (first iteration all cols checked)
            if (!columnGravityDone[colNum]) {
                // Extract the column from board
                let column = board.map(row => row[colNum]).reverse();

                if (!updateColumnGravityDone(column, colNum)) {
                    gravitiseColumnBonusGems(colNum, column);
                    column = gravitiseColumn(column);
                    // modify the board
                    let gem = 0; // column counter for row iteration
                    for (r = currentBoard.length - 1; r >= 0; r--) {
                        currentBoard[r][colNum] = column[gem++]; // update board 
                    } // end of row iteration
                    updateColumnGravityDone(column, colNum); // if done, it can skip next iteration
                } // end of if gravity needed
            } // end of first gravity arr check
        } // end of column iteration
        app.board = currentBoard; // update the live board
        displayBoard();

        // recursive function with delay until all gaps are on the top
        if (columnGravityDone.some(c => !c)) {
            const gravityDelay = setTimeout(() => {
                gravitiseBoard(currentBoard);
                clearTimeout(gravityDelay);
            }, 20); // end of timer
        } // end of if board incomplete 
        else {
            fillBoardWithNewFruits();
        } // end of if board is done and ready to refill
    } // end of gravitizeBoard

    gravitiseBoard(currentBoard);
} // end of gravity


function fillBoardWithNewFruits() {
    const idsToFill = [];

    for (r = 10; r >= 0; r--) {
        for (c = 0; c < 8; c++) {
            if (app.board[r][c] === "X") {
                idsToFill.push([[r], [c]]);
            } // end of if cell is empty
        } // end of cell iteration
    } // end of reverse row iteration

    function fillEmptyCell(num) {
        const randFruit = Math.ceil(Math.random() * levels[app.currentLevel - 1].fruitVariationNumber) + "";
        app.board[idsToFill[num][0]][idsToFill[num][1]] = randFruit;
        displayBoard();
    } // end of fillEmptyCell

    let nextId = 0;
    const drippingDelay = setInterval(() => {
        if (nextId === idsToFill.length) {
            clearInterval(drippingDelay);
            cicleMatches(); // cicle back and look for more matches
        } else {
            fillEmptyCell(nextId);
            nextId++;
        } // end of if there are still more ids to fill
    }, 50); // end of drippingDelay
} // end of drippingNewFruits



function cicleMatches() {
    const matches = checkMatches();
    displayBoard();
    if (matches) {
        animateExplosions(matches);
        checkFlowersOverBasket();
    } // if there are further matches
    else {
        app.game_interaction_enabled = true;
    } // give interaction back to player
    checkFlowersOverBasket();
} // end of cicleMatches


function checkFlowersOverBasket() {
    // get the basket positions
    basketsPos = []
    app.board.forEach((row, rowPos) =>
        row.forEach((cell, cellPos) => {
            if (cell === "U") basketsPos.push([rowPos, cellPos]); // fill up basketPositions
        })); // end of board search

    // check if character above is flower
    const isFlower = (r, c) => ["A", "B", "C", "D", "E"].find(fl => fl === app.board[r][c]);

    // remove flowers from board
    basketsPos.forEach(basket => {
        // skip basket on row 0, it gets Error, flower on row -1 is impossible
        if (basket[0] !== 0) {
            if (isFlower(basket[0] - 1, basket[1])) {
                // add flower to the app
                app.flowers++;
                // remove flower
                app.board[basket[0] - 1][basket[1]] = "X";
                // add animation
                $(`#r${basket[0] - 1}c${basket[1]}-pic`)
                    .removeClass("spin-pic")
                    .addClass("flower-disappear");

                // remove class if animation is done
                const flowerTimer = setTimeout(() => {
                    $(`#r${basket[0] - 1}c${basket[1]}-pic`).removeClass("flower-disappear");

                    // check newly created board
                    gravity();
                    // check if the changed board has any matches
                    const matches = checkMatches();
                    if (matches) {
                        animateExplosions(matches);
                    }
                    displayBoard();

                    clearTimeout(flowerTimer);
                }, 450); // end of delayed class removal
            } // if flower
        } // end of if row > 0
    }); // end of basket iteration
} // end of checkFloversOverBasket


function getSpecialGems(matches) {
    const getRandomPos = (posArr) => Math.floor(Math.random() * posArr.length);

    matches.forEach(match => {
        const specialCoord = match.coords[getRandomPos(match.coords)];

        // ignore matches like I3 or diamond T7
        if (match.patternName !== "I3" && match.patternName !== "T7" && match.patternName !== "O4") {
            // get one of the position randomly and put the special class 
            $(`#r${specialCoord[0]}c${specialCoord[1]}-pic`).addClass("bonus");
            createspecialGemDiv(specialCoord, match.patternName);

            // leave one of the sample on the board
            app.board[specialCoord[0]][specialCoord[1]] = match.sample;
        } // end of if not I3 T7

        // T7 creates a diamond
        if (match.patternName === "T7") {
            app.board[specialCoord[0]][specialCoord[1]] = "*";
        } // end of if T7
    }); // end of match iteration
} // end of getSpecialGems




// function creates the special divs for bonus gems
// parameters: the gems coordinates, 
//             the name of the pattern
function createspecialGemDiv(coord, name) {

    // function append a div with className to specialDiv
    function addDivToBonusDiv(className) {
        const div = document.createElement("div");

        $(div).addClass(className);
        $(specialDiv).append(div);
    } // end of addDiv


    const specialDiv = document.createElement("div"),
        patternName = name;


    switch (name) {
        case "I4V": {
            addDivToBonusDiv("bonus-vertical-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I4V`);
            break;
        } // end of case I4V
        case "I4H": {
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I4H`);
            break;
        } // end of case I4H
        case "T5": {
            addDivToBonusDiv("bonus-square");
            $(specialDiv).addClass(`bonus-sign SIGN-T5`);
            break;
        } // end of case T5
        case "L51": {
            addDivToBonusDiv("bonus-diagonal1-line");
            $(specialDiv).addClass(`bonus-sign SIGN-L51`);
            break;
        } // end of case L51
        case "L52": {
            addDivToBonusDiv("bonus-diagonal2-line");
            $(specialDiv).addClass(`bonus-sign SIGN-L52`);
            break;
        } // end of case L52
        case "I5": {
            // I5 match is randomly + or X
            if (!!Math.floor(Math.random() * 2)) {
                addDivToBonusDiv("bonus-diagonal1-line");
                addDivToBonusDiv("bonus-diagonal2-line");
                $(specialDiv).addClass(`bonus-sign SIGN-I5X`);
            }
            else {
                addDivToBonusDiv("bonus-vertical-line");
                addDivToBonusDiv("bonus-horizontal-line");
                $(specialDiv).addClass(`bonus-sign SIGN-I5CR`);
            } // end of if random false or true
            break;
        } // end of case T6
        case "T6": {
            addDivToBonusDiv("bonus-diagonal1-line");
            addDivToBonusDiv("bonus-diagonal2-line");
            addDivToBonusDiv("bonus-vertical-line");
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-T6`);
            break;
        } // end of case T6
    } // end of switch patternNames
    $(`#r${coord[0]}c${coord[1]}-pic`).append(specialDiv);
} // end of createSpecialGemDiv


// function check if any gaps created by a match or a bonus explosion has bonuses
function checkBonuses() {
    app.board.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
            const elem = $(`#r${rowInd}c${cellInd}-pic`);
            if (cell === "X" && elem.hasClass("bonus")) {
                // extract the bonus type from childrens class
                const bonusType = elem
                    .children()
                    .attr("class")
                    .split("SIGN-")[1];

                // remove bonus
                $(elem)
                    .removeClass("bonus")
                    .empty();

                bonusExplode(bonusType, rowInd, cellInd);
            } // end of if gap and Bonus
        }); // end of cell foreach
    }); // end of row foreach
} // end of checkBonuses




// explose bonuses in different patterns according to bonusType
function bonusExplode(bonusType, rowInd, cellInd) {
    function explose(r, c) {
        // prevent any invalid value to cause error
        if (r < 0 || r > 10 || c < 0 || c > 8) return void (0);

        const fruits = [..."123456789"],
            char = app.board[r][c];

        if (fruits.some(fr => fr === char)) {
            app.board[r][c] = "X";
            $(`#r${r}c${c}-pic`).addClass("explosion");
            console.log("EXPLOSION ON", r, c);
        } // end of if char is fruit
    } // end of explode 


    // set the direction like dirR = -1 so it will check the negative direction
    // quick 101 on dirR dirC: NE: -1 1, SE: 1 1, SW: 1 -1, NW: -1 -1
    const exploseDiagonal = (dirR, dirC) => [...Array(8).keys()]
        .forEach(dist => explose(rowInd + dist * dirR, cellInd + dist * dirC));


    switch (bonusType) {
        case "I4H": {
            // get all row X
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            break;
        } // end of case I4H
        case "I4V": {
            // get all cell Y
            app.board.forEach((_, ri) => explose(ri, cellInd));
            break;
        } // end of case I4H
        case "T5": {
            let r = rowInd,
                c = cellInd;

            const explosionPath = [
                [r - 2, c],                                             //      *
                [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],             //    * * *
                [r, c - 2], [r, c - 1], [r, c], [r, c + 1], [r, c + 2], //  * * * * *
                [r + 1, c - 1], [r + 1, c], [r + 1, c + 1],             //    * * *
                [r + 2, c]                                              //      *
            ];

            explosionPath.forEach(xy => explose(xy[0], xy[1]));
            break;
        } // end of case T5
        case "L51": {
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            break;
        } // end of case L51 ( \ ) diag from NW to SE
        case "L52": {
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
            break;
        } // end of case L51 ( \ ) diag from NW to SE
        case "I5CR": {
            app.board.forEach((_, ri) => explose(ri, cellInd));
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            break;
        } // end of case I5CR
        case "I5X": {
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
            break;
        } // end of case I5X
        case "T6": {
            app.board.forEach((_, ri) => explose(ri, cellInd));
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
        } // end of case T6
    } // end of swith

    displayBoard();
    // recursively check bonuses, if they triggered more explosions
    checkBonuses();
} // end of bonusExplode




/*
 
        LEVELS
 
*/

/* 
 * Each level object consist :
 *     - blueprint: array of 11 strings with 9 chars
 *         - "X"       : transparent (when matches found)
 *         - "1" - "9" : cell is different fruits
 *         - "."       : any random fruits
 *         - "A" - "E" : cell is one of the flowers
 *         - "F"       : any random flower
 *         - "S, M, L" : cell is stone small medium large (breakable)
 *         - "#"       : cell is wall (unbreakable)
 *         - "U"       : cell is basket
 *         - "*"       : diamonds 
 *         - "a" - "z" :lower case letters are kept for special characters like explosions and time stopers
 *     - fruitVariationNumber : determine the number of the possible randomly
 *         created fruits [5 - 9] 
 */

var levels = [
    // level 1
    {
        "blueprint": [
            "A2211112B",
            "#2323176#",
            "#2223132#",
            "#1163432#",
            "#5453451#",
            "#4163452#",
            "#5313456#",
            "#2163564#",
            "#22C1561#",
            "#42**555#",
            "###UUU###",
        ],
        "fruitVariationNumber": 6,
    }, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
];


/*
 
        GLOBAL APP VARIABLES
 
*/

var app = {
    "board": [],          // the current game gems position
    "valid_board_characters": ["X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "S", "M", "L", "A", "B", "C", "D", "E", "U", "*"],
    "images": [],         // the preloaded pictures
    "game_interaction_enabled": true, // responsible for switching off mouse and touch events, while animating or searching for matches
    "currentLevel": 1,
    "flowers": 0,         // the players collected flowers on the actual level
}; // end of app global object



// demo just to trigger game board
function startLevel(level) {
    // arrange new layout
    $(".level-menu").hide();
    $("header").addClass("header-out");
    $(".game-board").show();
    //toggleFullScreen();

    // create game environment
    createGameBoard();
    createBoardArray(level - 1);
    displayBoard();
    addGameBoardEvents();
} // end of startLevel



function createGameBoard() {
    const board = document.createElement("table"),
        tbody = document.createElement("tbody");

    // add rows
    for (r = 0; r < 11; r++) {
        const row = document.createElement("tr");

        // add picture holding cells and pic divs
        for (c = 0; c < 9; c++) {
            const picBox = document.createElement("td"),
                picDiv = document.createElement("div");

            picBox.id = `r${r}c${c}-box`;
            picDiv.id = `r${r}c${c}-pic`;

            $(picBox).addClass("game-board__cell-box");
            $(picDiv).addClass("game-board__cell-pic");

            $(picBox).append(picDiv);
            $(row).append(picBox);
        } // end of creating cells

        $(tbody).append(row);
        $(".game-board").append(board);
    } // end of adding rows

    $(board).addClass("game-board__table");
    $(board).append(tbody);
} // end of createGameBoard



function createBoardArray(level) {
    const board = levels[level]["blueprint"].map(row => [...row]);

    // check if level is crafted correctly

    if (board.length !== 11) {
        return Error("The length of game-board is incorrect, it must be 11, instead it is :" + board.length + "!");
    } // end of if board length is incorrect

    board.map((row, rowInd) => {
        if (row.length !== 9) {
            return Error(`Invalid length of row[${rowInd}]. It must be 9, instead it is ${row.length}!`);
        } // end of if length is incorrect

        row.map((cell, cellInd) => {
            if (!app.valid_board_characters.find(ch => ch === cell)) {
                return Error(`Invalid character (${cell}) at row ${rowInd} cell ${cellInd}!`);
            } // end of if cell is not a valid char
        }); // end of cell iteration
    }); // end of board row iteration

    app.board = board;
} // end of loadBoardArray



function displayBoard() {
    const imgMap = {
        "1": app.images.apple,
        "2": app.images.orange,
        "3": app.images.peach,
        "4": app.images.strawberry,
        "5": app.images.plum,
        "6": app.images.lime,
        "7": app.images.lemon,
        "8": app.images.blood_orange,
        "9": app.images.kiwi,
        "#": app.images.rock_wall,
        "S": app.images.stone_sm,
        "M": app.images.stone_md,
        "L": app.images.stone_lg,
        "A": app.images.flower1,
        "B": app.images.flower2,
        "C": app.images.flower3,
        "D": app.images.flower4,
        "E": app.images.flower5,
        "U": app.images.basket,
        "*": app.images.diamond,
    }; // end of imgMap

    // add the corrisponding icons to the board table
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            const idName = `#r${r}c${c}-pic`;
            let char = app.board[r][c]; // holds the character

            // set wall sizes bigger
            if (char === "#") {
                $(idName).addClass("wall-size");
            } // end of if it's a wall 
            else {
                $(idName).removeClass("wall-size");
            } // end of if not a wall



            // spin flowers and diamonds
            if (["A", "B", "C", "D", "E", "*"].find(cell => cell === char)) {
                $(idName).addClass("spin-pic");
            } // end of if cell is spinning
            else {
                $(idName).removeClass("spin-pic");
            }

            // remove explosion class with delay
            const explosionDelay = setTimeout(() => {
                $(idName).removeClass("explosion");
                clearTimeout(explosionDelay);
            }, 500); // end of delay

            if (char === "X") {
                $(idName).css("background-image", "none");
            } else {
                $(idName).css("background-image", `url(${imgMap[char].src}`);
            } // end of if board value is not "0"
        } // end of cell iteration
    } // end of row iteration
} // end of displayBoard