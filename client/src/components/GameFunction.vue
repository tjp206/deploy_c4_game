<template>
<div>
    <h3 class="player-turn"></h3>
    
    <div class="flex-container">
    <div id="red" v-on:dragover="allowDrop">
    <img draggable="true" id="dragtarget-red" src="../assets/red.png" width="50" height="50">
    </div>
    <div id="yellow" v-on:dragover="allowDrop">
    <img draggable="true" id="dragtarget-yellow" src="../assets/yellow.png" width="50" height="50">
    </div>

    <div class="game" v-on:dragover="allowDrop">
      <table>
      <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>
      <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>    
       <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>   
        <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>    
      <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>    
      <tr>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
        <td class="slot"></td>
      </tr>
      </table>
      <!-- <div class="save">Save Game</div> -->
    </div> 
    </div>
    <timer></timer>
</div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';
import Timer from './Timer.vue'
import { eventBus } from '../main.js'
   var tableRow = document.getElementsByTagName('tr');
    var tableCell = document.getElementsByTagName('td');
    var tableSlot =  document.querySelector('.slot');
    
    
export default {
    name: "game-function",
    props: ["playerOne", "playerTwo"],
    components: { 
      Drag, 
      Drop,
      'timer':Timer
     },
  data(){
    return {
    tableRow: document.getElementsByTagName('tr'),
    tableCell: document.getElementsByTagName('td'),
    tableSlot:  document.querySelector('.slot')  
    }
  },
 		methods: {
      allowDrop:function(event) {
        event.preventDefault();
      },

    },
    
  mounted(){
        for (let i=0; i < tableCell.length; i++){
        tableCell[i].style.backgroundColor = 'white'
        tableCell[i].addEventListener('drop', (event) => {
            eventBus.$emit('listen', event);
            console.log(event)     
                    }
            )}
    },
    
      computed: {
          formattedTimeLeft() {
            const timeLeft = this.timeLeft      
            const minutes = Math.floor(timeLeft / 60)
            let seconds = timeLeft % 60
            if (seconds < 10) {
              seconds = `0${seconds}`
            }
            return `${minutes}:${seconds}`
          }
        }
      }

</script>

<style>
playerOne {
  color: red;
}
</style>