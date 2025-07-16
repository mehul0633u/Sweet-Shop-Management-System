
//using chatgpt AI
const { addSweet, getAllSweets, clearInventory } = require('../src/sweetShop');

describe('Sweet Shop - View Sweets', () => {
  beforeEach(() => {
    clearInventory();
  });

  test('should return all sweets in the inventory', () => {
    const sweet1 = {
      id: 3001,
      name: 'Ladoo',
      category: 'Nut-Based',
      price: 20,
      quantity: 25
    };

    const sweet2 = {
      id: 3002,
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 10,
      quantity: 50
    };

    addSweet(sweet1);
    addSweet(sweet2);

    const sweets = getAllSweets();

    expect(sweets.length).toBe(2);
    expect(sweets[0].name).toBe('Ladoo');
    expect(sweets[1].name).toBe('Chocolate Bar');
  });
});
