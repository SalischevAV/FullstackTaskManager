
const thDate = document.getElementById("thDate");
const thComplete = document.getElementById("thComplete");
const btnCreate = document.getElementById("btnCreate");
const btnClear = document.getElementById("btnClear");
const itemsBody = document.getElementById("itemsBody");
const inpID = document.getElementById("inpID");
const inpComplete = document.getElementById("inpComplete");
const inpTaskText = document.getElementById("inpTaskText");
const inpExpirationDate = document.getElementById("inpExpirationDate");
const btnFtCmp = document.getElementById("btnFtCmp");
const btnFtUncmp = document.getElementById("btnFtUncmp");
const btnClrFt = document.getElementById("btnClrFt");
let itemInfoRow = null;

function formatDate(dateString){
    let res = dateString.substring(0,9);
        return res;
}

function createRow(item) {
    let tr = document.createElement("tr");

    let tdID = document.createElement("td");
    tdID.innerText = item._id;
    let tdDate = document.createElement("td");
    tdDate.innerText = item.expirationDate;
    let tdText = document.createElement("td");
    tdText.innerText = item.text;
    let tdComplete = document.createElement("td");
    tdComplete.innerText = item.isComplete;
    let tdOperations = document.createElement("td");
    let btnUpdate = document.createElement("button");
    btnUpdate.type = "button";
    btnUpdate.classList.add("btn", "btn-primary");
    btnUpdate.innerText = "Update";
    btnUpdate.name = "btnUpdate";
    tdOperations.appendChild(btnUpdate);
    let btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.innerText = "Delete";
    btnDelete.name = "btnDelete";
    tdOperations.appendChild(btnDelete);
    tr.appendChild(tdID);
    tr.appendChild(tdDate);
    tr.appendChild(tdText);
    tr.appendChild(tdComplete);
    tr.appendChild(tdOperations);
    if (Boolean(item.isComplete) == true) {
        tdComplete.parentNode.classList.add("table-success");
    }
    itemsBody.appendChild(tr);
}

function replaceRow(row, item) {
    row.children[0].innerText = item._id;
    row.children[1].innerText = item.expirationDate;
    row.children[2].innerText = item.text;
    row.children[3].innerText = item.isComplete;
}

async function getAll(queryString) {
    const res = await fetch(`/api/items?sortBy=${queryString}`);
    const items = await res.json();
    items.forEach((item) => {
        createRow(item);    
    });
}

async function create() {
    const res = await fetch("/api/items", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            text: inpTaskText.value,
            expirationDate: inpExpirationDate.value
        })
    });
    const item = await res.json();
    createRow(item);

}

async function update() {
    let id = inpID.value;
    const res = await fetch(`/api/items/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
            expirationDate: inpExpirationDate.value,
            text: inpTaskText.value,
            isComplete: inpComplete.value
        })
    });
    const item = await res.json();
    replaceRow(itemInfoRow, item);
    btnCreate.classList.remove("btn-primary");
    btnCreate.classList.add("btn-success");
    btnCreate.innerText = "Create";
    inpExpirationDate.value ="";
    inpTaskText.value = "";
}

async function deleteAll() {
    const res = await fetch("/api/items", {
        method: "DELETE",
    });
    if (res.ok) {
        itemsBody.innerHTML = "";
    }
}

async function rowClickHandler(evt) {
    switch (evt.target.tagName) {
        case "TD":
            itemInfoRow = evt.target.parentNode;
            id = itemInfoRow.children[0].innerText;
            let res = await fetch(`/api/items/${id}`, {
                headers: { "Content-Type": "application/json" },
                method: "PATCH",
                body: JSON.stringify({
                    //expirationDate: itemInfoRow.children[1].innerText,
                    //text: itemInfoRow.children[2].innerText,
                    isComplete: itemInfoRow.children[3].innerText,
                })
            });
            const item = await res.json();
            replaceRow(itemInfoRow, item);
            itemInfoRow.classList.toggle("table-success");
            break;
        case "BUTTON":
            itemInfoRow = evt.target.parentNode.parentNode;
            id = itemInfoRow.children[0].innerText;
            if (event.target.name === "btnUpdate") {
                inpID.value = id;
                inpTaskText.value = itemInfoRow.children[2].innerText;
                inpExpirationDate.value = itemInfoRow.children[1].innerText;
                inpComplete.value = itemInfoRow.children[3].innerText;
                btnCreate.classList.remove("btn-success");
                btnCreate.classList.add("btn-primary");
                btnCreate.innerText = "Update";
                //event.target.disabled = "disabled";
            } else if (event.target.name === "btnDelete") {
                let res = await fetch(`/api/items/${id}`, {
                    headers: { "Content-Type": "application/json" },
                    method: "DELETE",
                });
                if ((await res).ok) {
                    itemInfoRow.remove();
                }
            }
            break;
    }

}

window.addEventListener("load", getAll);
//window.addEventListener("click", (evt) => console.log(evt.target.tagName));
thDate.addEventListener("click", () => {
    itemsBody.innerHTML = "";
    getAll("date");
});
/*thComplete.addEventListener("click", () => {
    itemsBody.innerHTML = "";
    getAll("state");
});*/
itemsBody.addEventListener("click", rowClickHandler);
btnClear.addEventListener("click", deleteAll);
btnCreate.addEventListener("click", () => {
    if (btnCreate.classList.contains("btn-success")) {
        create();
    } else if (btnCreate.classList.contains("btn-primary")) {
        update();
    }
});
btnFtCmp.addEventListener("click", () => {
    itemsBody.innerHTML = "";
    getAll("complete");
});
btnFtUncmp.addEventListener("click", () => {
    itemsBody.innerHTML = "";
    getAll("uncomplete");
});
btnClrFt.addEventListener("click", () => {
    itemsBody.innerHTML = "";
    getAll();
});