/**
 * repsentes the new added dice apps
 * 
 * @class
 */

/**
 * 
 * creates and takes care of all dice windows and their functionalities
 * 
 * @constructor
 * 
 * @property {method} diceAppHandler - creats the stucture for the added dice apps
 * 
 * 
 */
function App() {

    /**
     * creates the necessary HTMLElements for the new created dice window and invokes the functions in App.prototype chain to provide the needed functionality
     * 
     * @method
     */
    


    this.diceAppHandler = function (appObs) {
      
        // assignes the current object to the variable self
        var self = this;

        // assignes the parent element of the objects to the variable contWrapper
        var contWrapper = document.getElementById("page-content-wrapper");
        
         // an array that's meant to contain the dice objects later on when they are created
         this.dicesArr = [];

        /**
        * creats the htmlelement for the dice app window and sets its class
        * 
        */
        this.appWraper = document.createElement("div");
        this.appWraper.setAttribute("class", "dice-window-wrapper");
        contWrapper.appendChild(this.appWraper);

        /**
        * creats the htmlelement for the dice app menubar, sets its class, makes it draggable and appends it on the parent element
        * 
        */
        this.menuWrapper = document.createElement("div");
        this.menuWrapper.setAttribute("class", "dice-menubar-wrapper");
        this.menuWrapper.setAttribute("draggable", "true")
        this.appWraper.appendChild(this.menuWrapper);

        /**
       * creats the htmlelement for close button sets its class, appends it on the parent element, and adds an event listner to it 
       * 
       */
        this.closeBut = document.createElement("div");
        this.closeBut.setAttribute("class", "close");
        this.menuWrapper.appendChild(this.closeBut);
       
        this.closeBut.addEventListener("click",

            /* *
             * removes the the app window which its close button has been clicked
             */
            function () {

                var index = appObs.indexOf(self);
                if (index !== -1){
                    appObs.splice(index, 1);
                }
                //console.log(appObs)
                contWrapper.removeChild(self.appWraper);
            });

        this.appWraper.addEventListener("mousemove", 
        /**
         * invokes the handelDragDrop method
         * 
         * @param {MouseEvent} e - mousemove event bject
         */
        function (e) {
            App.prototype.handelDragDrop.call(this, self.menuWrapper);   
        });

        /**
        * creats the htmlelement to contain the list of tools, sets its class, appends it on the parent element
        * 
        */
        this.toolBar = document.createElement("div");
        this.toolBar.setAttribute("class", "dice-toolbar-wrapper");
        this.appWraper.appendChild(this.toolBar);

        /**
        * creats the htmlelement that representes the list which contain the tools and the counter, sets its class, appends it on the parent element
        * 
        */
        this.toolList = document.createElement("ul");
        this.toolBar.appendChild(this.toolList);

        /**
       * creats the ´ul´ list that contains the li elements for the counter and sets its class
       * 
       */
        this.counter = document.createElement("ul");
        this.counter.setAttribute("class", "dice-toolbar-counter-wrapper");

        /**
         *  array, for the tool-buttons, containing three objects each one has two properties representing the buttons names and the methods to be invoked when clicking on them
         * 
         * @type {Array}
         */
        var toolArr = [
            { name: "add", method: App.prototype.addDice },
            { name: "remove", method: App.prototype.removeDice },
            { name: "roll", method: App.prototype.rollDice }
        ];

        /**
        * creats the htmlelement that contains a list of added dice objects, sets its class, appends it on the parent element
        * 
        */
        this.diceHolder = document.createElement("div");
        this.diceHolder.setAttribute("class", "dice-content-wrapper");
        this.appWraper.appendChild(this.diceHolder);

        /**
       * the ul list that contains the dice objects
       * 
       */
        this.diceUl = document.createElement("ul");
        this.diceHolder.appendChild(this.diceUl);

        toolArr.forEach(function (tool) {

            /**
             * creats a ´li´ element for each object in ´toolArr´ array, sets its class, appends it on the parent element, and adds an event listner to it 
             */
            self.toolLi = document.createElement("li");
            self.toolLi.setAttribute("class", tool.name);
            self.toolList.appendChild(self.toolLi);
            self.toolLi.addEventListener("click",

                /**
                 * invokes the methods, creates an audio object for each click and invokes the ´uppdateCount´ method 
                 * 
                 */
                function () {
                    tool.method(self.diceUl, self.dicesArr);
                    // an audio object 
                    var soundEffect = new Audio("add.wav");
                    soundEffect.play();
                    App.prototype.uppdateCount( self.counter, self.dicesArr);

                });


        });

        /**
         * creats the ´li´ list element taht contains the counter and appendes it on the toolbar list
         */
        this.countLi = document.createElement("li");
        this.toolList.appendChild(this.countLi);

        for (var i = 0; i < 5; i++) {
            /**
             * creates five ´li´elements for the counter, sets its class and appends it on its parent element 
             */
            this.counterLi = document.createElement("li");
            this.counterLi.setAttribute("class", "zero");
            this.counter.appendChild(this.counterLi);
        }
        this.countLi.appendChild(this.counter);
        
    }
}

/**
 * creats a dice object every time it's invoked
 * 
 * @method
 * @param {HTMLElement} diceUl - the list containing the dices
 * @param {Array} dicesArr - an empty array to contain the dice objects
 */
App.prototype.addDice = function ( diceUl, dicesArr) {
    /**
     * creats instance of Dice, invokes ´createDice()´ method and pushes the Dice instance inte dicesArr
     */
   
    this.dice = new Dice( diceUl);
    dicesArr.push(this.dice)
    this.dice.createDice();
    
   

}

/**
 * removes a dice each time it's invoked
 * 
 * @method
 * @param {HTMLElement} diceUl - the list containing the dices
 * @param {Array} dicesArr - an array containing the dice objects
 */

App.prototype.removeDice = function (diceUl, dicesArr) {
   if (dicesArr.length > 0) {
        dicesArr.splice(-1, 1);
        diceUl.removeChild(diceUl.lastChild);
    }
    return;
}

/**
 * calls ´roll()` for every dice object inside ´dicesArr`
 *  
 * @method
 * @param {HTMLElement} diceUl - the list containing the dices
 * @param {Array} dicesArr - an array containing the dice objects
 */

App.prototype.rollDice = function (diceUl, dicesArr) {
    for (var i = 0; i < dicesArr.length; i++){
        dicesArr[i].roll();
 } 
    
}

/**
 * 
 * countes the sum of all the added dices to a single dice app-window and represents it in the counter ´li´ elements 
 * 
 * @method
 * @param {HTMLElement} counterUl - ´ul` list containing ´li` elements for the counter 
 * @param {Array} dicesArr - an array containing the dice objects
 */

App.prototype.uppdateCount = function (counterUl, dicesArr) {

    /**
     * 
     * contains the total sum
     */
    this.sum = 0;
    for (var i = 0; i < dicesArr.length; i++) {


        /**
         * 
         * the ´randomSide` property for the  current dice object + 1, to make an equivalent of the number of dots shown on the dice
         */
        this.k = dicesArr[i].randomSide + 1;
      
        /**
         * 
         * updates sum
         */
        this.sum += this.k;

    } 

    /**
     * 
     * converts sum to a string that has the length of five characters and fills the empty charakters with zeros
     */
    this.sumStr = this.sum.toString().padStart(5, "0");

    /**
     * 
     * creates an array containing the five li elements representing the counter
     */
    this.counterLis = counterUl.getElementsByTagName("li");


    for (var i = 0; i < this.counterLis.length; i++) {

        /**
         * 
         * separates the digits contained in sum and converts them to integers
         */
        this.number = parseInt(this.sumStr.charAt(i));

        /**
         * 
         * changes the backgroundPosition of the current ´li´ element based on the value of the digits in sum
         */
        this.offset = this.number * 17;
        this.counterLis[i].style.backgroundPosition = "unset";
        this.counterLis[i].style.backgroundPosition = "0 -" + this.offset + "px";
    }

}

App.prototype.handelDragDrop = function (dragArea) {

    var cont = this; // the current object div element 
    var mouseDown = false; // checks the mouse's state
    var xOffset = 0; // used to update 'left' value for the object 
    var yOffset = 0; // used to update 'top' value for the object 

    cont.addEventListener("click",

        /**
         * 
         * sets the z Index to 1 for the object that is clicked on and iterates through the rest of the objects and sets their z Index to 0 if they don't have the click event
         */
        function () {
            
            //jag har lagt raderna från 350-356 i anonym funktionen för mousedown händelse lyssnaren 
            cont.style.zIndex = Date.now();
            var theRest = document.getElementsByClassName("dice-window-wrapper");
            for (var i = 0; i < theRest.length; i++) {
                if (theRest[i] !== cont) {
                    theRest[i].style.zIndex = 0;
                }
            };
           
        });

    dragArea.addEventListener("mousedown",

        /**
         * 
         * changes the opacity, z Index and draggability of the current object's div element and sets the value of ´ xOffset´ and ´yOffset´ to the horizontal and the vertical distance between the mouse and the corresponding edges of the div element
         * 
         * @param {MouseEvent} e - mousedown event object
         * 
         */
        function (e) {
           cont.style.zIndex = Date.now();
            var theRest = document.getElementsByClassName("dice-window-wrapper");
            for (var i = 0; i < theRest.length; i++) {
                if (theRest[i] !== cont) {
                    theRest[i].style.zIndex = 0;
                }
            };

            cont.style.opacity = 0.5;
            mouseDown = true;
            xOffset = cont.offsetLeft - e.clientX;
            yOffset = cont.offsetTop - e.clientY;
            //console.log(xOffset)
        });

    document.addEventListener("mousemove",

        /**
         * 
         * checks the mouse's state first, if mouse is down the object element shouldn't be dragable, and its position is set to "absolute" instead of "relative", updates the opacity and z Index, the top and left values of the element depending on the mouse movement
         * 
         * @param {MouseEvent} e - mousemove event bject
         * @returns {void}
         */
        function (e) {
            if (!mouseDown) return;
            e.preventDefault();
            
            cont.style.position = "absolute";
            cont.style.opacity = 0.5;
            cont.style.left = e.clientX + xOffset + "px";
            cont.style.top = e.clientY + yOffset + "px";

        });

    document.addEventListener("mouseup",

        /**
         * when mouse is not pressed, the opacity is set to 1 and mouseDown is set to false again
         * @returns {void}
         * 
         */
        function () {
            cont.style.opacity = 1;
            mouseDown = false;
        });
}

