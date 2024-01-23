/**
 * 
 * creates dices
 * @class
 */

/**
 * 
 * represents the class that creates dices for all the open dice applications
 * 
 * @constructor
 * 
 * 
 
 * @property  {HTMLElement} diceUl - the list containing the dices
 * @property {method} createDice - creates a new dice every time it's called
 * 
 * 
 */

function Dice (diceUl){

  /**
    * 
    * the list containing the li elements representing the dices
    */
    this.diceUl = diceUl;
   
     /**
     * creates the ´li´ element that is meant to represent a dice, randomly gives a class and checks the length of the parent element to limit the creation of new dices
     * 
     * @method
     */
    this.createDice = function (){
      if (this.diceUl.getElementsByTagName("li").length < 40){
        /**
         * 
         * an array with six strings to be set as classes for the ´li´ elements
         * @type {Array}
         */
        this.diceArr = [
             "dice dice-side-one",
           "dice dice-side-two",
             "dice dice-side-three",
            "dice dice-side-four",
             "dice dice-side-five",
            "dice dice-side-six"
        ];
      this.randomSide = Math.floor(Math.random() * this.diceArr.length); // a random position from the array to be used as a class
      this.diceLi = document.createElement("li"); // creats the ´li´ element to represent a new dice side
      this.diceLi.setAttribute("class", this.diceArr[this.randomSide]);
       this.diceUl.appendChild(this.diceLi);
    }
    }
    /**
     * repicks a random side for the added dice-instances every time it's called
     * 
     *  @method
     */
    this.roll = function() {
      this.randomSide = Math.floor(Math.random() * [0,1,3,4,5].length);
      this.diceLi.setAttribute("class", this.diceArr[this.randomSide]);
    }
}