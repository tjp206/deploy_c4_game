use c4
db.dropDatabase();

db.c4.insert([
    {
        name: 'John',
        wins: 3,
        draws: 1,
        losses: 1
    },
    {
        name: 'Steven',
        wins: 2,
        draws: 1,
        losses: 2
    },
    {
        name: 'TJ',
        wins: 2,
        draws: 2,
        losses: 1
    }
])