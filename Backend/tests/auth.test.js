

describe('Auth API', () => {

  beforeAll(async () => {
    // Connect to test DB if needed
    await mongoose.connect('mongodb://localhost:27017/sweetshop_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany(); // clean up after each test
  });

  test('should register a new user', async () => {
    const res = await request(app).post('/register').send({
      username: 'test_user',
      email: 'test@example.com',
      password: 'test123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result.username).toBe('test_user');
    expect(res.body.result.email).toBe('test@example.com');
    expect(res.body.result).not.toHaveProperty('password'); // password must not be exposed
  });

  test('should login a registered user', async () => {
    // First register the user
    await request(app).post('/register').send({
      username: 'login_user',
      email: 'login@example.com',
      password: 'login123'
    });

    // Then try to login
    const res = await request(app).post('/login').send({
      email: 'login@example.com',
      password: 'login123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result.email).toBe('login@example.com');
  });

  test('should return error if login fails', async () => {
    const res = await request(app).post('/login').send({
      email: 'no_user@example.com',
      password: 'wrongpass'
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("No User Found");
  });
});
