// Calculates the length of the Longest Common Subsequence (LCS)
// of two strings s1 and s2.
int longestCommonSubsequence(string s1, string s2) {
    int m = s1.length();
    int n = s2.length();

    if (m == 0 || n == 0) {
        return 0;
    }

    // dp[i][j] will store the length of LCS of s1[0...i-1] and s2[0...j-1]
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (s1[i - 1] == s2[j - 1]) {
                // If characters match, LCS length is 1 + LCS of previous substrings
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // If characters don't match, LCS is the max of:
                // 1. LCS of s1[0...i-2] and s2[0...j-1]
                // 2. LCS of s1[0...i-1] and s2[0...j-2]
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// Function to reconstruct one of the LCS strings
// (Can be modified to return all LCS if needed, but becomes more complex)
string getLCSString(string s1, string s2, const vector<vector<int>>& dp) {
    int i = s1.length();
    int j = s2.length();
    string lcs_str = "";

    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            lcs_str = s1[i - 1] + lcs_str;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    return lcs_str;
}

// Helper to get both length and one LCS string
pair<int, string> findLCS(string s1, string s2) {
    int m = s1.length();
    int n = s2.length();
    if (m == 0 || n == 0) return {0, ""};

    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    string lcs_string_val = getLCSString(s1, s2, dp);
    return {dp[m][n], lcs_string_val};
}