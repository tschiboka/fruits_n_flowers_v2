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
                    return "NOMOVE";
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
    $(".game-board__table").on("mousedown", function (event) {
        event.preventDefault();
        swapIds[0] = extractRowCol(event.target);
    }); // end of game board mousedown

    $(".game-board__table").on("mouseout", function (event) {
        if (swapIds[0]) {
            event.preventDefault();
            swapIds[1] = extractRowCol(event.target);
        } // end of if mousedown has already happened
    }); // end of game board mouseout

    $(".game-board__table").on("mouseup", function (event) {
        event.preventDefault();

        select(swapIds[0], checkSwipeDirection(swapIds));
        // reset ids
        swapIds = [null, null];
    }); // end of game board mouseup
} // end of addGameBoardEvents



function select(startId, dir) {
    if (["LEFT", "RIGHT", "UP", "DOWN"].find(dirs => dirs === dir)) {
        // check board if the move is possible because of walls and stones
        const originVal = []
        console.log(startId, dir);
    } // end of if direction is valid
} // end of select


/*

        LEVELS

*/

/* 
 * Each level object consist :
 *     - blueprint: array of 11 strings with 9 chars
 *         - "1" - "9" : cell is different fruits
 *         - "*"       : any random fruits
 *         - "A" - "E" : cell is one of the flowers
 *         - "F"       : any random flower
 *         - "S, M, L" : cell is stone small medium large (breakable)
 *         - "#"       : cell is wall (unbreakable)
 *         - "U"       : cell is basket
 *         - "*"       : diamonds 
 *         - "a" - "z" :lower case letters are kept for special characters like explosions and time stopers
 */

var levels = [
    // level 1
    {
        "blueprint": [
            "#########",
            "16632729#",
            "#4436882#",
            "#3426*63#",
            "#5921125#",
            "#1155489#",
            "#18ABCDE#",
            "#9912937#",
            "#SL35581#",
            "#UM26792#",
            "#########",
        ]
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
    "valid_board_characters": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "S", "M", "L", "A", "B", "C", "D", "E", "U", "*"],
    "images": [],         // the preloaded pictures
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

            $(idName).css("background-image", `url(${imgMap[app.board[r][c]].src}`);
        } // end of cell iteration
    } // end of row iteration
} // end of displayBoard