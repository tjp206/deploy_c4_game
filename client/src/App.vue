<template>
  <div id="app">
    <h1>~ Welcome To C-4 ~</h1>
    <h1>Get Ready To Go Boom! &#129327;</h1><br>
    <div>
      <form>
        <input type="text" v-model="playerOne" id="playerOne" placeholder="Player One" required />
        <input type="text" v-model="playerTwo" id="playerTwo" placeholder="Player Two" required />        
      </form><br>
      <p class="player-names"><b id="p1">{{playerOne}}</b> vs <b id="p2">{{playerTwo}}</b></p>
    </div>
    <game-function v-if="playerTwo" :playerOne="playerOne" :playerTwo="playerTwo"></game-function>
  </div>
</template>

<script>
import { eventBus } from './main'
import Game from './components/GameFunction'
   var tableRow = document.getElementsByTagName('tr');
    var tableCell = document.getElementsByTagName('td');
    var tableSlot =  document.querySelector('.slot');
    var playerTurn = document.querySelector('.player-turn');
    var reset = document.querySelector('.reset')
    var currentPlayer = 1;
    var player1Color = 'red'
    var player2Color = 'yellow'
    var fullSlot = []
    
export default {
  data(){
    return {
    playerOne:"",
    playerTwo:"",
    }
  },
  name: 'App',
  components: {
    "game-function":Game,
  },
  mounted(){
    //Get Saved Player and Game Details.
    // this.getGames();
    // this.getPlayers();
    eventBus.$on('listen', event => this.changeColor(event));
  },
  methods: {
    changeColor:  function(event){
    let column = event.target.cellIndex;
    let row = []
      for (let i = 5; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor === 'white'){
          row.push(tableRow[i].children[column])
            if (currentPlayer === 1){
              row[0].style.backgroundColor = player1Color
              if (this.horizontalCheck() || this.verticalCheck() || this.diagonalCheckOne() || this.diagonalCheckTwo()){
                return this.$alert(`${this.playerOne} is the Winner!!! `);
                } 
                else if(this.drawCheck()){
                  return this.$alert(`The Game is a draw!!!`)
                } 
        return currentPlayer = 2
                }
          else {
            row[0].style.backgroundColor = player2Color
            if (this.horizontalCheck() || this.verticalCheck() || this.diagonalCheckOne() || this.diagonalCheckTwo()){
                return this.$alert(`${this.playerTwo} is the Winner!!! `);
                } 
                else if(this.drawCheck()){
                  return this.$alert(`The Game is a draw!!!`)
                } 
                else{
              return currentPlayer = 1
            }
         }
        }
      }
    },
  
    colorMatchCheck: function(one, two, three, four){
      return(one === two && one === three && one === four && one !== "white")
    },
    horizontalCheck: function(){
      for (let row=0; row < tableRow.length; row++){
        for (let col = 0; col<4; col++){
          if(this.colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
          tableRow[row].children[col+1].style.backgroundColor,
          tableRow[row].children[col+2].style.backgroundColor,
          tableRow[row].children[col+3].style.backgroundColor)){
            return true 
          }
        }
      }
    },
    verticalCheck: function(){
      for(let col=0; col< 7; col++){
        for(let row=0;  row<3; row ++){
          if(this.colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
          tableRow[row+1].children[col].style.backgroundColor, 
          tableRow[row+2].children[col].style.backgroundColor,
          tableRow[row+3 ].children[col].style.backgroundColor,)){
            return true;
          }
        }
      }
    },
    diagonalCheckOne: function(){
      for(let col=0; col<4; col++){
        for(let row=0; row<3; row++){
          if(this.colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
          tableRow[row+1].children[col+1].style.backgroundColor,
          tableRow[row+2].children[col+2].style.backgroundColor,
          tableRow[row+3].children[col+3].style.backgroundColor)){
            return true
          }
        }
      }
    },
    diagonalCheckTwo: function(){
      for(let col=0; col<4; col++){
        for(let row=5; row>2; row--){
          if(this.colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
          tableRow[row-1].children[col+1].style.backgroundColor,
          tableRow[row-2].children[col+2].style.backgroundColor,
          tableRow[row-3].children[col+3].style.backgroundColor)){
            return true
          }
        }
      }
    },
    drawCheck: function(){
      for(let i=0; i < tableCell.length; i++){
        if(tableCell[i].style.backgroundColor !=='white'){
          fullSlot.push(tableCell[i])
          if(fullSlot.length === tableCell.length){
              return true
          }
          return false
          }
        }
      }
    },
  }
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url('~@/assets/c4_starwars.jpg');
  width: 100vw;
}

*{
  margin: 0%;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  color: black;
  text-align: center;
  text-shadow: 0 0 3px rgb(96, 96, 253);;
}

.player-names {
  font-size: 32px;
  text-align: center;
  text-shadow: 0 0 3px rgb(96, 96, 253);
}

.game {
  position: relative;
  order: 1;
  justify-content: space-around;
  width: 650px;
  height: 600px;
  background: rgb(96, 96, 253);
  box-shadow: 10px 10px 20px black;
  padding: 1.5rem;
  border-radius: 1.5%;
}

.slot {
  width: 90px;
  height: 90px;
  background: whitesmoke;
  padding: 2.5rem;
  border: 2px;
  border-style: solid;
  border-color: black;
  border-radius: 50%;
  transition-duration: 0.4s;
}

.slot:hover {
  background-color: lightslategrey;
}

input[type=text] {
  border: 2px solid black;
  border-radius: 4px;
  box-shadow: 3px 3px 5px rgb(96, 96, 253);
}

.save {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  top: 10vh;
  margin-bottom: 1rem;
  left: 50%;
  transform: translate(-50%);
  border: 1px;
  border-style:solid;
  background-color: rgb(96, 96, 253);
  color: white;
  border-color: white;
  border-radius: 8px;
  width: 5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 3px 3px 5px black;
  transition-duration: 0.4s;
  padding: 12px;
}

.save:hover {
  background-color: white;
  color: rgb(96, 96, 253);;
  border: 1px;
  border-style:solid;
  border-color: rgb(96, 96, 253);
}

#p1 {
  color: rgb(212, 23, 23);
}

#p2 {
  color: rgb(255, 255, 0);
}

#dragtarget-red{
  flex-direction: column;
  justify-content: space-around;
  border-radius: 50%;
  display: inline;
  background: transparent;
}

#dragtarget-yellow{
  flex-direction: column;
  justify-content: space-around;
  border-radius: 50%;
  display: inline;
  background: transparent;
}

.flex-container {
  display: flex;
  justify-content: space-around;
}

#red{
  order: -1;
  margin: 18px;
  transition: transform .2s;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

#red:hover {
  transform: scale(1.5); 
}

#yellow {
  order: 2;
  margin: 18px;
  transition: transform .2s;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

#yellow:hover {
  transform: scale(1.5); 
}
</style>
