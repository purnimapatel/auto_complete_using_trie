// Initialize items from localStorage or use default items from data.js
let storedItems = localStorage.getItem('autocomplete_items');
let items = storedItems ? Array.from(JSON.parse(storedItems)) : Array.from(window.items || []);
console.log(typeof(items), Array.isArray(items));

const root = new makeNode('\0');
for (const item of items) {
    if (typeof item === 'string') {
        add(item, 0, root);
    }
}

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
            localStorage.setItem('autocomplete_items', JSON.stringify(Array.from(items)));
        }
        console.log(items.length);
        if(items.length > 100){
            items = items.slice(0, 50);  // Keep only first 50 items
            // Save updated array after trimming
            localStorage.setItem('autocomplete_items', JSON.stringify(Array.from(items)));
        }
        text_box.value = "";
        handler({ target: { value: "" } });  // Reset suggestions
    }
}

handler({ target: { value: "" } });

if(text_box)
text_box.addEventListener("keyup", handler);
