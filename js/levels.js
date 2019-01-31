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
            "..SMLMS..",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1000,
        "time": 60,
    },


    // level 2 
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
        "time": 60,
    },


    // level 3 
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
        "time": 150,
    },


    // level 4 
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


    // level 5
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


    // level 6
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


    // level 7
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



    // level 8
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
        "time": 200,
    },


    // level 9
    {
        "blueprint": [
            "F...#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 300,
    },



    // level 10
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



    // level 11
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



    // level 13
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



    // level 14
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



];
