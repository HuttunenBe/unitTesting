# Dice testcases

## test the constructor

### 1. Create a dice with no upper bound given

Initializes a dice with minimumValue 1, maximumValue 6 and dots 0

```js
const dice=new Dice();
```
Expect:
-   minimumValue 1
-   maximumValue 6
-   dots 0

### 2. Create a dice with upper bounds 2-20

Expect:
-   minimumValue 1
-   maximumValue upperBound
-   dots 0

### 3. Test the exceptions

create a dice with upperBound:
-   'a' throws `'upper bound must be an integer'`
-   '1'
-   2.5
-   null
-   true
-   false

-   1 throws `'upper bound too small'`
-   0 throws `'upper bound too small'`
-   -1 throws `'upper bound too small'`
-   -12 throws `'upper bound too small'`

-   21 throws `'upper bound too big'`

## Testing the roll

## 4. Create a dice with no upper bound given
(upper bound defaulted to 6)
roll the dice

Expect:
dots to be <=6
and dots >=1

(this should be repeated multiple times. To be checked later...)

## 5. Create a dice with upperBounds 2...20

roll the dice

Expect:
dots to be <=upperBound
and dots >=1

(this should be repeated multiple times. To be checked later...)

## Test the toString

Test with not rolled and rolled

In both cases create a new dice (here default upper bound 6)

1.  roll the dice

    -   expect to return dots as text. Compare it with dots casted as string.

2.  not rolled

    -   expect to return 'not rolled yet'