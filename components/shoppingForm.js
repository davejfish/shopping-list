export default function createShoppingForm(form, { handleAddItem }) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        // const data = {
        //     item: formData.get('food'),
        //     quantity: formData.get('quantity')
        // };
        
        await handleAddItem(formData.get('food'), formData.get('quantity'));

        form.reset();
    });
    
    return () => {

    };
}