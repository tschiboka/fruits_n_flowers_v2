$(document).ready(
    // delay start while logo animation is running
    () => { setTimeout(() => { start(); }, 3000); }
);

function start() {
    $(".logo").hide();
    $("header, .level-menu").show();

    createLevelTables();

} // end of start

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
                    div = document.createElement("div");

                div.id = `level-btn-${levelNum}`
                div.innerHTML = `${levelNum}`;
                cell.id = `level-cell-${levelNum}`;

                cell.append(div);

                // do not show cells that are out of the level array
                if (!levels[levelNum - 1]) {
                    $(div).hide();
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
    /* {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},*/
    {}, {}, {}, {}, {}, {}, {}, {}, {}
]