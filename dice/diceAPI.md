# Dice class API

This is Dice class for games. Dice holds the number of dots. The number of dots is between 1 and given upper bound (included). Tme maximum upper bound is 20. The minimum upper bound is 2.

If the dice hasn't been rolled, the number of dots is 0. After the dice has been rolled, the dot count can't become zero again.

## getters

### **dots**
returns the number of dots (dot count)

### **minimumValue**
returns the minimum number of dots. It should be 1.

### **maximumValue**
returns the upper bound of the dice

## Operations

### **constructor(upperBound)**

-   initializes the dice with upper bound passed as parameter
-   if no upperbound is given, the default will be 6
-   initializes the dot count to 0

-   if the upperBound is not a number and not an integer, throw an exception 
    `'upper bound must be an integer'`

-   if the upperBound is not between 2 and 20, an exception is thrown:
    -   upperBound > 20: `'upper bound too big'`
    -   upperBound < 2: `'upper bound too small'`

### methods

#### **roll()**
-   rolls the dice
-   when rolled, the dot count will become a ramdom number between 1 and 
    the upper bound (included)
-   return nothing  

#### **toString()**
-   returns dot count (dots) as text. Foe example `'4'`
-   if the dice hasn't been rolled yet, returns text `'not rolled yet'`
