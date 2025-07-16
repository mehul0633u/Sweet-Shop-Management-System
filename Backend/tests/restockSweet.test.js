const {
  addSweet,
  getAllSweets,
  restockSweet,
  clearInventory
} = require('../src/sweetShop');

describe('Sweet Shop - Restock Sweets', () => {
  beforeEach(() => {
    clearInventory();

    addSweet({
      id: 5001,
      name: 'Rasgulla',
      category: 'Milk-Based',
      price: 25,
      quantity: 10
    });
  });

  test('should increase quantity when sweet is restocked', () => {
    restockSweet(5001, 5);
    const sweet = getAllSweets().find(s => s.id === 5001);
    expect(sweet.quantity).toBe(15); // 10 + 5
  });

  test('should throw error if sweet does not exist', () => {
    expect(() => restockSweet(9999, 10)).toThrow("Sweet not found");
  });
});
