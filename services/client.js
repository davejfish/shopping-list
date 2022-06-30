const SUPABASE_URL = 'https://lbhcxvyspdaifxljifnq.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaGN4dnlzcGRhaWZ4bGppZm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY1NDE1OTYsImV4cCI6MTk3MjExNzU5Nn0.CYqr69yW5FRoOjB1MgOtYhQ3GS8oEGzFi8VF0D1tAKw';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function getShoppingList() {
    const response = await client
        .from('shopping-list')
        .select();
    return response;
}

export async function addItem({ item, quantity, bought, user_id }) {
    
    const response = await client
        .from('shopping-list')
        .insert({ item: item, quantity: quantity, bought: bought, user_id: user_id })
        .single();

    return response;
}

export async function updateItem(foodItem) {
    const response = await client
        .from('shopping-list')
        .update(foodItem)
        .match({ id: foodItem.id })
        .single();

    return response.data;
}

export async function deleteItem(foodItem) {
    const response = await client
        .from('shopping-list')
        .delete()
        .eq('id', `${foodItem.id}`)
        .single();

    return response;
}