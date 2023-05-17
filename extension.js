let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("save-tab")
tabBtn.addEventListener("click",function(){

chrome.tabs.query({active: true,currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })

})

const LeadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if(LeadsFromLocalStorage){
    myLeads=LeadsFromLocalStorage
    render(myLeads)
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

inputBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

function render(Lead){
    let listItems=""
    for(let i=0;i<Lead.length;i++){
       listItems+= `
                    <li>
                        <a href='${Lead[i]}' target='_blank'>
                            ${Lead[i]}
                        </a>
                    </li>
                    `
    }
    ulEl.innerHTML=listItems
}