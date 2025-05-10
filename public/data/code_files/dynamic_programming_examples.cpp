General Template Idea for Dynamic Programming (Bottom-Up / Tabulation)

ResultType solveDP(ProblemInput input) {
    1. Identify DP states: What parameters define a subproblem?
        e.g., dp[i], dp[i][j], dp[mask], etc.

    2. Define DP table: Create a data structure (array, matrix) to store results of subproblems.
        Initialize with base cases or special values (e.g., 0, -1, infinity).
        vector<vector<StateType>> dp(size1, vector<StateType>(size2, initial_value));

    3. Determine transition/recurrence relation: How to solve a larger subproblem
        using solutions of smaller subproblems.
        dp[i][j] = calculate_based_on(dp[i-1][j], dp[i][j-1], dp[i-1][j-1], input[i], etc.);

     4. Determine iteration order: Ensure that when calculating dp[state],
        the subproblems it depends on have already been computed.
        Typically involves nested loops.
        for (i from base_case_i to ...) {
            for (j from base_case_j to ...) {
                dp[i][j] = ...  Apply recurrence
            }
        }

     5. The final answer is usually in one of the dp table entries, e.g., dp[n][W].
    return dp[final_state_param1][final_state_param2];
}

 General Template Idea for Dynamic Programming (Top-Down / Memoization)
 StateType memo[MAX_SIZE1][MAX_SIZE2]; // Memoization table, initialized to a special value (e.g., -1)

ResultType solveDPMemo(CurrentInputState currentState) {
    1. Base Case(s): If current state is a base case, return its value.
    if (isBaseCase(currentState)) {
        return baseValue(currentState);
    }

     2. Memoization Check: If already computed, return stored value.
     if (memo[currentState.param1][currentState.param2] != UNCOMPUTED_VALUE) {
        return memo[currentState.param1][currentState.param2];
     }

     3. Recurrence Relation: Compute the solution for the current state by
        making recursive calls for subproblems.
     ResultType result = calculate_based_on(solveDPMemo(nextState1), solveDPMemo(nextState2), ...);

     4. Store and Return: Store the computed result in the memo table and return it.
     memo[currentState.param1][currentState.param2] = result;
     return result;
}

 -----------------------------

// Simple Example: 0/1 Knapsack Problem
// Given weights and values of n items, put these items in a knapsack of capacity W
// to get the maximum total value in the knapsack. You cannot break an item.
int knapsack01(int W, const vector<int>& weights, const vector<int>& values) {
    int n = weights.size();
    if (n == 0 || W == 0) {
        return 0;
    }

    // dp[i][w] will be storing the maximum value that can be obtained
    // using items from 0 to i-1 with a knapsack capacity of w.
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    // Build table dp[][] in bottom-up manner
    for (int i = 1; i <= n; ++i) { // Iterate over items
        for (int w = 1; w <= W; ++w) { // Iterate over knapsack capacities
            // If the current item's weight (weights[i-1]) is less than or equal to current capacity w
            if (weights[i - 1] <= w) {
                // Option 1: Include the current item
                // Value = values[i-1] + max value from remaining capacity (w - weights[i-1]) using previous items
                int include_item = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                // Option 2: Exclude the current item
                // Value = max value without this item using previous items and same capacity
                int exclude_item = dp[i - 1][w];
                dp[i][w] = max(include_item, exclude_item);
            } else {
                // If current item's weight is more than capacity w, it cannot be included
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}
/*
Example Usage for knapsack01:
vector<int> val = {60, 100, 120};
vector<int> wt = {10, 20, 30};
int capacity = 50;
int max_value = knapsack01(capacity, wt, val); // max_value should be 220 (items with value 100 and 120)
*/

// -----------------------------

// Complicated Example: Coin Change (Minimum coins)
// Given an array of coin denominations and a target amount, find the minimum
// number of coins needed to make up that amount. Assume infinite supply of coins.
// Assumes 'vector', 'min', 'numeric_limits' (for infinity) are available.
int coinChangeMinCoins(const vector<int>& coins, int amount) {
    if (amount < 0) return -1; // Or handle as error
    if (amount == 0) return 0;

    // dp[i] will be storing the minimum number of coins required for amount i.
    // Initialize dp values with a value greater than any possible number of coins (e.g., amount + 1 or infinity).
    // amount + 1 is a good "infinity" because we can't use more than 'amount' coins of denomination 1.
    vector<int> dp(amount + 1, amount + 1);

    // Base case: 0 coins are needed to make amount 0
    dp[0] = 0;

    // Iterate through all amounts from 1 to target amount
    for (int i = 1; i <= amount; ++i) {
        // For each amount, iterate through all coin denominations
        for (int coin : coins) {
            if (coin <= i) {
                // If the current coin can be used (i.e., coin <= current amount i)
                // dp[i] = min(current dp[i], 1 + dp[i - coin])
                // 1 (for the current coin) + minimum coins for remaining amount (i - coin)
                if (dp[i - coin] != amount + 1) { // Check if dp[i-coin] is reachable
                   dp[i] = min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
    }

    // If dp[amount] is still amount + 1, it means the amount cannot be formed by any combination of coins.
    return (dp[amount] > amount) ? -1 : dp[amount];
}
/*
Example Usage for coinChangeMinCoins:
vector<int> c = {1, 2, 5};
int amt = 11;
int min_coins = coinChangeMinCoins(c, amt); // min_coins should be 3 (e.g., 5 + 5 + 1)

vector<int> c2 = {2};
int amt2 = 3;
min_coins = coinChangeMinCoins(c2, amt2); // min_coins should be -1 (cannot make 3 with only 2s)
*/