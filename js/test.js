let elementNode = document.createElement('li');
let textNode = document.createTextNode('1');
elementNode.appendChild(textNode);  // <li>1</li>

let ul = document.querySelector('ul');
ul.insertBefore(elementNode, ul.firstChild);

console.log(document.body.innerHTML);