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
                app.game_time_from_last_hint = 0; // cancel hints if user swipes

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
                app.game_time_from_last_hint = 0; // cancel hints if user swipes

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

        // the actual swapping function, do the code gets DRYer
        function swapElementsAndClasses(e1, e2) {
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

        } // end of swapElementsAndClasses

        const elem1 = $(`#r${r1}c${c1}-pic`),
            elem2 = $(`#r${r2}c${c2}-pic`),
            elemHasBonus = (el) => el.hasClass("bonus");

        // get out of function if NONE has BONUS or DIAMOND
        if (!elemHasBonus(elem1) && !elemHasBonus(elem2) &&
            app.board[r1][c1] !== "*" && app.board[r2][c2] !== "*") return void (0);


        // BOTH DIAMONDS
        // two diamonds clear all the fruits, and get extreme points 
        //(havent figured it out yet how much)
        if (app.board[r1][c1] === "*" && app.board[r2][c2] === "*") {
            const matches = [];
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
            return void (0); // escape out of function
        } // end of if both diamonds

        // if ONE is DIAMOND
        // explose all fruits the same type it was swapped with
        if (app.board[r1][c1] === "*" || app.board[r2][c2] === "*") {
            // get the type of the fruit, which of the two is unknown though
            const fruit = app.board[r1][c1] === "*" ? app.board[r2][c2] : app.board[r1][c1],
                matches = [];

            // if the element being swapped with diamond is a fruit explose, else return
            if ("123456789".split("").some(fr => fr === fruit)) {
                app.board.forEach((row, rowInd) => {
                    row.forEach((cell, cellInd) => {
                        if (cell === fruit) {
                            // fill up the matches with the corrisponding fruit
                            matches.push(
                                {
                                    "patternName": "none",
                                    "sample": app.board[rowInd][cellInd],
                                    "coords": [[rowInd, cellInd]]
                                } // end of match obj
                            ); // end of matches push

                            app.board[rowInd][cellInd] = "X";
                            $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        } // end of if cell the fruit to be destroyed
                    }); // end of cell iteration
                }); // end of row iteration

                // destroy the diamond, we don't know which one is diamond
                app.board[r1][c1] === "*" ? app.board[r1][c1] = "X" : app.board[r2][c2] = "X";
                animateExplosions(matches);
                return void (0); // escape out of function
            } // end of if the one being swapped is a fruit
            else return void (0);
        } // end of if one is diamond


        // if BOTH has BONUS, do both elements' explosion
        if (elemHasBonus(elem1) && elemHasBonus(elem2)) {
            swapElementsAndClasses(elem1, elem2);

            // fill matches with the two elements being swapped
            const matches = [
                {
                    "patternName": "none",
                    "sample": app.board[r1][c1],
                    "coords": [[r1, c1]]
                }, // end of match obj1
                {
                    "patternName": "none",
                    "sample": app.board[r2][c2],
                    "coords": [[r2, c2]]
                } // end of match obj2
            ]; // end of matches

            app.board[r1][c1] = app.board[r2][c2] = "X";
            $(`#r${r1}c${c1}-pic`).addClass("explosion");
            $(`#r${r2}c${c2}-pic`).addClass("explosion");
            animateExplosions(matches);
            return void (0); // escape out of function
        } // end of both bonus


        // the remaining option is, if ONE has BONUS swap its classes an children
        // otherwise the execution is already out of this function

        swapElementsAndClasses(elem1, elem2);
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

    if (!matches) {
        if (!flowerAndHorizontal()) {
            app.game_interaction_enabled = false;
            app.game_hint_is_paused = true; // hints stops

            // delay to see the unmatching swipe
            const swapDelay = () => setTimeout(() => {
                swapCharacters(R1, C1, R2, C2);
                clearTimeout(swapDelay);
                app.game_interaction_enabled = true; // set interaction back
                app.game_hint_is_paused = false; // hint can count time again
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
            validId = (ca => ca[0] < 11 && ca[1] < 9 && isFruit(ca[0], ca[1]));

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

            // make matched patterns X, so they won't be matched in other pattern searches
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
    app.game_hint_is_paused = false; // hint stops counting time, so it won't disrupt animation

    // parentXY is necessary for calculating the shards relative xy
    const parentXY = $(".game-board")[0].getBoundingClientRect();

    // iterate matches
    matches.map(match => {
        if (match.sample !== "X") {
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
        } // end if sample is not none
    }); //end of match iteration

    // remove elements with 0.45s delay, giving time for animation
    const removeShardsDelay = setTimeout(() => {
        $(".shard").remove();

        // when animation is done start to fill the board up again
        gravity();  // make elements fill the created gaps
        clearTimeout(removeShardsDelay);
    }, 450);

    destroyStones(matches.map(match => match.coords));
} // end of animateExplosions


function gravity() {
    let currentBoard = app.board;
    // each column need to be tested against column gravity
    const columnGravityDone = Array(9).fill(false);

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
        for (c = 0; c <= 8; c++) {
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
        const possibleMatches = possibleMoves();
        console.log("Possible Moves", possibleMatches);
        if (possibleMatches.length === 0) {
            noMoreMovesMessage();
        } // end of there are no more moves on board
        else {
            app.game_interaction_enabled = true; // give interaction back to player
            app.game_hint_is_paused = false; // hint can count time again
        } // end of if there are possible matches
    } // end of if there are no further matches
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

        // O4 adds 5 sec extra time
        if (match.patternName === "O4") {
            app.game_time_left += 5;

            // animate the five sec to go into the time display
            // create element
            const fiveSec = document.createElement("div");
            $(fiveSec).attr("id", "five-sec");

            // add it to the board
            $(".game-board")[0].append(fiveSec);

            // detect match coordinates
            let coords = match.coords.map(m => $(`#r${m[0]}c${m[1]}-box`)[0].getBoundingClientRect());
            console.log(coords);
        } // end of if O4

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
        } // end of if char is fruit

        // take care of stones
        switch (app.board[r][c]) {
            case "L": {
                app.board[r][c] = "M";
                break;
            } // end of case large
            case "M": {
                app.board[r][c] = "S";
                break;
            } // end of case large
            case "S": {
                app.board[r][c] = "X";
                $(`#r${r}c${c}-pic`).addClass("explosion");
            } // end of case large
        } // end of switch stone

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



// function check if any gap created by an explosion or match has any stones around
// Large stones become medium, medium small, small becomes a gap
function destroyStones(coordsArr) {
    coordsArr.forEach(coords => {
        coords.forEach(coord => {
            // check if any of the cells around is stone [North, South, West, East]
            const [rowInd, cellInd] = [...coord],
                cellsAroundHaveStone = [
                    (app.board[rowInd - 1] || [])[cellInd],  // avoid array out of range error
                    (app.board[rowInd + 1] || [])[cellInd],
                    app.board[rowInd][cellInd - 1],
                    app.board[rowInd][cellInd + 1]
                ]; // end of cellsAroundHaveStones declaration

            cellsAroundHaveStone.forEach((cellAround, ind) => {
                const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]][ind]; // returns the index the stone is on

                switch (cellAround) {
                    case "L": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "M";
                        break;
                    } // end of case large stone
                    case "M": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "S";
                        break;
                    } // end of case large stone
                    case "S": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        break;
                    } // end of case large stone
                } // end of switch cellAround
            }); // end of iterate cellsAroundHaveStone
        }); // end of coord iteration
    }); // end of coordsArr iteration
} // end of destroyStones


// function returns possible matches, or null if none left
function possibleMoves() {
    function checkPattern(patternName, indices, r, c, r1, c1) {
        const valsOnIndex = [];
        // return false if any of the indices are out of boards range
        // or the val is not matching the first instance of the val array
        // making the iteration as efficient as possible
        for (i = 0; i < indices.length; i++) {
            const val = (app.board[indices[i][0] + r] || [])[indices[i][1] + c];

            // if value out of range, spare some computation cost
            if (!val) return false;

            // build values
            valsOnIndex.push(val);

            // if any of the values are different than the first one,
            // escape; no further search will fulfill the requirement of a match
            if (val !== valsOnIndex[0]) return false;
        } // end of indices iteration

        moves.push({
            "patternName": patternName,
            "swap": [[r, c], [r1, c1]],
            "coords": indices.map(index => [index[0] + r, index[1] + c])
        }); // end of push moves

        return true;
    } // end of check patterns

    let moves = [];
    const isMobileChar = (cell) => "123456789ABCDE".split("").some(fr => fr === cell);

    app.board.forEach((row, rowInd) =>
        row.forEach((cell, cellInd) => {
            // ignore immobile characters, swipe would be impossible anyway
            if (isMobileChar(cell)) {
                // if any match is found return, no more search is required, 
                // so always the highest valued match is gonna be in moves obj

                // SWIPE RIGHT
                if (cellInd < 8 && isMobileChar(app.board[rowInd][cellInd - 1])) {
                    function checkRightSwipe() { //direction functions are created so I can escape them separately
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, -1], [1, 0], [2, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -1], [1, 0], [2, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I5", [[-2, 0], [-1, 0], [0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("L5", [[2, 0], [1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T5", [[0, -1], [-1, 0], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I4", [[-2, 0], [-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [1, 0], [1, 1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [-1, 0], [-1, 1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [0, -1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                    } // end of checkRightSwipe

                    checkRightSwipe();
                } // end of swipe RIGHT

                // SWIPE LEFT
                if (cellInd < 8 && isMobileChar(app.board[rowInd][cellInd + 1])) {
                    function checkLeftSwipe() {
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, 1], [1, 0], [2, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I5", [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("L5", [[0, -2], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T5", [[0, -2], [0, -1], [-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I4", [[-2, 0], [-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [1, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("O4", [[-1, -1], [-1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                    } // end of checkLeftSwipe

                    checkLeftSwipe();
                } // end of swipe LEFT

                // SWIPE DOWN
                if (cellInd < 8 && isMobileChar((app.board[rowInd - 1] || [])[cellInd])) {
                    function checkDownSwipe() {
                        if (checkPattern("T7", [[-1, 0], [0, -2], [0, -1], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -1], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -2], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I5", [[0, -2], [0, -1], [-1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-1, 0], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-1, 0], [0, -1], [0, -2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T5", [[-1, 0], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [0, 1], [1, 0], [1, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [0, -1], [1, -1], [1, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -2], [0, -1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                    } // end of checkDownSwipe

                    checkDownSwipe();
                } // end of swipe DOWN

                // SWIPE UP
                if (cellInd < 8 && isMobileChar((app.board[rowInd + 1] || [])[cellInd])) {
                    function checkUpSwipe() {
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I5", [[0, -2], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [1, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T5", [[-2, 0], [-1, 0], [1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[0, -1], [1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[0, -2], [0, -1], [1, 0], [0, 1]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [-1, 1], [0, 1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, -1], [-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, 1], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, -2], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                    } // end of checkUpSwipe

                    checkUpSwipe();
                } // end of swipe UP
            } // end of if cell is mobile
        })); // end of row end cell iteration

    // reduce moves: if a swipe results in two matches combine them
    // thus we can see the best possible move

    const combined = [];

    for (ind0 = 0; ind0 < moves.length; ind0++) {
        for (ind1 = 0; ind1 < moves.length; ind1++) {
            // extract swaps
            const swap0 = moves[ind0].swap.join("").replace(/,/g, "").match(/\d{2}/g),
                swap1 = moves[ind1].swap.join("").replace(/,/g, "").match(/\d{2}/g);

            // if swaps are the same just from the reverse direction
            if (swap0[0] === swap1[1] && swap0[1] === swap1[0]) {
                // combine the two
                combined.push({
                    "patternName": moves[ind0].patternName + " " + moves[ind1].patternName,
                    "swap": moves[ind0].swap,
                    "coords": moves[ind0].coords.concat(moves[ind1].coords)
                }); // end of push combined
                // delete the two 
                moves.splice(ind1, 1);
                moves.splice(ind0, 1);
            } // end of if swaps are same
        } // end of inner for
    } // end of outer for

    // add combined to the moves and sort it by element length
    moves = moves
        .concat(combined)
        .sort((movA, movB) => movB.coords.length - movA.coords.length);

    // Reorder moves (already sorted descending), to have I3 I3 moves after T4 and before I3
    // Reason: even though I3 I3 moves make more matches, they don't result in getting bonus 
    // characters, rendering them less valuable in the long run.

    // Take out I3 I3 moves
    const i3I3s = moves.filter(mov => mov.patternName === "I3 I3");
    moves = moves.filter(mov => mov.patternName !== "I3 I3");

    // check the first I3 index
    const i3Ind = moves.findIndex(mov => mov.patternName === "I3");

    // push them back to moves
    i3I3s.forEach(i3I3 => { moves.splice(i3Ind, 0, i3I3); });

    return moves;
} // end of possible moves


function giveHint() {
    const hints = possibleMoves();
    if (hints.length > 0) {
        let hint;
        // if besthint is earned or bought give the highest value hint
        if (app.game_best_hint) {
            // if only I3 matches are available, choose the last one
            // it usually matches more when matches are taken from the bottom of the board
            // else find the strongest match
            hint = hints.every(h => h.patternName === "I3") ? hints[hints.length - 1] : hints[0];
        } // end of if besthint is on
        // if besthint is off give one hint randomly
        else {
            hint = hints[Math.floor(Math.random() * hints.length)];
        } // end of if besthint is off

        // determine if swap is horizontal
        const hintOrientation = hint.swap[0][0] === hint.swap[1][0] ? "horizontal" : "vertical";
        let hintPosition = [];
        if (hintOrientation === "horizontal") {
            if (hint.swap[0][1] < hint.swap[1][1]) {
                hintPosition.push("left", "right");
            } else {
                hintPosition.push("right", "left");
            }
        } // end of if horizontal
        else {
            if (hint.swap[0][0] > hint.swap[1][0]) {
                hintPosition.push("upper", "lower");
            } else {
                hintPosition.push("lower", "upper");
            }
        } // end of if vertical
        hint.swap.forEach((coord, coordInd) => {
            let hintMovementClassName = "hint-" + hintOrientation + "-" + hintPosition[coordInd];

            $(`#r${coord[0]}c${coord[1]}-pic`).addClass(hintMovementClassName);

            const hintRemoveDelay = setTimeout(() => {
                $(`#r${coord[0]}c${coord[1]}-pic`).removeClass(hintMovementClassName);
                clearTimeout(hintRemoveDelay);
            }, 1400); // end of remove delay
        }); // end of coords iteration
    } // end of if there is a hint available
} // end of giveHint


// puts a message out when there are no more moves found on the gameboard
function noMoreMovesMessage() {
    const msgDiv = document.createElement("div");

    $(msgDiv)
        .attr("id", "no-more-moves-msg-div")
        .addClass("board__message")
        .html("No More Moves")
        .fadeIn(1000);

    createFreshBoard(msgDiv);
    $(".game-board").append(msgDiv);
} // end of noMoreMovesMessage


// put randomly new fruits on board, but they can not match 
function createFreshBoard(msgDiv) {
    fruits = [...Array(levels[app.currentLevel - 1].fruitVariationNumber).keys()].map(el => ++el);

    app.board.map((row, rowInd) => row.map((cell, cellInd) => {
        let availableFruits = fruits.slice(); // don't copy reference

        // if cell is fruit
        if (availableFruits.some(fr => fr == cell)) {
            // if the above two cells are already matching
            if ((app.board[rowInd - 1] || [])[cellInd] === (app.board[rowInd - 2] || [])[cellInd]) {
                // take them out from the pool of choices
                availableFruits = availableFruits.filter(fr => fr != (app.board[rowInd - 1] || [])[cellInd]);
            }
            // if the two cells on the left are already matching
            if ((app.board[rowInd] || [])[cellInd - 1] === (app.board[rowInd] || [])[cellInd - 2]) {
                // take them out from the pool of choices
                availableFruits = availableFruits.filter(fr => fr != (app.board[rowInd] || [])[cellInd - 1]);
            }
            app.board[rowInd][cellInd] = availableFruits[Math.floor(Math.random() * availableFruits.length)] + "";
        } // end of if cell is fruit

    })); // end of row iteration
    if (possibleMoves().length < 1) createFreshBoard(); // recursive if new fruits has no matches

    if (msgDiv) $(msgDiv).fadeOut(2500);

    displayBoard();

    app.game_interaction_enabled = true; // give interaction back to player
    app.game_hint_is_paused = false; // hint can count time again
} // end of createFreshBoard


function displayTime(time) {
    const clock = $("#counter");

    // convert sec to min : sec
    let mins = Math.floor(time / 60),
        secs = time - mins * 60;

    // add leading 0 if necessary
    secs = secs <= 9 ? "0" + secs : secs;
    clock.html(mins + ":" + secs);

    // switch off time progress leds if time is less than it's range
    const range = levels[app.currentLevel - 1].time / 10;

    let ledsOn = Math.ceil(time / range);

    for (i = 1; i <= 10; i++) {
        $(`#countback-led${i}`).addClass("led-off");
        if (i <= ledsOn) {
            $(`#countback-led${i}`).removeClass("led-off");
        } // if led should be on
    } // end of iterating leds
}


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
            "F..22...F",
            "L..22...L",
            "L.......L",
            "L.......L",
            "L.......L",
            "L.......L",
            "L.......L",
            "LLLLLLLLL",
            "#LLLLLLL#",
            "#LLLLLLL#",
            "###UUU###",
        ],
        "fruitVariationNumber": 6,
        "time": 36,
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
    "currentLevel": 1,
    "flowers": 0,         // the players collected flowers on the actual level
    "game_interaction_enabled": true, // responsible for switching off mouse and touch events, while animating or searching for matches
    "game_is_on": false,
    "game_is_paused": false,
    "game_give_hint_at": 5, // the num of secs a hint is given after no moves
    "game_best_hint": true,
    "game_time_from_last_hint": 0,
    "game_time_left": 0, // we'll set the remaining thime when level starts
    "game_hint_is_paused": false,
    "images": [],         // the preloaded pictures
    "valid_board_characters": ["X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "S", "M", "L", "A", "B", "C", "D", "E", "U", "*"],
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

    // start setup values and counters

    app.game_is_on = true;
    app.game_is_paused = false;
    app.game_time_left = levels[app.currentLevel - 1].time;

    // level timer
    displayTime(app.game_time_left); // prime timer

    const levelTimer = setInterval(() => {
        if (app.game_is_on && !app.game_is_paused) {
            // decrement time if it's greater than 0
            if (app.game_time_left > 0) {
                app.game_time_left--;
                displayTime(app.game_time_left);
            } // end of counting down
            else {
                clearInterval(levelTimer);
                // finish level if time is up
                // future code comes here
            }
        } // end of if game is on and not paused
        if (!app.game_is_on) clearInterval(levelTimer);
    }, 1000);

    // hint timer
    const hintTimer = setInterval(() => {
        if (app.game_is_on && !app.game_is_paused && !app.game_hint_is_paused) {
            if (app.game_time_from_last_hint === app.game_give_hint_at) {
                app.game_time_from_last_hint = 0;
                giveHint();
            } else {
                app.game_time_from_last_hint++;
            }
        } // end of if game is on and not paused and hint counter is enabled
        if (!app.game_is_on) clearInterval(hintTimer);
    }, 1000); // end of hintTimer
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

            // make random flowers when encounters char "F"
            if (app.board[r][c] === "F") {
                app.board[r][c] = "ABCDE"[Math.floor(Math.random() * 5)];
            } // end of if "F" random flower 


            // make random fruits when encounters char "."
            if (app.board[r][c] === ".") {
                let availableFruits = [...Array(levels[app.currentLevel - 1].fruitVariationNumber).keys()].map(el => ++el);

                // if the above two cells are already matching
                if ((app.board[r - 1] || [])[c] === (app.board[r - 2] || [])[c]) {
                    // take them out from the pool of choices
                    availableFruits = availableFruits.filter(fr => fr != (app.board[r - 1] || [])[c]);
                }

                // if the two cells on the left are already matching
                if ((app.board[r] || [])[c - 1] === (app.board[r] || [])[c - 2]) {
                    // take them out from the pool of choices
                    availableFruits = availableFruits.filter(fr => fr != (app.board[r] || [])[c - 1]);
                }

                app.board[r][c] = availableFruits[Math.floor(Math.random() * availableFruits.length)] + "";
            } // end of if random fruit


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