import { getUser, signOut } from './services/auth-service.js';
import { getShoppingList, addItem, updateItem, deleteItem } from './services/client.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createBuildShoppingList from './components/buildShoppingList.js';
import createShoppingForm from './components/shoppingForm.js';

// State
import state from './state.js';

// Action Handlers
async function handlePageLoad() {
    state.user = getUser();
    protectPage(state.user);

    const { data, error } = await getShoppingList();

    if (error) {
        console.log(error);
    }
    else {
        state.shoppingList = data;
    }

    display();
}

async function handleAddItem(item, quantity) {
    const itemToAdd = {
        item: item,
        quantity: quantity,
        bought: false,
    };
    
    const { data, error } = await addItem(itemToAdd);
    if (error) {
        console.log(error);
    }
    else {
        state.shoppingList.push(data);
    }

    display();
}

async function handleUpdate(foodItem) {
    const dataToUpdate = {
        bought: foodItem.bought
    };
    const data = await updateItem(dataToUpdate);
    const index = state.shoppingList.indexOf(foodItem);
    state.shoppingList[index] = data;
}

async function handleDelete(foodItem) {
    const error = await deleteItem(foodItem);
    if (error) {
        console.log(error);
    }
    else {
        const index = state.shoppingList(foodItem);
        state.shoppingList.splice(index, 1);
    }
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const BuildShoppingList = createBuildShoppingList(document.querySelector('.shopping-list'), { 
    handleUpdate,
    handleDelete
});
const ShoppingForm = createShoppingForm(document.querySelector('.add-item'), { handleAddItem });

function display() {
    User({ user: state.user });
    ShoppingForm();
    BuildShoppingList({ shoppingList: state.shoppingList });
}

handlePageLoad();
