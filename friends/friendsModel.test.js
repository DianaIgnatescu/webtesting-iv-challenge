const db = require('../data/dbConfig.js');
const Friends = require('./friendsModel');

describe('friendsModel', () => {
  beforeEach(async () => {
    await db('friends').truncate().then(() => {
      Friends.insert({ name: 'Monica' });
    });
  });

  // afterEach(async () => {
  //   await db('friends').truncate();
  // });

  describe('getAll', () => {
    it('should return the list of friends', async () => {
      const friends = await Friends.getAll();
      expect(friends).toHaveLength(1);
    });
  });

  describe('insert', () => {
    it('should insert the given friend into the db', async () => {
      const friend = await Friends.insert({ name: 'Chandler' });
      const row = await db('friends');
      expect(friend.name).toBe('Chandler');
      expect(row).toHaveLength(2);
    });
    it('should insert the given friends into the db', async () => {
      await Friends.insert({ name: 'Joey' });
      await Friends.insert({ name: 'Ross' });

      const friendsList = await db('friends');
      expect(friendsList).toHaveLength(3);
    });
  });

  describe('delete', () => {
    it('should delete a given friend by its ID', async () => {
      const result = await Friends.remove(1);
      const row = await db('friends');
      expect(row).toHaveLength(0);
    });
    it('should return 0 if given friend ID could not be found', async () => {
      const expected = 0;
      const actual = await Friends.remove(2);
      expect(actual).toEqual(expected);
    });
  });
});
