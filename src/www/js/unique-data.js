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