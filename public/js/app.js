const add = document.getElementById("add-item");
const ulParent = document.getElementById("unorderd-list-wrap");
const ul = document.getElementById("unordered-list");
const inputGroup = document.getElementById("input-group");
const input = document.getElementById("user-input");
const deleteAll = document.getElementById("delete-all");
const parseAsXML = document.getElementById("parse-as-xml");

// sorting
const sortByName = document.getElementById("sort-by-name");
const sortByValue = document.getElementById("sort-by-value");

// regex for the key value pair checking
const regex = /^[A-Za-z\d]+\=[A-Za-z\d]+$/;
let db = {
    casda: 'a',
    asda: 'b',
    basda: 'c',
};

// removing the error state when the user types anything
input.onkeyup = (e) =>
    inputGroup.classList.contains('error') && inputGroup.classList.remove('error');

const buildUl = (keys) => {
    const items = keys.reduce((acc, key) => acc.concat(`<li>${key}=${db[key]}</li>`), '');
    return `<ul id="unordered-list">${items}</ul>`;
};

/****   onclick handlers ****/

// onclick handler for add button
add.onclick = (e) => {
    const input = document.getElementById("user-input");
    const inputText = input.value;
    if (regex.test(inputText)) {
        const keyValuePair = inputText.split("=");
        db[keyValuePair[0]] = keyValuePair[1];
        // resetting the value
        input.value = "";
        return ulParent.innerHTML = buildUl(Object.keys(db));
    }
    inputGroup.classList.add('error')
}

// onclick handler for sort by name
sortByName.onclick = () => ulParent.innerHTML = buildUl(Object.keys(db).sort());

// onclick handler for sort by value
sortByValue.onclick = () => {
    sortedByValue = Object.keys(db)
        .sort((a, b) => {
            if (db[a] < db[b]) return -1
            else if (db[a] > db[b]) return 1
            else return 0;
        });
    return ulParent.innerHTML = buildUl(sortedByValue);
}

// onclick handler for delete
deleteAll.onclick = () => {
    // assigning db to empty object
    db = {};
    return ulParent.innerHTML = buildUl([]);
}


// xml
parseAsXML.onclick = () => {
    document.getElementById("xml-data-holder").value = "";
    const doc = $.parseXML("<xml/>");
    const xml = doc.getElementsByTagName("xml")[0]
    for (key in db) {
        if (db.hasOwnProperty(key)) {
          elem = doc.createElement(key)
          $(elem).text(db[key])
          xml.appendChild(elem)
        }
    }
    document.getElementById("xml-data-holder").value = xml.outerHTML;
}