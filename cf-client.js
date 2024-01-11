import { which } from "bun";

var server_url = 'http://127.0.0.1:3000';

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
    return document.getElementsByClassName('source-popup')[1];
}

function getStatus(sub) {
    return sub.getElementsByClassName('submissionVerdictWrapper')[0].getAttribute('submissionverdict');
}

function makeRequest(url, method, data) {
    $.ajax({
        url: `{url}`,
        type: method,
        data: data,
        success: function() { console.log("succ"); },
        error: function() { console.log("error", data); },
    });
}

function getAccepted() {
    for (let i = 1; i < subs.length; i++) {
        if (getStatus(subs[i]) !== 'OK') {
            continue;
        }
        setTimeout(() => clickSub(subs[i]), 1000);
        closeSub();
    }
}

async function solutionToServer(solution) {
    await fetch('http://127.0.0.1:3000/', {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/html",
        },
        body: solution,
    });
}

async function handleSub(sub) {
    clickSub(sub);
    let data = getSolution().innerHTML;
    await fetch(server_url);
}
