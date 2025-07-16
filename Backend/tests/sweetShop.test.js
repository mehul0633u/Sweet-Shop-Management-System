const { addSweet, getAllSweets, clearInventory } = require('../src/sweetShop');

describe('Sweet Shop - Add Sweet', () => {

  beforeEach(() => {
    clearInventory();  // clear the list before each test
  });

  test('should add a sweet to the inventory', () => {
    const sweet = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    addSweet(sweet);
    const sweets = getAllSweets();

    expect(sweets.length).toBe(1);
    expect(sweets[0].id).toBe(1001);
    expect(sweets[0].name).toBe('Kaju Katli');
  });

});
