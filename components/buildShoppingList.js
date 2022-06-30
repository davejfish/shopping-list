export default function createBuildShoppingList(root, { handleUpdate, handleDelete }) {

    return ({ shoppingList }) => {
        root.innerHTML = '';
        for (let foodItem of shoppingList) {
            
            const li = document.createElement('li');
            
            const item = document.createElement('h2');
            item.textContent = `${foodItem.item}: ${foodItem.quantity}`;
            item.addEventListener('click', () => {
                handleUpdate(foodItem);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => {
                handleDelete(foodItem);
            });

            if (foodItem.bought) {
                item.classList.add('bought');
            }
            else {
                item.classList.value = '';
            }

            li.append(item, deleteButton);
            root.append(li);

        }
    };
}