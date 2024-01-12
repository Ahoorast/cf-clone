function getSubs() {
    return document.getElementsByClassName("status-frame-datatable")[0].getElementsByTagName('tr');
}

function clickSub(sub) {
    sub.getElementsByClassName("view-source")[0].click();
}

function closeSub() {
    document.getElementsByClassName('close_image')[0].click();
}

function getSolution() {
    let solutionHTML = document.getElementsByClassName('source-popup')[1].getElementsByTagName('li');
    let solutionText = "";
    for (let i = 0; i < solutionHTML.length; i++) {
        let lineText = "";
        let lineHTML = solutionHTML[i].getElementsByTagName('span');
        for (let j = 0; j < lineHTML.length; j++) {
            lineText = lineText + lineHTML[j].innerText;
        }
        solutionText = solutionText + lineText + '\n';
    }
    return solutionText;
}

function getStatus(sub) {
    return sub.getElementsByClassName('submissionVerdictWrapper')[0].getAttribute('submissionverdict');
}

function getLink(sub) {
    return sub.getElementsByTagName('td')[3].getElementsByTagName('a')[0].getAttribute('href');
}

async function solutionToServer(url, solution) {
    await fetch('http://127.0.0.1:3000/', {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify({url: url, solution: solution}),
    });
}


async function getAccepted() {
    for (let i = 1; i < subs.length; i++) {
        console.log(`${i} out of ${subs.length}`);
        if (getStatus(subs[i]) !== 'OK') {
            continue;
        }
        console.log(`sending ${i} to server`)
        let url = getLink(subs[i]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        clickSub(subs[i]);
        await new Promise(resolve => setTimeout(resolve, 7000));
        let solution = getSolution();
        solutionToServer(url, solution);
        console.log(url);
        await new Promise(resolve => setTimeout(resolve, 1000));
        closeSub();
    }
}

subs = getSubs();
getAccepted();
