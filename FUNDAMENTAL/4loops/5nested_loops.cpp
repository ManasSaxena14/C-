/*
=========================================
PATTERN 1: NUMBER GRID
=========================================
*/
#include <iostream>
using namespace std;

int main() {
    int n = 4;

    // OUTER LOOP: Controls the number of rows. Runs 'n' (4) times.
    for (int i = 1; i <= n; i++) {          // rows
        // INNER LOOP: Controls the columns. Prints numbers 1 to 4 in each row.
        for (int j = 1; j <= n; j++) {      // columns
            cout << j << " ";
        }
        cout << endl;
    }

    return 0;
}
/*
📌 Output
1 2 3 4
1 2 3 4
1 2 3 4
1 2 3 4
🧠 Easy Understanding
Outer loop → controls rows (4 times)
Inner loop → prints 1 to 4 every time
*/

/*
=========================================
PATTERN 2: LETTER GRID
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;

    // OUTER LOOP: Controls the number of rows. Runs 'n' (4) times.
    for (int i = 1; i <= n; i++) {          // rows
        // INNER LOOP: Controls the columns. Prints characters A to D in each row.
        for (int j = 0; j < n; j++) {       // columns
            cout << char('A' + j) << " ";
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
A B C D
A B C D
A B C D
A B C D
🧠 Easy Understanding
'A' + j → converts number to letters
0 → A
1 → B
2 → C
3 → D
Inner loop prints A → D every row
Outer loop repeats rows
*/

/*
=========================================
PATTERN 3: CONTINUOUS NUMBER GRID
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 3;
    int num = 1;

    // OUTER LOOP: Controls the number of rows. Runs 'n' (3) times.
    for (int i = 1; i <= n; i++) {          // rows
        // INNER LOOP: Controls the columns. Prints and increments 'num' each time.
        for (int j = 1; j <= n; j++) {      // columns
            cout << num << " ";
            num++;                         // increase number
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
1 2 3
4 5 6
7 8 9
🧠 Easy Understanding
Start with num = 1
Print number → then increase (num++)
Keeps filling left → right → top → bottom
*/

/*
=========================================
--> TRIANGLE PATTERNS
=========================================
*/

/*
=========================================
PATTERN 4: STAR TRIANGLE
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;

    // OUTER LOOP: Controls the rows. Runs from 1 to 'n' (4).
    for (int i = 1; i <= n; i++) {      // rows
        // INNER LOOP: Controls the columns. Prints '*' 'i' times for each row.
        for (int j = 1; j <= i; j++) {  // columns (increase each row)
            cout << "* ";
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
* 
* * 
* * * 
* * * * 
🧠 Easy Understanding
Row 1 → 1 star
Row 2 → 2 stars
Row 3 → 3 stars
Row 4 → 4 stars
👉 Inner loop depends on i → that’s the key pattern logic
*/

/*
=========================================
PATTERN 5: NUMBER TRIANGLE
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 5;

    // OUTER LOOP: Controls the rows. Runs from 0 to 'n-1' (5 times).
    for (int i = 0; i < n; i++) {          // rows
        // INNER LOOP: Controls the columns. Prints from 1 to 'i+1' for each row.
        for (int j = 1; j <= i + 1; j++) { // columns
            cout << j << " ";
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 OUTPUT
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
*/

/*
=========================================
PATTERN 6: REVERSE NUMBER TRIANGLE
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;

    // OUTER LOOP: Controls the rows. Runs from 1 to 'n' (4).
    for (int i = 1; i <= n; i++) {        // rows
        // INNER LOOP: Controls the columns. Prints numbers backward from 'i' down to 1.
        for (int j = i; j >= 1; j--) {    // reverse numbers
            cout << j << " ";
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
1
2 1
3 2 1
4 3 2 1
🧠 Logic (3 Points Only)
Rows go from 1 → n
Inner loop runs reverse from i → 1
Print j → gives decreasing numbers
*/

/*
=========================================
PATTERN 7: CONTINUOUS NUMBER TRIANGLE
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;
    int num = 1;

    // OUTER LOOP: Controls the rows. Runs from 1 to 'n' (4).
    for (int i = 1; i <= n; i++) {        // rows
        // INNER LOOP: Controls the columns. Prints and increments 'num' 'i' times per row.
        for (int j = 1; j <= i; j++) {    // columns
            cout << num << " ";
            num++;                       // increase continuously
        }
        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
1
2 3
4 5 6
7 8 9 10
🧠 Logic (3 Points Only)
Rows increase → 1 to n
Columns per row = i
Use num++ → continuous counting
*/

/*
=========================================
PATTERN 8: CENTERED NUMBER PYRAMID
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;

    // OUTER LOOP: Controls the rows. Runs from 1 to 'n' (4).
    for (int i = 1; i <= n; i++) {

        // FIRST INNER LOOP: Prints spaces for alignment. Runs 'n - i' times.
        // spaces (for alignment)
        for (int s = 1; s <= n - i; s++) {
            cout << "  ";
        }

        // SECOND INNER LOOP: Prints increasing numbers from 1 to 'i'.
        // increasing numbers
        for (int j = 1; j <= i; j++) {
            cout << j << " ";
        }

        // THIRD INNER LOOP: Prints decreasing numbers from 'i-1' down to 1.
        // decreasing numbers
        for (int j = i - 1; j >= 1; j--) {
            cout << j << " ";
        }

        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
      1 
    1 2 1 
  1 2 3 2 1 
1 2 3 4 3 2 1 
🧠 Logic (5 Points)
Add spaces = (n - i) for centering
Each space uses " " (double space for alignment)
Print increasing 1 → i
Then decreasing i-1 → 1
Shape becomes centered pyramid
*/

/*
=========================================
PATTERN 9: HOLLOW DIAMOND
=========================================
*/
#include <iostream>
using namespace std;

// NOTE: To run this pattern, uncomment this main function and comment the others
/*
int main() {
    int n = 4;

    // UPPER HALF ===============================
    // OUTER LOOP (UPPER): Controls the top half rows. Runs from 1 to 'n' (4).
    for (int i = 1; i <= n; i++) {

        // INNER LOOP 1: Prints spaces for alignment. Runs 'n - i' times.
        // spaces
        for (int s = 1; s <= n - i; s++) {
            cout << " ";
        }

        // INNER LOOP 2: Prints stars at the edges and spaces inside. Runs '2*i - 1' times.
        // stars (hollow logic)
        for (int j = 1; j <= 2*i - 1; j++) {
            if (j == 1 || j == 2*i - 1)
                cout << "*";
            else
                cout << " ";
        }

        cout << endl;
    }

    // LOWER HALF ===============================
    // OUTER LOOP (LOWER): Controls the bottom half rows. Runs from 'n-1' down to 1.
    for (int i = n - 1; i >= 1; i--) {

        // INNER LOOP 1: Prints spaces for alignment. Runs 'n - i' times.
        // spaces
        for (int s = 1; s <= n - i; s++) {
            cout << " ";
        }

        // INNER LOOP 2: Prints stars at the edges and spaces inside. Runs '2*i - 1' times.
        // stars (hollow logic)
        for (int j = 1; j <= 2*i - 1; j++) {
            if (j == 1 || j == 2*i - 1)
                cout << "*";
            else
                cout << " ";
        }

        cout << endl;
    }

    return 0;
}
*/
/*
📌 Output
   *
  * *
 *   *
*     *
 *   *
  * *
   *
🧠 Logic (5 Points)
Diamond = upper pyramid + lower inverted pyramid
Spaces = (n - i) for alignment
Stars count = (2*i - 1)
Print * only at edges (first & last)
Inside → print spaces → makes it hollow
⚡ KEY FORMULA (VERY IMPORTANT)
👉 2*i - 1 → gives width of each row
*/
