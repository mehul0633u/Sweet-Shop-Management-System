const { addSweet, getAllSweets, deleteSweet, clearInventory } = require('../src/sweetShop');

describe('Sweet Shop - Delete Sweet', () => {
  beforeEach(() => {
    clearInventory();
  });

  test('should delete a sweet by ID', () => {
    const sweet = {
      id: 2001,
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 30,
      quantity: 10
    };

    addSweet(sweet); // Add sweet
    expect(getAllSweets().length).toBe(1); // Confirm it's added

    deleteSweet(2001); // Try deleting
    const sweetsAfterDelete = getAllSweets();

    expect(sweetsAfterDelete.length).toBe(0); // Confirm it's gone
  });
});
