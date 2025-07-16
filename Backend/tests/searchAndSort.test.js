const {
  addSweet,
  getAllSweets,
  searchSweets,
  sortSweets
} = require('../src/sweetShop');

describe('Sweet Shop - Search & Sort', () => {
  beforeEach(() => {
    clearInventory();

    addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    addSweet({ id: 2, name: 'Rasgulla', category: 'Milk-Based', price: 30, quantity: 40 });
    addSweet({ id: 3, name: 'Chocolate Bar', category: 'Chocolate', price: 20, quantity: 50 });
  });

  //  Search by name
  test('should return sweets matching name', () => {
    const result = searchSweets({ name: 'Rasgulla' });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Rasgulla');
  });

  //  Search by category
  test('should return sweets in a category', () => {
    const result = searchSweets({ category: 'Chocolate' });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Chocolate Bar');
  });

  //  Search by price range
  test('should return sweets within price range', () => {
    const result = searchSweets({ minPrice: 25, maxPrice: 50 });
    expect(result.length).toBe(2);
  });

  //  Sort by price ascending
  test('should sort sweets by price ascending', () => {
    const result = sortSweets('price', 'asc');
    expect(result[0].price).toBe(20);
    expect(result[2].price).toBe(50);
  });

  //  Sort by name descending
  test('should sort sweets by name descending', () => {
    const result = sortSweets('name', 'desc');
    expect(result[0].name).toBe('Rasgulla');
    expect(result[2].name).toBe('Chocolate Bar');
  });
});
