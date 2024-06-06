
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
let myLeads = []


let li = localStorage.getItem("myLeads")
if (li) {
    myLeads = JSON.parse(li)
    render(myLeads)
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


inputBtn.addEventListener("click", function() {
    const inputText = inputEl.value
    if (inputText.length != 0, /\S/.test(inputText)) {
        myLeads.push(inputEl.value)
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads)

})


function render(leads) {
    ulEl.innerText = ""
    let listItems = ``
    for (i=0; i< leads.length; i++) {
        if (leads.length != 0) {
            listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
        }
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
