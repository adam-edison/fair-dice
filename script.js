rollSequence = [];
curIndex = 0;
lastRoll = 0;

function loadFairDice() 
{

  dice1 = [1,2,3,4,5,6];
  dice2 = [1,2,3,4,5,6];

  generateRollPossiblities();
  performPleasingShuffle();
  updateRollDisplay();
}

function generateRollPossiblities() 
{

  for(i = 0; i < dice1.length; i++) 
  {
    for(j = 0; j < dice2.length; j++) 
    {
      rollSequence.push(dice1[i] + dice2[j]);
    }
  }
}

function performPleasingShuffle() 
{
  performFisherYatesShuffle();
  avoidDuplicatesInSequence(2);
}

function performFisherYatesShuffle()
{
  for(i = 0; i < rollSequence.length; i++) 
  {
    swapElementWithRandom(rollSequence, i);
  }
}

function avoidDuplicatesInSequence(tolerance)
{
  canSwapCount = 0;

  for(i = 0; (i+1) < rollSequence.length; i++)
  {
    if(rollSequence[i] == rollSequence[i+1])
    {
      canSwapCount++;
      if(canSwapCount > tolerance)
      {
        swapElementWithRandom(rollSequence, i);
      }
    }
  }
}

function swapElementWithRandom(array, i)
{
  j = Math.floor(Math.random() * (i + 1));
  swapElements(array, i, j);
}

function swapElements(array, i ,j)
{
  temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function updateRollDisplay()
{
  if(curIndex < rollSequence.length)
  {
    if(lastRoll == 0)
    {
      $('#last-roll').text("The First Roll:");
    }
    else
    {
      $('#last-roll').text("Last Roll Was: " + lastRoll);
    }

    lastRoll = rollSequence[curIndex];
    $('#current-roll').text(rollSequence[curIndex]);
    curIndex++; 
  }
  else
  {
    performPleasingShuffle();
    outputSequence();
    curIndex = 0;
    updateRollDisplay();
  }
}

$( document ).ready(function() 
{
  loadFairDice();

  $( document ).click(function()
  {
    updateRollDisplay();
  });
});