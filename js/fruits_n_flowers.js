$(document).ready(
    // delay start while logo animation is running
    () => { setTimeout(() => { start(); }, 3000); }
);

function start() {
    $(".logo").hide();
    $("header, .level-menu").show();

    createLevelTables();
    createLevelPageIndicator();
    addLevelEvents();
} // end of start



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

        $(indicator).addClass("level-indicator");
        $(light).addClass("level-light");

        if (i == 0) {
            $(indicator).addClass("level-indicator--active");
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

                box.id = `level-btn-${levelNum}`;
                box.innerHTML = `${levelNum}`;

                progressBar.id = `level-progress-${levelNum}`;
                $(progressBar).addClass("level-progressbar");
                box.append(progressBar);

                cell.id = `level-cell-${levelNum}`;

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
} // end of addLevelEvents

function turnLevelPage(turnTo) {
    // turnTo parameter can be number or + or -
    // number turn page to the page number
    // + - increments or decrements it if possible

    const activePage = $(".active-page")[0],
        pageNum = activePage.id.match(/\d+/)[0];

    if (turnTo === "+") {
        displayPage(Number(pageNum) + 1);
    } else if (turnTo === "-") {
        displayPage(Number(pageNum) - 1);
    } else if (Number(turnTo)) {
        displayPage(turnTo);
    } else throw Error("turnLevelPage function got unvalid parameters : [" + turnTo + "]!");
} // end of turnLevelPage

function displayPage(pNum) {
    console.log(pNum);
}


/*

        LEVELS

*/


var levels = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
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
]