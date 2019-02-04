/*
 
        LEVELS
 
*/

/* 
 * Each level object consist :
 *     - blueprint: array of 11 strings with 9 chars
 *         - "X"       : transparent (when matches found) <-- not in use when designing level
 *         - "1" - "9" : cell is different fruits
 *         - "."       : any random fruits
 *         - "A" - "E" : cell is one of the flowers
 *         - "F"       : any random flower
 *         - "S, M, L" : cell is stone small medium large (breakable)
 *         - "#"       : cell is wall (unbreakable)
 *         - "U"       : cell is basket
 *         - "*"       : diamonds 
 *         
 *     - fruitVariationNumber : determine the number of the possible randomly
 *         created fruits [5 - 9] 
 * 
 *     - minimumFlowersOnBoard : will help to generate new flowers when board starts to run out of flowers
 * 
 *     - flowersToCompleteLevel : > 0
 * 
 *     - targetPoints : the secondary goal of the game is to max out a level, so next time it will be giving 
 *       double the amount of points. 
 * 
 *     - time : in sec-s eg: 180 --> 3 mins
 * 
 */




/*
 
   SAMPLE

   // level 0
   {
       "blueprint": [
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
       ],
       "fruitVariationNumber": 0,
       "minimumFlowersOnBoard": 0,
       "flowersToCompleteTheLevel": 0,
       "targetPoints": 0,
       "time": 0,
   },

 
 
 
 
 
 
*/
var levels = [
    // level 1
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "S.......S",
            "U#######U",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 5000,
        "time": 180,
    },




    // level 2
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#...S...#",
            "#...M...#",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 7000,
        "time": 240,
    },



    // level 3
    {
        "blueprint": [
            "....F....",
            "..#...#..",
            ".#..#..#.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 4
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..SMLMS..",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1000,
        "time": 60,
    },


    // level 5 
    {
        "blueprint": [
            "F.......F",
            "SSSSSSSSS",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#U#####U#",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1000,
        "time": 120,
    },



    // level 6
    {
        "blueprint": [
            "..#FFF#..",
            "...###...",
            "....#....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....S....",
            "...SSS...",
            "..S#U#S..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 7
    {
        "blueprint": [
            "..FFFFF..",
            "...###...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 5,
        "flowersToCompleteTheLevel": 20,
        "targetPoints": 4000,
        "time": 300,
    },



    // level 8 
    {
        "blueprint": [
            "....F....",
            ".........",
            "LLL###LLL",
            ".........",
            ".........",
            ".........",
            ".........",
            "....L....",
            "..SMLMS..",
            "SSMMLMMSS",
            "#U#####U#",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },



    // level 9 
    {
        "blueprint": [
            "...F.F...",
            "...L*L...",
            "...MMM...",
            "....S....",
            ".........",
            ".........",
            ".........",
            "U.......U",
            "#.......#",
            "#.......#",
            "#.......#",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 10
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..S...S..",
            ".#U#.#U#.",
            ".###.###.",
            ".........",
            ".........",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 11
    {
        "blueprint": [
            "......##F",
            ".......##",
            "........#",
            ".........",
            ".........",
            ".........",
            "S........",
            "MS.......",
            "LMS......",
            "LLMS.....",
            "ULLMS....",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 240,
    },


    // level 12
    {
        "blueprint": [
            "F...#...F",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "###U#U###",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 300,
    },



    // level 13
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 10,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 14
    {
        "blueprint": [
            "####F####",
            "###...###",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 8,
        "targetPoints": 2000,
        "time": 300,
    },


    // level 15
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...###...",
            "...SUS...",
            "...###...",
            "...###...",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2400,
        "time": 210,
    },




    // level 16
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "......###",
            "......LLL",
            "......LLL",
            "########U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2000,
        "time": 120,
    },



    // level 17
    {
        "blueprint": [
            "........F",
            ".........",
            "L........",
            "#L.......",
            "#L.......",
            "#L.......",
            "##L......",
            "###L.....",
            "##LL.....",
            "LLLL.....",
            "U##L.....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2500,
        "time": 250,
    },


    // level 18
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####.####",
            "####.####",
            "####.####",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 120,
    },



    // level 19
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "LLLLLLLLL",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 3000,
        "time": 190,
    },



    // level 20
    {
        "blueprint": [
            "#......FF",
            "#........",
            "#........",
            "##.......",
            "###......",
            "UL.......",
            "##.......",
            "#........",
            "#........",
            "#........",
            "#........",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1700,
        "time": 160,
    },



    // level 21
    {
        "blueprint": [
            "........F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#####",
            "....SMMLL",
            "########U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },



    // level 22
    {
        "blueprint": [
            "....F....",
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".#######.",
            "..SMLMS..",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 3700,
        "time": 120,
    },


    // level 23
    {
        "blueprint": [
            "...FFF...",
            "###...###",
            "...LLL...",
            "...###...",
            ".........",
            ".........",
            "###......",
            ".........",
            "....###..",
            ".....L...",
            "...#U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2200,
        "time": 180,
    },



    // level 24
    {
        "blueprint": [
            "..F...F..",
            "...F.F...",
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 5,
        "flowersToCompleteTheLevel": 12,
        "targetPoints": 3300,
        "time": 90,
    },



    // level 25
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....L....",
            "...LLL...",
            ".LLLLLLL.",
            "LLLLULLLL",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2800,
        "time": 150,
    },


    // level 26
    {
        "blueprint": [
            "####F####",
            "##.....##",
            "#.......#",
            "#.......#",
            "##.....##",
            "#########",
            "##.....##",
            "#.......#",
            "#.......#",
            "##.....##",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 60,
    },



    // level 27
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#.......#",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 10,
        "targetPoints": 9000,
        "time": 300,
    },

    // level 28
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#SSSSSSS#",
            "##MMMMM##",
            "###LLL###",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 3000,
        "time": 300,
    },



    // level 29
    {
        "blueprint": [
            "####F####",
            "###...###",
            "##.....##",
            "##.....##",
            "##.....##",
            "##..*..##",
            "##.....##",
            "##.....##",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1300,
        "time": 150,
    },


    // level 30
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "SSSSSSSSS",
            "S*SS*SS*S",
            "SSSSSSSSS",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 8500,
        "time": 180,
    },



    // level 31
    {
        "blueprint": [
            "....F....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "L...#...L",
            "U#######U",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 210,
    },


    // level 32
    {
        "blueprint": [
            "F.......F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#....",
            "...#.#...",
            "..#...#..",
            "S..#U#..S",
            "*S..#..S*",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5100,
        "time": 120,
    },



    // level 33
    {
        "blueprint": [
            "...F#F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..#...#..",
            "..#.S.#..",
            "..#LML#..",
            "..##U##..",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 260,
    },


    // level 34
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            "#.......#",
            "M.......M",
            "L.......L",
            "U.......U",
            "#...M...#",
            "*..LLL..*",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1200,
        "time": 90,
    },


    // level 35
    {
        "blueprint": [
            "FFFFFFFFF",
            "...***...",
            ".........",
            ".........",
            ".........",
            "LLLLLLLLL",
            ".........",
            "MMMMMMMMM",
            ".........",
            "SSSSSSSSS",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 20,
        "flowersToCompleteTheLevel": 15,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 36
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...#U#...",
            "LL#####LL",
            "*#######*",
            "#########",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2500,
        "time": 90,
    },


    // level 37
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".MSMSMSM.",
            "#S#S#S#S#",
            "###U#U###",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 120,
    },



    // level 38
    {
        "blueprint": [
            ".........",
            ".........",
            ".F.......",
            "..#####..",
            "..#......",
            "..#......",
            "..#......",
            "..#..U#..",
            "..#####..",
            ".........",
            ".........",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 90,
    },



    // level 39
    {
        "blueprint": [
            "##..F..##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 5,
        "targetPoints": 9999,
        "time": 300,
    },



    // level 40
    {
        "blueprint": [
            "F........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "L########",
            "L########",
            "LLLLLLLLU",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 210,
    },



    // level 41
    {
        "blueprint": [
            "..F.F.F..",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".U.U.U.U.",
            ".#.#.#.#.",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2500,
        "time": 120,
    },



    // level 42
    {
        "blueprint": [
            "F.......#",
            "........#",
            "........#",
            "........#",
            "........#",
            "........#",
            "........#",
            ".....####",
            ".....M...",
            ".....###M",
            ".....###U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1600,
        "time": 120,
    },




    // level 43
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "LU#####UL",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 6,
        "targetPoints": 4000,
        "time": 210,
    },



    // level 44
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            "...###...",
            ".........",
            ".........",
            ".........",
            ".........",
            "SSSSSSSSS",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1800,
        "time": 180,
    },



    // level 45
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "###LLL###",
            "###LLL###",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 240,
    },



    // level 46
    {
        "blueprint": [
            ".F.F.F.F.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#S#S#S#S#",
            "#M#M#M#M#",
            "#L#L#L#L#",
            "#U#U#U#U#",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 4,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 2000,
        "time": 210,
    },





    // level 47
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".#L#.#L#.",
            ".#*#.#*#.",
            ".###.###.",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 4000,
        "time": 180,
    },





    // level 48
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 9999,
        "time": 180,
    },




    // level 49
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..SMLMS..",
            "..#####..",
            ".........",
            "..##U##..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5000,
        "time": 180,
    },




    // level 50
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...###...",
            "...#L#...",
            "...#U#...",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1600,
        "time": 120,
    },




    // level 51
    {
        "blueprint": [
            "F........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "........M",
            ".......ML",
            "......MLL",
            ".....MLLU",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1400,
        "time": 150,
    },


    // level 52
    {
        "blueprint": [
            ".F.....F.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 150,
    },





    // level 53
    {
        "blueprint": [
            "F.......F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#....",
            "..#U#U#..",
            "..#####..",
            "..#####..",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 120,
    },



    // level 54
    {
        "blueprint": [
            "#########",
            "#########",
            "####F####",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "####U####",
            "#########",
            "#########",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 2500,
        "time": 120,
    },



    // level 55
    {
        "blueprint": [
            "....F....",
            "#LL###LL#",
            ".SS###SS.",
            ".........",
            ".........",
            ".........",
            ".........",
            "###.M.###",
            "##.....##",
            "#.......#",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1800,
        "time": 120,
    },


    // level 56
    {
        "blueprint": [
            "........F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "SMSN#####",
            "....#...#",
            "....#...#",
            "U########",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2200,
        "time": 120,
    },


    // level 57
    {
        "blueprint": [
            "F####....",
            "#####....",
            "#####....",
            "#####....",
            ".........",
            ".........",
            ".........",
            "U########",
            "#########",
            "#########",
            "#########",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 120,
    },



    // level 58
    {
        "blueprint": [
            "####F####",
            ".........",
            "SSSSSSSSS",
            ".........",
            ".........",
            "MMMMMMMMM",
            "#########",
            "..#####..",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1000,
        "time": 180,
    },



    // level 59
    {
        "blueprint": [
            "########F",
            ".........",
            ".........",
            "...######",
            "...######",
            "...######",
            ".........",
            "###......",
            "###......",
            "###......",
            "###U#####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 180,
    },


    // level 60
    {
        "blueprint": [
            "....F....",
            "###SSS###",
            "MMMM#MMMM",
            ".........",
            ".........",
            "....#....",
            "...###...",
            "....#....",
            ".........",
            "...LLL...",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 3000,
        "time": 240,
    },


    // level 61
    {
        "blueprint": [
            "#########",
            "#######.F",
            "#####....",
            "###......",
            "#........",
            "........#",
            ".......##",
            ".....####",
            "...######",
            "U########",
            "#########",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 120,
    },



    // level 62
    {
        "blueprint": [
            "F..###..F",
            "...###...",
            "...###...",
            "...###...",
            "...###...",
            "#########",
            "##.....##",
            ".........",
            ".........",
            ".........",
            "..##U##..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 180,
    },


    // level 63
    {
        "blueprint": [
            "####F####",
            "###...###",
            "##.....##",
            "#.......#",
            ".........",
            ".........",
            ".........",
            "#.......#",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1400,
        "time": 150,
    },



    // level 64
    {
        "blueprint": [
            "###.F.###",
            "#LL...LL#",
            "#L.....L#",
            ".........",
            ".........",
            ".........",
            ".........",
            "....S....",
            "...MMM...",
            "..LLLLL..",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1800,
        "time": 300,
    },




    // level 64
    {
        "blueprint": [
            "....F....",
            "...LLL...",
            "..LLLLL..",
            "..LLLLL..",
            "...LLL...",
            "....L....",
            ".........",
            ".........",
            ".........",
            "LMSMLMSML",
            "U###U###U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 180,
    },




    // level 65
    {
        "blueprint": [
            "#...L...#",
            "...LFL...",
            "....L....",
            "L.......L",
            "LL.....LL",
            "L.......L",
            ".........",
            "....L....",
            "...LLL...",
            "#...L...#",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 5,
        "targetPoints": 2500,
        "time": 180,
    },



    // level 66
    {
        "blueprint": [
            "F......F",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
            "....#....",
            "...###...",
            "..#####..",
            ".#######.",
            "#########",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1000,
        "time": 60,
    },



    // level 67
    {
        "blueprint": [
            "####F####",
            ".........",
            "SSS...LLL",
            "MMM...MMM",
            "LLL...SSS",
            "LLL...SSS",
            "MMM...MMM",
            "SSS...LLL",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 3000,
        "time": 180,
    },




    // level 68
    {
        "blueprint": [
            "F.......#",
            ".......##",
            "......##.",
            ".....##..",
            "....##...",
            "...##....",
            "..##.....",
            ".##......",
            "##.......",
            "#........",
            "........U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 145,
    },



    // level 69
    {
        "blueprint": [
            "#...F...#",
            "##.....##",
            ".##...##.",
            "..##.##..",
            "...###...",
            "...###...",
            "..##.##..",
            ".##...##.",
            "##.....##",
            "#.......#",
            "....U....",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },


    // level 70
    {
        "blueprint": [
            "....F....",
            ".MSMSMSM.",
            ".S.....S.",
            ".M.###.M.",
            ".S.#*#.S.",
            ".M.#*#.M.",
            ".S.###.S.",
            ".M.....M.",
            ".SMSMSMS.",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 170,
    },





];