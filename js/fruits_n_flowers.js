$(document).ready(
    // delay start while logo animation is running
    () => { setTimeout(() => { start(); }, 3000); }
);

function start() {
    $(".logo").hide();
    $("header, .level-menu").show();

    createLevelTables();
    createLevelPageIndicator();
} // end of start



function createLevelPageIndicator() {
    // create as many page indicator as many tables are
    const tableNum = Math.ceil(levels.length / 25);

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

        table.id = `level-page-${t}`;
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
    {}, {}, {}, {}, {}, {}, {}, {}, {}
]