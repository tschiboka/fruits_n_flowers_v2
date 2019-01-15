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

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
} // end of toggleFullScreen

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

            app.game_time_from_last_hint = 0; // cancel hints if user swipes

            // stop animation playing when user interacts with the board
            const hintClasses = ".hint-horizontal-left, .hint-horizontal-right, .hint-vertical-upper, .hint-vertical-lower";
            $(hintClasses).css("-webkit-animation-play-state", "paused");
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

// function returns true if swipe had bonus matches 
function swipeCharacters(swipeArgs) {
    function swapCharacters(r1, c1, r2, c2) {
        const temp = app.board[r1][c1];

        app.board[r1][c1] = app.board[r2][c2];
        app.board[r2][c2] = temp;
        displayBoard(); // show the new board when swap is done

        // special case for charaters with bonus classes (special gems)
        return swapBonusClasses(r1, c1, r2, c2);
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
        if (app.board[r1][c1] === "*" && app.board[r2][c2] === "*") {
            const matches = [];
            app.board.map((row, rowInd) => {
                row.forEach((cell, cellInd) => {
                    // clear cell if fruit
                    if ("123456789".split("").some(fr => fr === cell)) {
                        // add explosion animation to element
                        $(`r${rowInd}c${cellInd}-pic`).addClass("explosion");

                        // fill up matches with all the fruits available on board
                        matches.push(
                            {
                                "patternName": "DD",
                                "sample": app.board[rowInd][cellInd],
                                "coords": [[rowInd, cellInd]]
                            } // end of match obj
                        ); // end of push

                        app.game_matches = matches;
                        app.board[rowInd][cellInd] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                    } // end of if cell is fruit
                }); // end of cell iteration
            }); // end of forEach row

            // distroy diamonds
            app.board[r1][c1] = app.board[r2][c2] = "X";

            animateExplosions(matches);
            return true; // escape out of function
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
                            // add explosion animation to element
                            $(`r${rowInd}c${cellInd}-pic`).addClass("explosion");

                            // fill up the matches with the corrisponding fruit
                            matches.push(
                                {
                                    "patternName": "D",
                                    "sample": app.board[rowInd][cellInd],
                                    "coords": [[rowInd, cellInd]]
                                } // end of match obj
                            ); // end of matches push

                            app.game_matches = matches;
                            app.board[rowInd][cellInd] = "X";
                            $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        } // end of if cell the fruit to be destroyed
                    }); // end of cell iteration
                }); // end of row iteration

                // destroy the diamond, we don't know which one is diamond
                app.board[r1][c1] === "*" ? app.board[r1][c1] = "X" : app.board[r2][c2] = "X";
                animateExplosions(matches);
                return true; // escape out of function
            } // end of if the one being swapped is a fruit
            else return void (0);
        } // end of if one is diamond


        // if BOTH has BONUS, do both elements' explosion
        if (elemHasBonus(elem1) && elemHasBonus(elem2)) {
            swapElementsAndClasses(elem1, elem2);
            // add explosion animation to element
            $(`r${r1}c${c1}-pic`).addClass("explosion");
            $(`r${r2}c${c2}-pic`).addClass("explosion");

            // fill matches with the two elements being swapped
            const matches = [
                {
                    "patternName": "BB",
                    "sample": app.board[r1][c1],
                    "coords": [[r1, c1]]
                }, // end of match obj1
                {
                    "patternName": "BB",
                    "sample": app.board[r2][c2],
                    "coords": [[r2, c2]]
                } // end of match obj2
            ]; // end of matches

            app.game_matches = matches;
            app.board[r1][c1] = app.board[r2][c2] = "X";
            $(`#r${r1}c${c1}-pic`).addClass("explosion");
            $(`#r${r2}c${c2}-pic`).addClass("explosion");
            animateExplosions(matches);
            return true; // escape out of function
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

    const swapHasBonusMatch = swapCharacters(R1, C1, R2, C2); // if swap has bonus match don't swap back
    const matches = checkMatches();

    if (!matches) {
        if (!flowerAndHorizontal() && !swapHasBonusMatch) {
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



function addInventoryEvents() {
    function toggleInventoryRight() {
        const invAt = app.inventoryAt,
            invLen = app.inventory.length - 1;

        // if there is at least 5 more items left to display
        if (invLen - 4 >= invAt + 5) {
            app.inventoryAt += 5;
            displayInventoryItems();
        } // end of if 5 more left
        else if (invAt < invLen - 4) {
            // if less than 5 but there is still left to display
            // display the rest of the items
            app.inventoryAt = invLen - 4;
            displayInventoryItems();
        } // end if any left to display
    } // end of toggleInventoryRight


    function toggleInventoryLeft() {
        const invAt = app.inventoryAt;

        // if there is 5 more items left to display
        if (invAt > 4) {
            app.inventoryAt -= 5;
            displayInventoryItems();
        } // end of if 5 more left
        else if (invAt > 0) {
            // if less than 5 but there is still left to display
            // display the rest of the items
            app.inventoryAt = 0;
            displayInventoryItems();
        } // end if any left to display
    } // end of toggleInventoryLeft


    function swipeStart(e) {
        if (e.target !== this) {
            swipeStartCoord = e.pageX;
        } // end of if target is menuitems
        return e.pageX || e.targetTouches[0].pageX; // case for desktop / mobile
    } // end of swipeStart


    function swipeOn(mouseDown, startX, currX, event) {
        if (mouseDown) {
            event.preventDefault();

            if (startX > currX + 40) {
                toggleInventoryRight();
                return [false, 0]; // reset swipe
            } // end of 40px left

            if (startX < currX - 40) {
                toggleInventoryLeft();
                return [false, 0]; // reset swipe
            } // end of 40px right
        } // end of if mouse is down
        return [mouseDown, startX];
    } // end of swipeOn


    function inventoryItemStart(event, swipeObj = {}) {
        // get the target container
        const target = event.target;
        if ($(target).hasClass("inventory-item-container") || $(target).hasClass("inventory-item")) {
            const itemNum = Number([...target.classList].join("").match(/\d/)[0]),
                item = $(`.inventory-item${itemNum}-container`)[0];

            swipeObj.item = item;
            swipeObj.itemNum = itemNum;
            swipeObj.down = true;
            swipeObj.startX = event.pageX || event.targetTouches[0].pageX;
            swipeObj.startY = event.pageY || event.targetTouches[0].pageY;
            swipeObj.fruit = app.inventory[app.inventoryAt + itemNum - 1];
        } // end of if target is an inventory item
        return swipeObj;
    } // end of inventoryItemOn



    function inventoryItemMove(event, swipeObj) {
        event.preventDefault();
        // short circuit so condition won't give error when not created yet
        if (swipeObj && swipeObj.down) {
            const currX = event.pageX || event.targetTouches[0].pageX,
                currY = event.pageY || event.targetTouches[0].pageY;

            // get the difference of current and start
            const diffX = Math.max(swipeObj.startX, currX) - Math.min(swipeObj.startX, currX),
                diffY = Math.max(swipeObj.startY, currY) - Math.min(swipeObj.startY, currY);

            // if swipe is not horizontal start dragging
            // horizontal swipe reults in swipeing the menu items left n right
            // which is a different event handler
            if (diffY > diffX) {
                // get some css attributes width height top left
                const bodyRect = document.body.getBoundingClientRect(),
                    boardRect = $(".game-board")[0].getBoundingClientRect(),
                    itemRect = $(swipeObj.item)[0].getBoundingClientRect(),
                    top = itemRect.top - bodyRect.top - bodyRect.top,
                    left = itemRect.left - bodyRect.left - boardRect.left,
                    width = itemRect.width,
                    height = itemRect.height;

                // get a clone and set it's 
                const clone = $(swipeObj.item)
                    .clone()
                    .css("top", top + "px")
                    .css("left", left + "px")
                    .css("width", width + "px")
                    .css("height", height + "px")
                    .addClass("inventory-item--clone");

                $("body").append(clone);


                // add eventlistener to body
                $("body").on("mousemove touchmove", function (e) {
                    console.log("CLONE MOVE ", swipeObj.dragClone);
                    $(clone)
                        .css("left", e.pageX - (boardRect.left - width / 2) - bodyRect.left + "px")
                        .css("top", e.pageY - (boardRect.top - height / 2) - bodyRect.top + "px");
                }); // end of event body on

                $("body").on("mouseup touchup", function (e) {
                    console.log("UP BODY", clone);
                    if ((document.querySelector(".inventory-item--clone"))) {
                        // JQuery gets strange errors here so I will rely on vanilla js now
                        document.getElementsByTagName("body")[0]
                            .removeChild(document.querySelector(".inventory-item--clone"));
                    } // end of if there is a clone item in the body
                }); // end of body mouse / touch up
                swipeObj.dragClone = swipeObj.dragClone ? swipeObj.dragClone : clone
                console.log("DRAG", swipeObj.dragClone);
            } // end of if verical swipe
            //console.log(currX, currY, swipeObj.startX, swipeObj.startY, diffX, diffY);
        } // end of if mouse is down
    } // end of inventoryItemMove


    // INVENORY EVENTS


    // click on arrows
    $(".inventory-right").on("click", toggleInventoryRight);
    $(".inventory-left").on("click", toggleInventoryLeft);

    // swipe with mouse on menu items (left - right directions) / mobile device swipe
    let isMouseDown = false, swipeStartCoord = 0;

    $(".inventory-items").on("mousedown touchstart", function (e) { isMouseDown = true; swipeStartCoord = swipeStart(e); });
    $(".inventory-items").on("mouseup touchend", function () { isMouseDown = false; swipeStartCoord = 0; });
    $(".inventory-items").on("mousemove touchmove", function (e) {
        const xCoord = e.pageX || e.targetTouches[0].pageX; // case for desktop / mobile
        [isMouseDown, swipeStartCoord] = swipeOn(isMouseDown, swipeStartCoord, xCoord, e);
    }); // end of mouse / touch move


    // inventory element drag to the board

    // event is not delegated to the inventory-items div, rather have the five elements separate
    // events because inventory-items div has already swipe event added
    let swipeObj = {};
    console.log("HERE ", swipeObj)
    $(".inventory-item").each(function () {
        $(this).on("mousedown touchstart", function (e) { swipeObj = inventoryItemStart(e, swipeObj); console.log("START", swipeObj); });
        $(this).on("mouseup touchend", function () { swipeObj = {}; });
        $(this).on("mousemove touchmove", function (e) { swipeObj = inventoryItemMove(e, swipeObj); })
    }); // end of inventory-item iteration
} // end of addInventoryEvents




/*
 

            GAME BOARD FUNCTIONS


*/



// Check all possible match patterns and return them in an array
// Multiple matches return multiple arrays
function checkMatches() {
    // app is entering a turn
    app.game_turn_is_over = false;

    const matches = [];
    /* Patterns need to be divided by sections
           Example: (O4 match which won't happen)
           1        X               1
           11  =>   X1  instead of  XX
           11       X1              XX
           The reason is that the match I3 is found before the loop gets to
           the higher ranking O4 match 
    */


    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern7(r, c);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern6(r, c);
        } // end of cell iteration
    } // end of row iteration 

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern5(r, c);
        } // end of cell iteration
    } // end of row iteration

    // matches with explosion eg I4 has priority over O4 (wins time)
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("I4H", [r, c], [0, 0], [0, 1], [0, 2], [0, 3]);
            match("I4V", [r, c], [0, 0], [1, 0], [2, 0], [3, 0]);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("O4", [r, c], [0, 0], [0, 1], [1, 0], [1, 1]);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("I3", [r, c], [0, 0], [0, 1], [0, 2]);
            match("I3", [r, c], [0, 0], [1, 0], [2, 0]);
        } // end of cell iteration
    } // end of row iteration


    function checkPattern7(r, c) {
        match("T7", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 2]);
        match("T7", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 0], [2, 1]);
        match("T7", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [0, 2], [1, 2]);
        match("T7", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [2, 2]);
    } // end of pattern 7   

    function checkPattern6(r, c) {
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 2], [2, 2]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [2, 0], [2, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 1], [1, 1]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [2, 1], [2, 2]);
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [2, 1]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [1, 0], [1, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 2], [1, 2]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [1, 2]);
    } // end of pattern 6

    function checkPattern5(r, c) {
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
    } // end of pattern 5



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

    // app.matches might have already matches by bonus gems at this point of execution
    // NOTE: app.game_matches and matches (in this lexical scope) therefore
    // are not necessarily identical
    if (matches.length) {
        // app matches might have bonus matches at this point
        // add them the regular fruit matches
        app.game_matches = app.game_matches.concat(matches);
    }

    // get points for the matches
    app.game_matches.forEach(match => {
        const points = {
            "I3": 3, "O4": 5, "I4": 5,
            "T5": 10, "L5": 10, "I5": 10,
            "T6": 25, "T7": 100,
            "BB": 10, "D": 20, "DD": 25,
            "A": 100, "B": 100, "C": 100, "D": 100, "E": 100
        }; // end of patternName to points object declaration

        app.game_partial_points += points[match.patternName[0] + (match.patternName[1] || "")]; // the firts 2 letter of the patternName is enough to determine it's value
    }); // end of matches for adding points

    // multiple match double the points
    if (matches.length > 1) app.game_partial_points *= 2;

    if (!matches.length) app.game_turn_is_over = true;
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



    // Function applies gravity on column recieved as its parameter.
    function gravitiseColumn(col, colNum) {
        // temporaly name gems with bonuses like "1B0"
        // where 1 means the fruit and B0 is the bonus type
        // so we can make sure the bonus is moving with the gravity

        const columnBonuses = [];

        col = col.map((gem, ind) => {
            const id = `#r${10 - ind}c${colNum}-pic`;
            if ($(id).hasClass("bonus")) {
                // save the bonus, and delete it
                const clone = $(id).children();
                $(id).removeClass("bonus").empty();
                gem += `B${columnBonuses.length}`; // extend name
                columnBonuses.push(clone); // save bonus here!
            } // end of if gem has bonus
            return gem;
        }); // end of map col

        // take off fixed positioned elements from column
        const fixedPosGem = ["S", "M", "L", "#", "U"],
            isFixedPosGem = (gem) => fixedPosGem.find(el => el === gem);

        let newCol = col.filter(gem => isFixedPosGem(gem) ? "" : gem);

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

        // place bonuses back
        newCol = newCol.map((gem, ind) => {
            if (gem.length > 1) {
                const bonusNum = gem.replace(/.B/g, "");
                $(`#r${10 - ind}c${colNum}-pic`)
                    .addClass("bonus")
                    .append(columnBonuses[bonusNum]);
            } // end of if bonus
            return gem[0]; // make sure only the first character is leaving the function
        }); // end of col map
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

                    column = gravitiseColumn(column, colNum);
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

        // check if there is enough flowers on the board
        const currentFlowers = [
            ...(app.board.join("")
                .replace(/,/g, ""))]
            .filter(el => /[ABCDE]/g.test(el))
            .length;

        // add a flower to the top if flowers are less than the minimal
        if (currentFlowers < levels[app.currentLevel - 1].minimumFlowersOnBoard) {
            // find empty the top most row id
            const topmostRow = idsToFill[idsToFill.length - 1][0][0],
                // get the cells on the topmost row that were gaps
                cellIds = idsToFill
                    .filter(id => id[0][0] === topmostRow)
                    .map(id => id[1][0]),
                // choose one randomly
                randomColumnInd = cellIds[Math.floor(Math.random() * cellIds.length)];

            // set the chosen cell as a random flower (F will become a valid flower(ABCDE) in displayBoard func)
            app.board[topmostRow][randomColumnInd] = "F";
        } // end of currentflowers are less then minimal

        displayBoard();
    } // end of fillEmptyCell

    displayLevelPoints();

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
            // app is exiting a turn
            app.game_turn_is_over = true;
            if (!app.game_interaction_locked) {
                app.game_interaction_enabled = true; // give interaction back to player
                app.game_hint_is_paused = false; // hint can count time again
            } // end of if onteraction is not locked because of the end-game
        } // end of if there are possible matches
    } // end of if there are no further matches
    checkFlowersOverBasket();
} // end of cicleMatches


function displayLevelPoints() {
    // display partial points
    // find the centre of the matches
    const X = [], Y = [];

    // get the x and y coordinates
    app.game_matches.forEach(match => {
        match.coords.forEach(xy => {
            const rect = $(`#r${xy[0]}c${xy[1]}-box`)[0].getBoundingClientRect();

            X.push(rect.x);
            Y.push(rect.y);
        }); // end of match foreach
    }); // end of matches forEach

    // get the average xy
    avgCoords = {
        "x": Math.round(X.reduce((a, b) => a + b, 0) / X.length),
        "y": Math.round(Y.reduce((a, b) => a + b, 0) / Y.length),
    }; // end of avgCoords

    // greate a points on a turn element
    const pointsOnTurn = document.createElement("div");

    $(pointsOnTurn)
        .attr("id", "points-on-turn")
        .html(app.game_partial_points + "$");

    $(".game-board")[0].append(pointsOnTurn);

    pointsOnTurn.style.top = avgCoords.y - $(".game-board")[0].getBoundingClientRect().y + "px";
    pointsOnTurn.style.left = avgCoords.x - $(".game-board")[0].getBoundingClientRect().x + "px";

    // take element off the DOM with delay
    const pointsDelay = setTimeout(() => {
        $(".game-board")[0].removeChild(pointsOnTurn);
        clearTimeout(pointsDelay);
    }, 750);


    // display level points
    // points goes up with some animation eg 1350 1352 1357 1359 1363

    if (app.game_partial_points < 6) {
        let counter = app.game_partial_points;
        const increasePointsDelay = setInterval(() => {
            counter--;
            let point = $(".game-board__level-points")
                .html()
                .match(/\d+/g)[0]; // extract points

            $(".game-board__level-points").html(
                $(".game-board__level-points")
                    .html()
                    .replace((/\[\d+/g), "[" + ++point)
            );

            if (counter < 1) clearTimeout(increasePointsDelay);
        }, 100); // end of delay
    } // end of if points less than 6
    else {
        let counter = 0,
            point = $(".game-board__level-points")
                .html()
                .match(/\d+/g)[0]; // extract points

        const points = [...Array(app.game_partial_points).keys()]
            .map(p => Number(p) + Number(point));
        let randomPoints = [];

        // choose 4 values randomly
        for (let i = 0; i < 4; i++) {
            const ran = Math.floor(Math.random() * points.length);

            randomPoints.push(points[ran]);
            points.splice(ran, 1)
        } // end of for 5

        // the last value is the sum of partial and level points
        randomPoints.push(Number(point) + app.game_partial_points);
        randomPoints = randomPoints.sort((a, b) => a > b);

        const increasePointsDelay = setInterval(() => {
            $(".game-board__level-points").html(
                $(".game-board__level-points")
                    .html()
                    .replace((/\[\d+/g), "[" + randomPoints[counter])
            );

            if (counter === 4) clearTimeout(increasePointsDelay);
            counter++;
        }, 100); // end of delay
    } // end of if point is more than five

    // clear points
    app.game_level_points += app.game_partial_points;
    app.game_partial_points = 0;
    app.game_matches = [];
} // end of displayLevelPoints


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
                // update flowers
                app.flowers++;
                app.game_partial_points += 100;

                // update mathes so points on the turn can be displayed
                // on the right coords if only a flower has gone down
                // NOTE: in case the turn has only the flower disappearing
                // it will show the points in the top left corner because
                // coordinates are calculated from the matches object
                const flower = app.board[basket[0] - 1][basket[1]];
                app.game_matches.push({
                    "patternName": flower,
                    "sample": "none",
                    "coords": [[basket[0] - 1, basket[1]]]
                }); // end of push matches

                // display how many flowers has been left to complete level requirement
                let flowersLeftToCompleteLevelReq = levels[app.currentLevel - 1].flowersToCompleteTheLevel - app.flowers;
                $("#flower-counter")
                    .html(flowersLeftToCompleteLevelReq > 0 ? flowersLeftToCompleteLevelReq : 0);

                // remove flower
                app.board[basket[0] - 1][basket[1]] = "X";

                // add animation, remove spin anim
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

            $(fiveSec)
                .attr("id", "five-sec")
                .html("+5 sec");

            // add it to the board
            $(".game-board")[0].append(fiveSec);

            // detect match coordinates
            let coordsMatch = $(`#r${match.coords[0][0]}c${match.coords[0][1]}-box`)[0]
                .getBoundingClientRect();

            // detect game-board coordinates
            let coordsBoard = $(".game-board")[0].getBoundingClientRect();

            // set the style according the calculated attributes
            fiveSec.style.left = (coordsMatch.x - coordsBoard.x) + "px";
            fiveSec.style.top = (coordsMatch.y - coordsBoard.y + coordsMatch.height / 2) + "px";
            fiveSec.style.width = coordsMatch.width * 2 + "px";
            fiveSec.style.height = coordsMatch.height + "px";
            fiveSec.style.fontSize = coordsMatch.height / 2 + "px";
            fiveSec.style.lineHeight = coordsMatch.height + "px";

            // remove element with delay
            const fivesecDelay = setTimeout(() => {
                $(".game-board")[0].removeChild(fiveSec);
                clearTimeout(fivesecDelay);
            }, 550);
        } // end of if O4

        // T7 creates a diamond
        if (match.patternName === "T7") {
            app.board[specialCoord[0]][specialCoord[1]] = "*";
        } // end of if T7
    }); // end of match iteration
} // end of getSpecialGems




// function creates the special divs for bonus gems
// parameters: the gems coordinates, if null add spacial to divs to elementSelector 
//             the name of the pattern
//             the elementSelector is used if coords are null
function createspecialGemDiv(coord, name, elementSelector) {
    // function append a div with className to specialDiv
    function addDivToBonusDiv(className) {
        const div = document.createElement("div");

        $(div).addClass(className);
        $(specialDiv).append(div);
    } // end of addDiv


    const specialDiv = document.createElement("div");

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
        } // end of case I5
        case "I5X": { // in case I5X is given (only in inventory otherwise randomly given I5X / I5CR)
            addDivToBonusDiv("bonus-diagonal1-line");
            addDivToBonusDiv("bonus-diagonal2-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I5X`);
            break;
        } // end of case I5X
        case "I5CR": { // in case I5CR is given (only in inventory otherwise randomly given I5X / I5CR)
            addDivToBonusDiv("bonus-vertical-line");
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I5CR`);
            break;
        } // end of case I5X
        case "T6": {
            addDivToBonusDiv("bonus-diagonal1-line");
            addDivToBonusDiv("bonus-diagonal2-line");
            addDivToBonusDiv("bonus-vertical-line");
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-T6`);
            break;
        } // end of case T6
    } // end of switch patternNames

    if (coord) {
        $(`#r${coord[0]}c${coord[1]}-pic`).append(specialDiv);
    } // end of if coord parameter is true
    else {

        // otherwise add divs to elementId
        $(elementSelector).append(specialDiv);
    } // end of if coord is falsy
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
            app.game_partial_points++;
        } // end of if char is fruit

        $(`#r${r}c${c}-pic`).addClass("explosion");
        // take care of stones
        switch (app.board[r][c]) {
            case "L": {
                app.board[r][c] = "M";
                app.game_partial_points++;
                break;
            } // end of case large
            case "M": {
                app.board[r][c] = "S";
                app.game_partial_points++;
                break;
            } // end of case large
            case "S": {
                app.board[r][c] = "X";
                app.game_partial_points++;
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
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
                        break;
                    } // end of case large stone
                    case "M": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "S";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
                        break;
                    } // end of case large stone
                    case "S": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
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


function closeLevel() {
    app.game_interaction_enabled = false; // user can not interact the board after this point
    app.game_interaction_locked = true; // don't let further functions set interaction back as a side effect

    // an end game is coming where all bonus gems are destoyed
    // display time is up label
    const timeIsUp = document.createElement("div");

    $(timeIsUp)
        .html("TIME IS UP!")
        .attr("id", "time-is-up");

    $(".game-board").append(timeIsUp);

    // destroy bonus gems from bottom to top
    // search for the last bonus gem

    function endGameTurn() {
        const bonuses = [...$(".bonus")].reverse();

        if (bonuses.length) {
            const lastBonusXY = bonuses[0].id.match(/\d+/g);

            app.board[lastBonusXY[0]][lastBonusXY[1]] = "X";
            checkBonuses();
            fillBoardWithNewFruits();
        } // end of if there are still bonuses left

        return bonuses.length
    } // end of endGameTurn

    let bonusesLeft;
    const turnDelay = setInterval(() => {

        // if no more bonus left get out of Interval
        if (bonusesLeft === 0) {
            // remove game table and display levelboard again
            $(timeIsUp).remove();
            $(".game-board")[0].removeChild($(".game-board__table")[0]);
            $(".game-board").hide();
            $("header")
                .removeClass("header--hidden header-out")
                .addClass("header--visible header-in");
            $(".level-menu").show();
            showLevelStats();
            clearInterval(turnDelay);
        } // end of no more bonuses left

        // when turn is over destroy next gem
        if (app.game_turn_is_over) bonusesLeft = endGameTurn();

    }, 1000); // end of setInterval

    // set up variables
    // setup values and counters
    app.game_is_on = false;
    app.game_is_paused = false;
} // end of closeLevel



function showLevelStats() {
    // Display new Total points
    $(".end-of-level-stat").show();
    const totEl = $("#level-stat__total-points"),
        lvlEl = $("#level-stat__level-points");

    // ok button not visible yet
    $("#level-stat__ok-btn").hide();

    let tot = app.game_total_points,
        lvl = app.game_level_points;

    totEl.html(tot);
    lvlEl.html(lvl);

    // animate tot points going up while level points down (2sec = 20 display)
    let counter = 30,
        pointsDiff; // declared below

    // try to distribute points as equally as possible
    if (lvl <= 20) {
        pointsDiff = Array(lvl).fill(1);
        counter = lvl;
    } else {
        pointsDiff = Array(20).fill(Math.floor(lvl / 19));
        remainder = lvl - pointsDiff[0] * 19;
        pointsDiff.push(remainder);
    } // end of if level point is greater than 20

    // counter starts 30 because 1 sec is a delay
    const animPointsDelay = setInterval(() => {
        if (counter > 20) {
            counter--; // just wait
        }
        if (counter > 0 && counter <= 20) {
            tot += pointsDiff[counter];
            lvl -= pointsDiff[counter];
            totEl.html(tot);
            lvlEl.html(lvl);
            counter--;
        } // while there are still points to increment / decrement
        if (counter <= 0) {
            clearInterval(animPointsDelay);
            $("#level-stat__ok-btn")
                .show()
                .on("click", () => { $(".end-of-level-stat").hide(); });

            app.game_total_points += app.game_level_points;
            app.game_level_points = 0;

            // reset level-points
            const lvlPts = $(".game-board__level-points")
                .html()
                .replace(/\d+/, "0");

            $(".game-board__level-points").html(lvlPts);

            // update total points
            const totPts = $(".game-board__total-points")
                .html()
                .replace(/\d+/, tot); // the new total earned after a level completition
            $(".game-board__total-points").html(totPts);
        } // escape anim
    }, 100); // end of animPointsDelay
} // end of showLevelStats

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
            "F.......F",
            "LF.**..FL",
            "L.......L",
            "L..12...L",
            "L.......L",
            "L..12.FFL",
            "L.F12...L",
            "LLLALLLLL",
            "#LLLLLLL#",
            "#111LLLL#",
            "###UUU###",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 7, // this will help to generate new flowers when board starts to run out
        "flowersToCompleteTheLevel": 7,
        "time": 180,
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
    "board": [],                 // the current game gems position
    "currentLevel": 1,
    "flowers": 0,                // the players collected flowers on the actual level
    "game_best_hint": true,
    "game_interaction_enabled": true, // responsible for switching off mouse and touch events, while animating or searching for matches
    "game_interaction_locked": false, // keeps interaction locked while end-game is on
    "game_give_hint_at": 5,      // the num of secs a hint is given after no moves
    "game_hint_is_paused": false,
    "game_total_points": 0,      // points earned throughout the game
    "game_level_points": 0,      // points on the actual level
    "game_matches": [],          // some functions have no scope on matches so they reach the apps matches
    "game_is_on": false,
    "game_is_paused": false,
    "game_partial_points": 0,    // collects all points a turn makes, so it can be displayed together
    "game_points": 0,            // total points
    "game_time_from_last_hint": 0,
    "game_time_left": 0,         // we'll set the remaining time when level starts
    "game_turn_is_over": true,   // game is in the middle of a match turn
    "images": [],                // the preloaded pictures
    "inventory": ["1-I4H", "*", "2-I4V", "3-T5", "*", "4-L51", "5-L52", "6-I5CR", "*", "7-I5X", "8-T6", "9-I4H", "1-I4V", "*", "2-T5", "3-L51", "4-L52"],         // all the bonus items you buy in the game
    "inventoryAt": 0,            // the item the inventory start to display from if there were more than 5 (5 places are available)
    "valid_board_characters": ["X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "S", "M", "L", "A", "B", "C", "D", "E", "U", "*"],
}; // end of app global object



// demo just to trigger game board
function startLevel(level) {
    toggleFullScreen();
    // arrange new layout
    $(".level-menu").hide();
    $("header")
        .removeClass("header--visible header-in")
        .addClass("header--hidden header-out");
    $(".game-board").show();

    // create game environment
    createGameBoard();
    createBoardArray(level - 1);
    displayBoard();
    addGameBoardEvents();
    addInventoryEvents();

    // setup values and counters
    app.game_is_on = true;
    app.game_is_paused = false;
    app.game_time_left = levels[app.currentLevel - 1].time;
    app.game_level_points = 0;
    app.game_interaction_locked = false;
    app.game_interaction_enabled = true;
    app.flowers = 0;

    // reset flower counter
    $("#flower-counter").html(levels[app.currentLevel - 1].flowersToCompleteTheLevel);

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
                // wait until interaction is enabled, aka all animations and match cicles are done
                const waitTilLevelIsDone = setInterval(() => {
                    if (app.game_interaction_enabled) {
                        clearInterval(waitTilLevelIsDone);
                        closeLevel();
                    } // end of if interaction to the board is enabled
                }, 100); // end of wait for match cycles and animations
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
                const hintClasses = ".hint-horizontal-left, .hint-horizontal-right, .hint-vertical-upper, .hint-vertical-lower";
                $(hintClasses).css("-webkit-animation-play-state", "running");
            } else {
                app.game_time_from_last_hint++;
            }
        } // end of if game is on and not paused and hint counter is enabled
        if (!app.game_is_on) clearInterval(hintTimer);
    }, 1000); // end of hintTimer

    // fill up inventory
    app.inventoryAt = 0;
    displayInventoryItems();
} // end of startLevel


// function reads app.inventory and fill inventory menu up accordingly
function displayInventoryItems() {
    const items = app.inventory, // all the items from the inventory
        inventoryAt = app.inventoryAt; // 

    console.log(app.images);
    // check if the inventory elements are correctly represented and haven't been compromised by any side effect
    if (!Array.isArray(items)) {
        throw Error("Inventory is invalid! It supposed to be an array.");
    } // end of if inventory is not an array
    else {
        items.forEach(i => {
            // check every inventory item if they are the right format
            // eg 1-I5CR where 1 is the fruit type and the rest is the bonus type
            //     - fruits can be 1 - 9
            //     - bounuses: I4H, I4V, T5, L51, L52, I5CR, I5X, T6, *

            if (i !== "*") {
                const [fruit, bonus] = i.match(/[^-]+/g); // divide item to fruit and bonus

                if (!fruit.match(/\b[1-9]\b/g)) {
                    throw Error("Inventory fruit is incorrect! ", fruit);
                } // end of if fruit is not a number 1 - 9 and its a single digit

                const validBonuses = ["I4H", "I4V", "T5", "L51", "L52", "I5CR", "I5X", "T6"];
                if (!validBonuses.find(valBonus => valBonus === bonus)) {
                    throw Error("Bonus is incorrect!", bonus);
                } // end of if bonus is not valid
            } // end of item is not a diamond (it has no fruit number)
        }); // end of item iteration
    } // end of if inventory is an array

    // add fruits and diamond imgs
    const img = {
        "1": app.images.apple,
        "2": app.images.orange,
        "3": app.images.peach,
        "4": app.images.strawberry,
        "5": app.images.plum,
        "6": app.images.lime,
        "7": app.images.lemon,
        "8": app.images.blood_orange,
        "9": app.images.kiwi,
        "*": app.images.diamond,
    } // end of img object declaration

    for (let i = 0; i < 5; i++) {
        // represent fruit only if there is a corrisponding inventory element to it
        if (!items[i] || i + inventoryAt > items.length - 1) break;

        const className = `.inventory-item${i + 1}-container `,
            elem = $(className),
            [fruit, bonus] = items[i + inventoryAt].match(/[^-]+/g);

        // add fruit / diamond background
        elem.css("background-image", "url('" + img[fruit].src + "')");

        // get rid of previous bonus divs
        $(className).empty();

        // add bonus divs
        if (bonus) {
            createspecialGemDiv(null, bonus, className);
        } // end of if theres bonus
    } // end of for 5

    // check arrows if they are light theres still option to toggle
    // left
    if (app.inventoryAt > 0) {
        $(".game-board__inventory__menu__arrow--left").addClass("active");
    } else {
        $(".game-board__inventory__menu__arrow--left").removeClass("active");
    } // end of if inventory is at 0

    // right
    if (app.inventoryAt < app.inventory.length - 5) {
        $(".game-board__inventory__menu__arrow--right").addClass("active");
    } else {
        $(".game-board__inventory__menu__arrow--right").removeClass("active");
    } // end of if inventory is at the end 

    // create indicator lights
    $(".game-board__inventory__menu__indicator").empty(); // get rid of the old ones

    const indicAmount = Math.ceil(app.inventory.length / 5);

    for (i = 0; i < indicAmount; i++) {
        const indic = document.createElement("div");

        $(indic).css("width", ((100 / indicAmount) - 2) + "%");

        $(".game-board__inventory__menu__indicator").append(indic);

    } // end of for indicAmount

    // light the active indicator
    // take off active class from all indicators
    $(".game-board__inventory__menu__indicator")
        .children()
        .removeClass("active");

    // give active to the current one
    $(`.game-board__inventory__menu__indicator div:nth-child(${Math.ceil(app.inventoryAt / 5) + 1})`)
        .addClass("active");

    console.log("ACT:", Math.ceil(app.inventoryAt / 5) + 1, "AT", app.inventoryAt, app.inventory.length);
} // end of displayInventoryItems


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