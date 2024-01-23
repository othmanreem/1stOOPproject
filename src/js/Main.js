/**
 * represents the base of the program
 * 
 * @typedef {Object} Main
 * @property {method} init - initializes the program
 * @property {method} newAppIns - creates instances of the App class
 */

/**
 * contains logic for the program to start
 * 
 * @type {Main}
 */
var Main = {
  /**
   * initializes the program by creating a variable, assigning it to a DOM element and adding an event listner to it
   * 
   */
   
     init: function () {
      // an empty array to contain App instances 
      var appObs = [];
      // the clickabel ´li´ element to add more dice app windows
      var diceButton = document.getElementById('icon-dice');
     
      diceButton.addEventListener('click', function (){
         Main.newAppIns(appObs);
         
      });
  
   },
   /**
    * creates instances of the App class and invokes the method ´diceAppHandler´ for each instance
    * 
    */
      newAppIns: function (appObs){
          
        // an instance of App 
          var appIns = new App();
          appObs.push(appIns);
          appIns.diceAppHandler(appObs);
          
         
      }
     
    
  }
  
  window.addEventListener('load', Main.init);
  
  