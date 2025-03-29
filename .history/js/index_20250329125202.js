
const root = new makeNode('\0');
for (const item of items)
    add(item, 0, root);

const text_box = document.getElementById("text-box");
const list = document.getElementById("list");

function handler(e) {
    const str = e.target.value;
    predictions = search(str, 0, root);

    console.log(predictions);
    list.innerHTML = ""
    for (const prediction of predictions)
        list.innerHTML += `<li class="list-group-item clickable" onclick="handleClick(this)"><b>${str}</b>${prediction.substring(str.length)}</li>`;

}


function handleClick(e) {
    text_box.value = e.innerText;
}

handler({ target: { value: "" } });

if(text_box)
text_box.addEventListener("keyup", handler);
