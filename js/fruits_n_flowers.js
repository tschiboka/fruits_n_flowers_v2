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

    // prepare game board
    addGameBoardEvents();
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
        "fruits/blood_orange"
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
        alert("One or more picture couldn't be loaded from server!");
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
        }

        $(indicator).append(light);
        $(".level-menu__header__level-indicator").append(indicator);
    }
}

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

} // end of addGameBoardEvents




/*

        LEVELS

*/

/* 
 * Each level object consist :
 *     - blueprint: array of 11 strings with 9 chars
 *         - "0": cell is transparent
 *         - "1" - "9" : cell is different fruits
 *         - "A" - "G" : cell is one of the flowers
 *         - "W" : cell is wall (unbreakable)
 *         - "R" : cell is rock (breakable)
 *         - "O" : cell is basket
 *         - "a" - "z" :lower case letters are kept for special characters like explosions and tome stopppers
 */

var levels = [
    // level 1
    {
        "blueprint": [
            "1,2,5,4,8,9,7,8,1",
            "2,2,6,6,3,2,7,2,9",
            "1,3,4,4,3,6,8,8,2",
            "9,4,4,3,2,6,1,6,3",
            "8,9,5,1,2,6,1,2,5",
            "6,9,1,1,5,5,4,8,9",
            "6,9,1,8,9,8,6,8,6",
            "4,6,9,9,1,2,9,3,7",
            "8,7,8,5,3,5,5,5,8",
            "9,8,7,7,2,6,7,9,2",
            "2,7,7,1,7,6,7,1,3",
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
    "images": [],         // the preloaded pictures
}; // end of app global object



// demo just to trigger game board
function startLevel(level) {
    // arrange new layout
    $(".level-menu").hide();
    $("header").addClass("header-out");
    $(".game-board").show();

    // create game environment
    createGameBoard();
    createBoardArray(level - 1);
    displayBoard(level - 1);
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
    app.board = levels[level]["blueprint"].map(row => row.split(","));
} // end of loadBoardArray



function displayBoard(level) {
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
    };


    // add the corrisponding icons to the board table
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            const idName = `#r${r}c${c}-pic`;

            $(idName).css("background-image", `url(${imgMap[app.board[r][c]].src}`);
            console.log(imgMap[app.board[r][c]].src);

            console.log($(idName).css("background-image"));
        } // end of cell iteration
    } // end of row iteration
} // end of displayBoard