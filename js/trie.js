function makeNode(ch) {
    this.ch = ch;
    this.isTerminal = false;
    this.map = {};
    this.words = [];  
}

function add(str, i, root) {

    if (i === str.length) {
        root.isTerminal = true;
        return;
    }

    if (!root.map[str[i]])
        root.map[str[i]] = new makeNode(str[i]);

    root.words.push(str);
    add(str, i + 1, root.map[str[i]]);
}

function search(string, i, root){
    if(string.length === 0){
        return[];
    }
    if(i === string.length){
        return root.words;
    }
    if(!root.map[string[i]]){
        return[];
    }
    return search(string, i+1, root.map[string[i]]);

}
