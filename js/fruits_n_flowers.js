$(document).ready(
    // delay start while logo animation is running
    () => { setTimeout(() => { start(); }, 3000); }
);

function start() {
    $(".logo").hide();
    $("header, .level-menu").show();

    createLevelTable();

} // end of start

function createLevelTable(selector, rowNum, cellNum) {
    tbody = document.createElement("tbody");

    // create rows
    for (r = 0; r < 5; r++) {
        const row = document.createElement("tr");

        // create cells
        for (c = 0; c < 5; c++) {
            const cell = document.createElement("td");

            cell.id = `level-btn-${r}-${c}`;
            cell.innerHTML = `${r * 5 + c}`;

            row.append(cell);
        } // end of for cell

        tbody.append(row);
    } // end of for row

    $(".level-table").append(tbody);

    console.log($(".level-table").get());
} // end of createLevelTable


/*

        LEVELS

*/


var levels = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    {}, {}, {}, {}
]