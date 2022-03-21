const directory = `${__dirname}/../..`;
const {
  LowLevelConfig: LowLevelConfig
} = require(
  `${directory}/proprietary/lib/config.js`
);
const history = new LowLevelConfig('history.mndata').copyFileIfNeeded(
  `${directory}/default/data/history.mndata`
);

class History {
  get() {
    return history.update(), history.slice();
  }

  get(arrayStart) {
    let data;
    if (history.update(), 0 === arrayStart) {
      data = history.slice();
    } else {
      try {
        data = history.slice(arrayStart);
      } catch(e) {
        return console.error(`historyに${arrayStart}番目の要素はありません`),-1;
      }
      return data;
    }
  }

  get(arrayStart, arrayEnd){
    let data;
    history.update();
    try{
      data = history.slice(arrayStart,arrayEnd)
    } catch(e) {
      return console.error(
        `historyに${arrayEnd}番目の要素はありません。\nhistoryの最後の要素は${history.length-1}です。`),-1
    }
    return data
  }
  set(data) {
    history.update().unshift(data).save()
  }
}
 
module.exports = {
  History:History
};