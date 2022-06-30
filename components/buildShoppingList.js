export default function createBuildShoppingList(root, { handleUpdate, handleDelete }) {

    return ({ shoppingList }) => {
        root.innerHTML = '';
        for (let foodItem of shoppingList) {
            
            const li = document.createElement('li');

            if (foodItem.bought) {
                li.setAttribute('id', 'bought');
            }
            if (!foodItem.bought) {
                li.setAttribute('id', '');
            }

            const editItem = document.createElement('input');
            editItem.value = foodItem.item;
            editItem.classList.add('hidden');
            editItem.classList.add('editItem');
            editItem.addEventListener('change', () => {
                foodItem.item = editItem.value;
                handleUpdate(foodItem);
            });
            
            const item = document.createElement('h2');
            item.textContent = `${foodItem.item}`;
            item.addEventListener('dblclick', () => {
                editItem.classList.remove('hidden');
                editItem.focus();
            });

            const editNumber = document.createElement('input');
            editNumber.type = 'number';
            editNumber.min = '0';
            editNumber.classList.add('hidden');
            editNumber.classList.add('editItem');
            editNumber.value = foodItem.quantity;
            editNumber.addEventListener('change', () => {
                if (editNumber.value <= 0) {
                    alert('Please enter a number higher than 0');
                    return;
                }
                foodItem.quantity = editNumber.value;
                handleUpdate(foodItem);
            });

            const number = document.createElement('h2');
            number.textContent = foodItem.quantity;
            number.addEventListener('dblclick', () => {
                editNumber.classList.remove('hidden');
                editNumber.focus();
            });

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = foodItem.bought;

            checkbox.addEventListener('change', () => {
                foodItem.bought = checkbox.checked;
                handleUpdate(foodItem);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => {
                handleDelete(foodItem);
            });

            li.append(item, number, checkbox, deleteButton, editItem, editNumber);
            root.append(li);
        }
    };
}