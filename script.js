const linkedListContainer = document.getElementById('linked-list-container');
const headPointer = document.getElementById('head-pointer');
let linkedList = [];

async function addBegin() {
    const value = document.getElementById('value').value;
    if (value) {
        linkedList.unshift(value);
        await animateAddOrDelete('add', 0);
        updateLinkedList();
        document.getElementById('value').value = '';
    }
}

async function addEnd() {
    const value = document.getElementById('value').value;
    if (value) {
        linkedList.push(value);
        await animateAddOrDelete('add', linkedList.length - 1);
        updateLinkedList();
        document.getElementById('value').value = '';
    }
}

async function addAtPosition() {
    const value = document.getElementById('value').value;
    const position = parseInt(document.getElementById('position').value, 10);
    if (value && position >= 0 && position <= linkedList.length) {
        linkedList.splice(position, 0, value);
        await animateAddOrDelete('add', position);
        updateLinkedList();
        document.getElementById('value').value = '';
        document.getElementById('position').value = '';
    }
}

async function deleteFront() {
    if (linkedList.length > 0) {
        await animateAddOrDelete('delete', 0);
        linkedList.shift();
        updateLinkedList();
    }
}

async function deleteLast() {
    if (linkedList.length > 0) {
        await animateAddOrDelete('delete', linkedList.length - 1);
        linkedList.pop();
        updateLinkedList();
    }
}

async function deleteAtPosition() {
    const position = parseInt(document.getElementById('position').value, 10);
    if (position >= 0 && position < linkedList.length) {
        await animateAddOrDelete('delete', position);
        linkedList.splice(position, 1);
        updateLinkedList();
        document.getElementById('position').value = '';
    }
}
async function findElement() {
    const value = document.getElementById('value').value;
    if (value) {
        let found = false;
        for (let i = 0; i < linkedList.length; i++) {
            const node = linkedListContainer.children[i];
            node.classList.add('highlight');
            await delay(500); // Highlight each node for 500ms
            console.log(`Checking node ${i}:`, linkedList[i]);
            console.log(`Value at node ${i}:`, linkedList[i]);
            console.log(`Value to find:`, value);
            if (linkedList[i] === value) {
                found = true;
                console.log(`Element found at node ${i}`);
            }
            node.classList.remove('highlight');
        }
        if (found) {
            alert(`Element found.`);
        } else {
            alert('Element not found');
        }
        document.getElementById('value').value = '';
    }
}


async function traverseLinkedList() {
    for (let i = 0; i < linkedList.length; i++) {
        const node = linkedListContainer.children[i];
        node.classList.add('highlight');
        await delay(500); // Highlight each node for 500ms
        node.classList.remove('highlight');
    }
}

async function findAllPositions() {
    const value = document.getElementById('value').value;
    if (value) {
        const positions = [];
        for (let i = 0; i < linkedList.length; i++) {
            if (linkedList[i] === value) {
                positions.push(i);
            }
        }
        if (positions.length > 0) {
            alert(`Element found at positions: ${positions.join(', ')}`);
        } else {
            alert('Element not found');
        }
        document.getElementById('value').value = '';
    }
}

function updateLinkedList() {
    linkedListContainer.innerHTML = '';
    linkedList.forEach((value, index) => {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = value;
        if (index === linkedList.length - 1) {
            node.style.marginRight = '0';
            node.style['::after'] = 'none'; // Remove arrow for the last node
        }
        linkedListContainer.appendChild(node);
    });
    updatePointer();
}

function updatePointer() {
    if (linkedList.length > 0) {
        headPointer.style.display = 'block';
        const firstElement = linkedListContainer.children[0];
        headPointer.style.left = `${firstElement.offsetLeft + firstElement.offsetWidth / 2}px`;
    } else {
        headPointer.style.display = 'none';
    }
}

async function animateAddOrDelete(action, index) {
    if (action === 'add') {
        for (let i = 0; i <= index; i++) {
            const node = linkedListContainer.children[i];
            if (node) {
                node.classList.add('highlight');
                await delay(200);
                node.classList.remove('highlight');
            }
        }
    } else if (action === 'delete') {
        const node = linkedListContainer.children[index];
        if (node) {
            node.classList.add('highlight-delete');
            await delay(500);
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
