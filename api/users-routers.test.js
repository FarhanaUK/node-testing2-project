const request = require('supertest');
const server = require('./server'); // Update this to the path to your server file
const db = require('../data/db-config'); // Update this to the path to your db configuration
const users = require('./users-router')
//Clean and seed the database before each test
beforeAll(async () => {
  await db.seed.run();
});

// Close the database connection after all tests
afterAll(async () => {
  await db.destroy();
});

describe("GET /", () => {
  test("returns all users", async () => {
    const response = await request(server).get('/api/users');
    const expected = [{
      user_id: 1, 
      username: 'bob', 
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq"
    },
    {
      user_id: 2, 
      username: 'sue', 
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq"
    }
  
  ];
    expect(response.body).toEqual(expected);
    
    
  });

  test("returns an empty array if no users are in the database", async () => {
    await db('users').truncate();
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});


describe('GET /:ID', () => {
  test('should return user by ID', async () => {
    // Arrange: Send a GET request
    const user = await request(server).get('/api/users/1');
    
    // Expected response without the password field
    const expected = {
      user_id: 1, 
      username: 'bob', 
      // Omit password here or mock the password handling
    };
    
    // Act & Assert: Check if the returned user matches expected
    expect(user).toMatchObject(expected);
  });

  test('should return 404 if user does not exist', async () => {
    const user = await request(server).get('/api/users/999'); // Assuming 999 does not exist
    expect(user.status).toBe(404); // Expect 404 for a non-existent user
    expect(user.body.message).toBe('User not found');
  });

  test('should handle errors properly', async () => {
    // Simulate a server/database error
    const user = await request(server).get('/api/users/1');
    expect(user.status).toBe(500);
    expect(user.body.message).toBe('Internal Server Error');
  });
});

describe( 'First test', () => {
test('[0] sanity', () => {
  expect(3).toBe(3)
})
})