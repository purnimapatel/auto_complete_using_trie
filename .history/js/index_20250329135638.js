// Initialize items from localStorage or use default items from data.js
let items = JSON.parse(localStorage.getItem('autocomplete_items')) || window.items;

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

function handleSubmit(){
    let data = text_box.value.trim();
    if(data) {
        if(!items.includes(data)) {
            items.unshift(data);
            add(data, 0, root);  // Add to trie data structure
            // Save to localStorage
            localStorage.setItem('autocomplete_items', JSON.stringify(items));
        }
        console.log(items.length);
        if(items.length>100){
            for(let i=0;i<(items.length)/2;i++){
                items.pop();
            }
            // Save updated array after trimming
            localStorage.setItem('autocomplete_items', JSON.stringify(items));
        }
        text_box.value = "";
        handler({ target: { value: "" } });  // Reset suggestions
    }
}

handler({ target: { value: "" } });

if(text_box)
text_box.addEventListener("keyup", handler);
