let getModrinthData = async function (id) {
    return await fetch(`https://api.modrinth.com/v2/project/${(id)}`).then(res => res.json()).catch(error => error);
}

const params = new URLSearchParams(window.location.search);
const mod1 = params.get('mod1');
const mod2 = params.get('mod2');

console.log(mod1)
console.log(mod2)

async function setData () {
    let mod1title = await getModrinthData(mod1).then(data => data.title);
    let mod2title = await getModrinthData(mod2).then(data => data.title);
    let mod1downloads = await getModrinthData(mod1).then(data => data.downloads);
    let mod2downloads = await getModrinthData(mod2).then(data => data.downloads);

    document.getElementById("mod1").innerHTML = mod1title + " - " + parseFloat(mod1downloads).toLocaleString('en');
    document.getElementById("mod2").innerHTML = mod2title + " - " + parseFloat(mod2downloads).toLocaleString('en');

    let difference = mod1downloads - mod2downloads
    let aheadBy = "ahead by: "

    if (difference < 0) {
        aheadBy = "behind by: ";
        difference=-difference;
    }
    
    document.getElementById("difference").innerHTML = aheadBy + parseFloat(difference).toLocaleString('en');
}

setData()