var React = require('react');
var ReactDOM = require('react-dom');
var utilities = require("../../../node_modules/simple-react-utilities/js/utilities.js");

import cardData from '../json/monsters.json';
import filterOptions from '../json/filter-configs.json';
import Filter from '../../../node_modules/card-filters/src/www/js/filter.js';
import { CardBook } from '../../../node_modules/card-filters/src/www/js/cards.js'
import { Card } from '../../../node_modules/card-filters/src/www/js/components/card.js'
import { FilterButtonGroup } from '../../../node_modules/card-filters/src/www/js/components/filter-button-group.js';
import { FilterButton } from '../../../node_modules/card-filters/src/www/js/components/filter-button.js';
import { TextInput } from '../../../node_modules/simple-react-forms/form-fields/text-input.js';
import { ShowHideButton } from '../../../node_modules/card-filters/src/www/js/components/show-hide-button.js';
import { SubmitButton } from '../../../node_modules/simple-react-forms/form-fields/submit-button.js';

class MonsterBook extends React.Component {
  /**
   * constructor for CardBook
   * @param  {object} props [element properties/attributes passed in at initialization]
   */
  constructor(props) {
    super(props);

    this.searchFilter = this.searchFilter.bind(this);
  }
  
  searchFilter(activate,deactivate) {
    var filter = new Filter(cardData);
    var _this = this;

    var searchOptions = {
      filterName : "level",
      filterFunc : filter.by.search, 
      onActivate : activate, 
      onDeactivate : deactivate
    }

    function update(e) {
      if (typeof activate === "function") {
        activate('search',{filterFunc : filter.by.search, filterArgs : [false, e.target.value]}); // TODO: this boolean indicates description search
      }
    }

    function clearInput() {
      let inputElem = document.querySelector('.form-control');
      inputElem.value = "";
      activate('search',{filterFunc : filter.by.search, filterArgs : [false, ""]}); // TODO: this boolean indicates description search
    }

    return <div className="filterByText-wrapper">
            <TextInput className="filterByText" label="Search" type="search" name="filterByText" onChange={update} />
            <div className="clear-input" onClick={clearInput}>x</div>
           </div>
  }

  crFilters(activate,deactivate) {
    var filter = new Filter(cardData);
    var buttonOptions = {
      filterName : "CR",
      filterFunc : filter.by.value, 
      onActivate : activate, 
      onDeactivate : deactivate
    }

    return  <div>
              <h4>Level</h4>
              <FilterButtonGroup cardData={cardData} buttonOptions={buttonOptions} filters={filterOptions.cr} />
            </div>
  }
  /**
   * [typeFilters description]
   * @param  {[type]} activate 
   *         
   startFilteringBy(filterName,filterObject) {
    let filters = this.state.filters;
    filters[filterName] = filters[filterName] || {};
    filters[filterName].filterArgs = filters[filterName].filterArgs || [];
    
    // add the filter args and update the filter function 
    filters[filterName].filterArgs.push(filterObject.filterArgs);
    filters[filterName].filterFunc = filterObject.filterFunc;

    // TODO: workaround for search filter
    if (filterName === 'search') {

      filters[filterName].filterArgs = [filterObject.filterArgs];
    }

    // save 
    this.setState({
      cards : [],
      filters : filters[filterName]
    });

    // update
    this.executeFilters(this.state.filters);
  }

  stopFilteringBy(filterName,filterObject) {
    let filters = this.state.filters;
    let i = 0;

    filters[filterName] = filters[filterName] || {};
    filters[filterName].filterArgs = filters[filterName].filterArgs || [];
    
    // remove the filter args 
    filters[filterName].filterArgs.forEach((filterArg) => {
      if (filterArg === filterObject.filterArgs) {
        filters[filterName].filterArgs.splice(i, 1);
      }
      i++;
    });
    
    // save 
    this.setState(Object.assign({}, this.state, {
      filters : filters[filterName]
    }));

    // update
    this.executeFilters(this.state.filters);
  }
   * @param  {[type]} deactivate [description]
   * @return {[type]}            [description]
   */
  typeFilters(activate,deactivate) {
    var filter = new Filter(cardData);
    
    function update(e) {
      let activeBtn = document.querySelector(".active.type-filter-btn");
      let activeFilterProp = activeBtn.getAttribute('data-filter-prop');
      let activeFilterValue = activeBtn.getAttribute('data-filter-value');

      if (e.target.className.indexOf("active") === -1) {
        activeBtn.className = activeBtn.className.replace(/active/g,'');
        e.target.className += " active";

        activate('type', {
          filterArgs : [e.target.getAttribute('data-filter-prop'), e.target.getAttribute('data-filter-value')],
          filterFunc : filter.by.match
        });

        deactivate('type', {
          filterArgs : [activeFilterProp, activeFilterValue],
          filterFunc : filter.by.match,
          exclude : true
        });
      }

    }

    function showAll(e) {
      let activeBtn = document.querySelector(".active.type-filter-btn");
      let activeFilterProp = activeBtn.getAttribute('data-filter-prop');
      let activeFilterValue = activeBtn.getAttribute('data-filter-value');

      if (e.target.className.indexOf("active") === -1) {
        activeBtn.className = activeBtn.className.replace(/active/g,'');
        e.target.className += " active";

        activate('type', {
          filterArgs : [e.target.getAttribute('data-filter-prop'), e.target.getAttribute('data-filter-value')],
          filterFunc : filter.by.all
        });

        deactivate('type', {
          filterArgs : [activeFilterProp, activeFilterValue],
          filterFunc : filter.by.match,
          exclude : true
        });
      }
    }

    function getClassName(index) {
      const activeClass = index === 0 ? ' active' : '';
      return "btn type-filter-btn" + activeClass;
    }

    var buttons = function() {
      return <div className="row"><div className="col-xs-12">{filterOptions.type.map(function(button, index){
        return (
          <div 
            key={button.filterArgs[1]} 
            className={getClassName(index)}
            onClick={update} 
            data-filter-prop={button.filterArgs[0]} 
            data-filter-value={button.filterArgs[1]}>
            
            {button.label}
          
          </div>
        )
      })}</div></div>;
    }

    return  <div>
              <h4>Type</h4>
              {buttons()}
              Show all: <div className="btn type-filter-btn" onClick={showAll} data-filter-prop="type"
            data-filter-value="all">Show all types (slow)</div>
            </div>
  }

  sourceFilters(activate,deactivate) {
    var filter = new Filter(cardData);
    var buttonOptions = {
      filterName : "Source",
      filterFunc : filter.by.match, 
      onActivate : activate, 
      onDeactivate : deactivate
    }

    return  <div>
              <h4>Source</h4>
              <FilterButtonGroup cardData={cardData} buttonOptions={buttonOptions} filters={filterOptions.source} />
            </div>
  }

  renderCards(cardsData) {
    var i = 0;
    var cardsArr = cardsData || [];

    function cardId(card) {
      return card.name.toLowerCase()
                      .replace(/\s/g,'-')
                      .replace(/'/g,'')
                      .replace(/\//g,'-');
    }

    function abilityScoreModifier(score) {
      let modifier = Math.floor((score - 10)/2);
      return modifier > -1 ? '+'+modifier : modifier; 
    }

    function creatureSpecialAbilities(creature) {
      if(Array.isArray(creature.special_abilities)) {
        return creature.special_abilities.map((ability) => {
          return (
            <div key={cardId(ability)}>
              <strong>{ability.name}.</strong> <span dangerouslySetInnerHTML={ { __html: ability.text } }></span><br/>
            </div>
          )
        });
      }
    }

    function creatureActions(creature) {
      if(Array.isArray(creature.actions)) {
        return creature.actions.map((action) => {
          return (
            <div key={cardId(action)}>
              <strong>{action.name}.</strong> <span dangerouslySetInnerHTML={ { __html: action.text } }></span><br/>
            </div>
          )
        });
      }
    }

    var cards = <div className="row card-container">
      {cardsArr.map(creature => <div className="card card-inner col-xs-12 col-sm-6" key={creature.name}>
        <div className={cardId(creature)}>
          <h2 className="card_name">{creature.name}</h2>
          <span className="open-button"><ShowHideButton target={"."+cardId(creature)+" .card-content"} showText="+" hideText="-" /></span>
          <span className="closed-button"><ShowHideButton target={"."+cardId(creature)+" .card-content"} showText="+" hideText="-" startClosed="true"/></span>
          <p>{creature.size} {creature.type}, {creature.alignment}</p>
          <div className="row card-content card">
            <div className="col-xs-12">
              <hr />
              <div><strong>Armor class</strong> {creature.armor_class}</div>
              <div><strong>Hit Points</strong> {creature.hit_points}</div>
              <div><strong>Speed</strong> {creature.speed}</div>
              <hr />
              <table><tbody>
                <tr>
                  <td>STR</td>
                  <td>DEX</td>
                  <td>CON</td>
                  <td>INT</td>
                  <td>WIS</td>
                  <td>CHA</td>
                </tr>
                <tr>
                  <td>{creature.strength} ({abilityScoreModifier(creature.strength)})</td>
                  <td>{creature.dexterity} ({abilityScoreModifier(creature.dexterity)})</td>
                  <td>{creature.constitution} ({abilityScoreModifier(creature.constitution)})</td>
                  <td>{creature.intelligence} ({abilityScoreModifier(creature.intelligence)})</td>
                  <td>{creature.wisdom} ({abilityScoreModifier(creature.wisdom)})</td>
                  <td>{creature.charisma} ({abilityScoreModifier(creature.charisma)})</td>
                </tr></tbody>
              </table>
              <hr />
              <div><strong>Vulnerabilities</strong> {creature.vulnerable}</div>
              <div><strong>Damage Immunities</strong> {creature.immune}</div>
              <div><strong>Condition Immunities</strong> {creature.conditionImmune}</div>
              <div><strong>Senses</strong> {creature.senses}<br/> &nbsp;&nbsp;&nbsp;&nbsp;Perception {creature.passive}</div>
              <div><strong>Languages</strong> {creature.languages}</div>
              <div><strong>Challenge</strong> {creature.cr}</div>
              <hr />
              {creatureSpecialAbilities(creature)}
              <h4>Actions</h4>
              {creatureActions(creature)}
              <p>{creature.source}</p>
            </div>  
          </div>
        </div>
      
      </div>)}
    </div>;


    if (!cardsData || cardsData.length === 0) {
      cards = <div className="card-container col-xs-12"><h4 className="no-cards">No cards matching the selected filters</h4></div>
    }

    return cards;
  }
  
  /**
   * puts everything in the DOM
   */
  render() {
    const filter = new Filter(cardData);
    const startData = filter.by.value(['type','aberration'],cardData);

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

    function uniqueProps (prop) {
      let uniqueProps = [];
      let isUnique = true;
      let i = 0, j = 0, l = 0, k = 0;

      for (i = 0, l = cardData.length; i < l; i++) {
        isUnique = true;

        for (j = 0, k = uniqueProps.length; j < k; j++) {
          if (cardData[i].source === uniqueProps[j].source) {
            isUnique = false;
          }
        }

        if (isUnique) {
          uniqueProps.push(cardData[i].source)
        }

      }

     return <div>{uniqueProps.map((prop) => {
      return <div key={prop}>{prop}</div>
     })}</div>;
    }


    return  <div className="container">
              <CardBook 
                label="Monsters"
                cardData={cardData}
                startData={startData}
                searchFilter={this.searchFilter}
                navigation={this.typeFilters}
                filters={[this.crFilters, this.sourceFilters]}
                renderCards={this.renderCards}
                advancedFilters={[/*this.componentFilters,this.optionsFilters,this.schoolFilters,this.durationFilters,this.castingTimeFilters,this.rangeFilters,this.sourceFilters*/]}
              />
            </div>;
  }
}

ReactDOM.render(<MonsterBook />, document.querySelector('main'));
