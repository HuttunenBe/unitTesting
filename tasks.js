function add (a, b) {
    return a + b;
}

test ('2 + 3 = 5', () => {
    expect(add(2,3)).toBe(5);
})

test ('5 - 3 = 2', () => {
    expect(sub(5,3)).toBe(2);
})

function concat (a, b) {
    return a + b;
}

test('"Hi" + " there" = "Hi there"', () => {
    expect(concat('Hi',' there')).toBe('Hi there');
});

function createArray () {
    return [1,2,3];
}

test ('array lenght is 3', () => {
    expect(createArray().length.toBe(3))
})

function fruits() {
    return ['apple','banana','orange'];
}

test('array contains banana', () => {
    expect(fruits()).toContain('banana');
});

function fail () {
    throw new Error('fail')
}

test('throw error', () => {
    expect(() => fail()).toThrow('fail')
})

const testValues = [
    [1,2,3],
    [2,3,5],
    [3,4,7]
];

test.each(testValues)('%i + %i = %i', (a,b,result) => {
    expect(a+b).toBe(result);
});




test('first test', () => {
    console.log('first test');
});


test('second test'), () => {
    console.log('second test')
}


beforeAll(() => {
    console.log('before All tests');
});


afterAll(() => {
    console.log("after all")
})




describe('adding tests', () => {

   
    test('test 2+2=4', () => {
      
        expect(2 + 2).toBe(4);
    });

    it('test 1+3=4', () => {
        expect(1 + 3).toBe(4);
    });
});

describe()


