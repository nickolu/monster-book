// Filter the array by unique objects and ouput a string of the results to copy/paste into a json file
// just paste the contents of this file in place of the monsters.js return statement in the main render function
// 

function uniqueData () {
  let uniqueData = [];
  let isUnique = true;
  let i = 0, j = 0, l = 0, k = 0;

  for (i = 0, l = cardData.length; i < l; i++) {
    isUnique = true;

    for (j = 0, k = uniqueData.length; j < k; j++) {
      if (cardData[i].name === uniqueData[j].name) {
        isUnique = false;
      }
    }

    if (isUnique) {
      uniqueData.push(cardData[i])
    }

  }

  uniqueData = utilities.sortObjectsByProp(uniqueData, 'name');

 return <div> {cardData.length}<br />
  {uniqueData.length}<br />
  {JSON.stringify(uniqueData)}</div>
}
return <div>{uniqueData()}</div>