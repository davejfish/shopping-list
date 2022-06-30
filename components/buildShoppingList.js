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
            
            const item = document.createElement('h2');
            item.textContent = `${foodItem.item}: ${foodItem.quantity}`;
            item.addEventListener('click', () => {
                
                if (!foodItem.bought) {
                    foodItem.bought = true;
                }
                else {
                    foodItem.bought = false;
                }
                handleUpdate(foodItem);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => {
                handleDelete(foodItem);
            });

            li.append(item, deleteButton);
            root.append(li);
        }
    };
}