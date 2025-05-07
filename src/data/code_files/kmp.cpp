// Computes the Longest Proper Prefix Suffix (LPS) array for the pattern.
// A proper prefix is not the whole string. A proper suffix is not the whole string.
// lps[i] = length of the longest proper prefix of pattern[0...i]
//          which is also a suffix of pattern[0...i].
vector<int> computeLPSArray(const string& pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    int length = 0; // Length of the previous longest prefix suffix
    int i = 1;

    // lps[0] is always 0, so we start from i = 1
    while (i < m) {
        if (pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else { // (pattern[i] != pattern[length])
            if (length != 0) {
                // This is tricky. Consider the example.
                // AAACAAAA and i = 7. The idea is similar
                // to search step in KMP.
                length = lps[length - 1];
                // Also, note that we do not increment i here
            } else { // if (length == 0)
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// KMP string searching algorithm
// Returns a vector of all 0-indexed starting positions of `pattern` in `text`.
vector<int> kmpSearch(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();
    vector<int> occurrences;

    if (m == 0 || n == 0 || m > n) {
        return occurrences; // Empty pattern, empty text, or pattern longer than text
    }

    vector<int> lps = computeLPSArray(pattern);

    int i = 0; // Index for text[]
    int j = 0; // Index for pattern[]
    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }

        if (j == m) { // Found pattern at index i-j
            occurrences.push_back(i - j);
            j = lps[j - 1]; // Continue searching for other occurrences
        } else if (i < n && pattern[j] != text[i]) { // Mismatch after j matches
            // Do not match lps[0...lps[j-1]] characters,
            // they will match anyway.
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }
    return occurrences;
}

/*
Example Usage for kmpSearch:
string txt = "ABABDABACDABABCABAB";
string pat = "ABABCABAB";
vector<int> result_indices = kmpSearch(txt, pat);
// result_indices should contain {10}

string txt2 = "AAAAABAAABA";
string pat2 = "AAAA";
vector<int> result_indices2 = kmpSearch(txt2, pat2);
// result_indices2 should contain {0, 1, 6} (overlapping matches)

string txt3 = "THIS IS A TEST TEXT";
string pat3 = "TEST";
vector<int> result_indices3 = kmpSearch(txt3, pat3);
// result_indices3 should contain {10}
*/