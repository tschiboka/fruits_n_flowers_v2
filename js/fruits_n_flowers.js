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
    } // end of swipeCharacters


    const [R1, C1, R2, C2, dir] = [...swipeArgs];  // destruct args

    // check if origin ar destination is a flower and swipe them if they are
    const flowerChars = ["A", "B", "C", "D", "E"];
    if (flowerChars.find(fl => fl === app.board[R1][C1] || fl === app.board[R2][C2])) {
        // swap if direction is horizontal
        if (dir === "UP" || dir === "DOWN") return void (0); // dont check matches if flowers are attempted to move vertically
    } // end of if any char is flower


    swapCharacters(R1, C1, R2, C2);
    const matches = checkMatches();
    console.log(JSON.stringify(matches));
    if (!matches) {
        // if none of the characters are flower don't delay and swipe back
        if (!flowerChars.find(fl => fl === app.board[R1][C1]) && !flowerChars.find(fl => fl === app.board[R2][C2])) {
            app.game_interaction_enabled = false;

            // delay to see the unmatching swipe
            const swapDelay = () => setTimeout(() => {
                swapCharacters(R1, C1, R2, C2);
                console.log("SWAP Delay Up");
                clearTimeout(swapDelay);
                app.game_interaction_enabled = true; // set interaction back
            }, 300); // end of swapDelay 

            // delay and stop user interaction while showing unmatched swap
            swapDelay();
        } // end of none is flower
    } // end of if no matches found
    else {
        animateExplosions(matches);
    } // end of if matches found
    displayBoard();
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
        match("L5", [r, c], [0, 0], [0, 1], [0, 2], [1, 0], [2, 0]);
        match("L5", [r, c], [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]);
        match("L5", [r, c], [0, 0], [1, 0], [2, 0], [2, 1], [2, 2]);
        match("L5", [r, c], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2]);
        match("T5", [r, c], [0, 0], [0, 1], [0, 2], [1, 1], [2, 1]);
        match("T5", [r, c], [1, 0], [1, 1], [1, 2], [0, 2], [2, 2]);
        match("T5", [r, c], [2, 0], [2, 1], [2, 2], [0, 1], [1, 1]);
        match("T5", [r, c], [0, 0], [1, 0], [2, 0], [1, 1], [1, 2]);
        match("I4", [r, c], [0, 0], [0, 1], [0, 2], [0, 3]);
        match("I4", [r, c], [0, 0], [1, 0], [2, 0], [3, 0]);
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
            ids.forEach(id => app.board[id[0]][id[1]] = "X");
        } // end of its matching 
    } // end of general match function
    return matches.length ? matches : false; // return false if no matches 
} // end of checkMatches



function animateExplosions(matches) {
    // disable interaction with the gameboard while animation is going 
    // and new characters are on the table
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

    // remove elements with 0.45s delay
    const removeShardsDelay = setTimeout(() => {
        $(".shard").remove();

        // when animation is done start to fill the board up again
        gravity();
        clearTimeout(removeShardsDelay);
    }, 450);
} // end of animateExplosions


function gravity() {
    // all columns need to have a check if it has ta fall at least once
    const columnNoMoreMove = Array(9).fill("false");


    let testCol = ["1", "2", "3", "X", "5", "X", "X", "S", "#", "X", "X"];
    // the argument is the column number, func returns if no falling needed

    checkColumnGravity(testCol);

    function checkColumnGravity(col) {
        // check if column has any X (gaps)
        if (!col.some(e => e === "X")) return true;

        // check if the first gap has any mobile element above (any fruit or flower, rest are immobile) 
        const firstGap = col.indexOf("X"),
            restOfCol = col.slice(firstGap + 1, col.length - 1);


        return !(/[A-E1-9]/g.test(restOfCol.join("")));
    } // end of checkColumnGravity

    console.log(checkColumnGravity(testCol));

    /*    // turn board 90 degree on side bottom to left top to right
        // to see the gaps vertically
    
        let slices = turnArr90deg(app.board);
    
        function turnArr90deg(arr) {
            const slices90deg = [];
            for (sl = 0; sl < arr[0].length; sl++) {
                const slice = [];
                for (row = arr.length - 1; row >= 0; row--) {
                    slice.push(arr[row][sl]);
                } // end of reverse iteration of cols
                slices90deg.push(slice);
            } // end of row iteration
            return slices90deg;
        } // end of turnArr90deg
    
    
    
        // turn back arr to original for displaying
        function backArr90deg(arr) {
            return turnArr90deg(arr.reverse());
    
        } // end of backArr90deg
    
        console.log("test board turn");
        backArr90deg(turnArr90deg(app.board)).map(e => { console.log(JSON.stringify(e)); });
    
        // fall returns the modified slice and if there no gap left
        function fallSlice(sl) {
            // find first index of a gap and return if none found
            const firstGapAt = sl.indexOf("X");
    
            if (firstGapAt === -1) return [sl, true];
    
            // take it out of the array
            sl.splice(firstGapAt, 1);
            sl.push("X");
    
            // check if all Xs are at the top: 1. take the Xs from the end 2. check if any has left
            slCut = sl.join("").replace(/X+$/g, "").split("");
    
            // check if there is any X remained
            return slCut.indexOf("X") === -1 ? [sl, true] : [sl, false];
        } // end of fall
    
    
        // go through the slices
        function fallRow() {
            const newSlices = [], noMoreFall = [];
            // iterate slices
            slices.forEach(slice => {
                const res = fallSlice(slice);
                newSlices.push(res[0]);
                noMoreFall.push(res[1]);
            }); // end of slice forEach
    
            slices = newSlices;
            return noMoreFall;
        } // end of fallRow 
    
        fallRow(slices); */
} // end of gravity


function FillBoardWithNewFruits() {
    const idsToFill = [];

    for (r = 10; r >= 0; r--) {
        console.log("ROW", r);
        for (c = 0; c < 8; c++) {
            console.log("CELL", app.board[r][c]);
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
            // give interaction back only when all characters are present on the table
            app.game_interaction_enabled = true;

            console.log(app.board);
            clearInterval(drippingDelay);
        } else {
            fillEmptyCell(nextId);
            nextId++;
        } // end of if there are still more ids to fill
    }, 500); // end of drippingDelay
} // end of drippingNewFruits




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
            "#########",
            "#6684729#",
            "#2954382#",
            "#298347*#",
            "#5914125#",
            "#2315489#",
            "#181BCDE#",
            "#2949937#",
            "#SL89591#",
            "#UM86887#",
            "#########",
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

            // set wall sizes bigger
            if (app.board[r][c] === "#") {
                $(idName).addClass("wall-size");
            } // end of if it's a wall 
            else {
                $(idName).removeClass("wall-size");
            } // end of if not a wall


            // spin flowers and diamonds
            if (["A", "B", "C", "D", "E", "*"].find(cell => cell === app.board[r][c])) {
                $(idName).addClass("spin-pic");
            } // end of if cell is spinning
            else {
                $(idName).removeClass("spin-pic");
            }

            if (app.board[r][c] === "X") {
                $(idName).css("background-image", "none");
            } else {
                $(idName).css("background-image", `url(${imgMap[app.board[r][c]].src}`);
            } // end of if board value is not "0"
        } // end of cell iteration
    } // end of row iteration
} // end of displayBoard