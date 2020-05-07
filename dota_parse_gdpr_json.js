// clickButton taken from here https://github.com/Irevall/steam-gdpr-interpreter
// Go to: https://steamcommunity.com/my/gcpd/570?category=Matches&tab=PlayerMatchHistory
// And copy code below into console 
let interval = setInterval(clickButton, 100);
// automatically load more
function clickButton() {
    let button = document.querySelector('.load_more_history_area').querySelector('a');
    if (document.querySelector('#inventory_history_loading').style.display !== 'none') {
        return false;
    }
    if (button.querySelector('div').style.display === 'none') {
        clearInterval(interval);
        export_json();
        return false;
    }
    button.click();
}
function export_json() {
    const matchHistory = [];
    const table = document.querySelector('.generic_kv_table');
    const records = table.querySelectorAll('tr');
    records.forEach((element, index) => {
        if (index !== 0) {
            const data = element.querySelectorAll('td');
            // there is no win/lose date , and all matches with custom games count as defeat (0)
            const ID = data[0].innerHTML;
            const duration = data[1].innerHTML;
            const starttime = data[2].innerHTML;
            // 15 is lobby_type for custom games/pratice lobby
            const gamemode = data[4].innerHTML;
            const hero = data[8].innerHTML;
            const item1 = data[9].innerHTML;
            const item2 = data[10].innerHTML;
            const item3 = data[11].innerHTML;
            const item4 = data[12].innerHTML;
            const item5 = data[13].innerHTML;
            const item6 = data[14].innerHTML;
            const item7 = data[15].innerHTML;
            const item8 = data[16].innerHTML;
            const item9 = data[17].innerHTML;
            const item10 = data[18].innerHTML;
            const lvl = data[19].innerHTML;
            const kills = data[20].innerHTML;
            const deaths = data[21].innerHTML;
            const assists = data[22].innerHTML;
            const lasthits = data[23].innerHTML;


            matchHistory.push({
                ID: ID, duration: duration, starttime: starttime, gamemode: gamemode, hero: hero, item1: item1, item2: item2, item3: item3, item4: item4, item5: item5, item6: item6, item7: item7, item8: item8, item9: item9, item10: item10, lvl: lvl, kills: kills, deaths: deaths, assists: assists, lasthits: lasthits,
            })

        }
    });
    //https://stackoverflow.com/a/52297652
    const filename = 'playermathchistory.json';
    const jsonStr = JSON.stringify(matchHistory);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}