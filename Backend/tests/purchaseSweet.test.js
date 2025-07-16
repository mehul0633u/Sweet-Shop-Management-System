const {
  addSweet,
  getAllSweets,
  purchaseSweet,
  clearInventory
} = require('../src/sweetShop');

describe('Sweet Shop - Purchase Sweets', () => {
  beforeEach(() => {
    clearInventory();

    addSweet({
      id: 4001,
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 20,
      quantity: 10
    });
  });

  test('should reduce quantity when a sweet is purchased', () => {
    purchaseSweet(4001, 3);
    const sweet = getAllSweets().find(s => s.id === 4001);
    expect(sweet.quantity).toBe(7); // 10 - 3
  });

  test('should throw error if quantity requested is more than in stock', () => {
    expect(() => purchaseSweet(4001, 15)).toThrow("Not enough stock available");
  });

  test('should throw error if sweet does not exist', () => {
    expect(() => purchaseSweet(9999, 2)).toThrow("Sweet not found");
  });
});
