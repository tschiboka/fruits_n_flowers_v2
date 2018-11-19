$(document).ready(
    // delay start while logo animation is running
    () => { setTimeout(() => { start(); }, 3000); }
);

function start() {
    $(".logo").hide();
} // end of start