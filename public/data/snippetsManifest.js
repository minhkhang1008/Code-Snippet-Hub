var snippetsManifest = [
    {
        id: '1', 
        title: 'Chuyển đổi hệ cơ số 10 sang hệ cơ số b', 
        filePath: '../public/data/code_files/conversion.cpp', 
        language: 'cpp', 
        description: 'Hàm này chuyển đổi một số nguyên `n` từ hệ cơ số 10 sang một chuỗi biểu diễn số đó trong hệ cơ số `b`. Hỗ trợ các hệ cơ số từ 2 đến 36.', 
        tags: ['Algorithms', 'Base Conversion', 'String Manipulation', 'Math'], 
        perceivedComplexity: 4,
        dateCreated: '2025-05-06', 
        lastUpdated: '2025-05-07', 
        explanation: { 
            logic: 'Sử dụng giải thuật chia lấy dư liên tục. Trong mỗi bước, lấy `n` chia cho `b`, phần dư `r` là chữ số tiếp theo. Nếu `r < 10`, chữ số là `0-9`. Nếu `r >= 10`, chữ số là `A-Z`. Cập nhật `n = n / b`. Lặp lại cho đến khi `n = 0`. Kết quả được đảo ngược vì các chữ số được tạo ra từ phải sang trái. Xử lý số âm và trường hợp `n=0`.',
            useCases: 'Chuyển đổi số giữa các hệ cơ số, ví dụ: hiển thị địa chỉ bộ nhớ (hex), biểu diễn nhị phân, mã hóa dữ liệu.',
            complexity: 'Time: O(log_b n) - số lần lặp phụ thuộc vào số chữ số của `n` trong hệ cơ số `b`. Space: O(log_b n) - để lưu trữ chuỗi kết quả.'
        }
    },
    {
        id: '2',
        title: 'Tính Giai Thừa (Factorial)',
        filePath: '../public/data/code_files/factorial.cpp', 
        language: 'cpp',
        description: 'Hàm tính giai thừa của một số nguyên không âm `n`. Giai thừa của `n` (ký hiệu `n!`) là tích của tất cả các số nguyên dương từ 1 đến `n`.',
        tags: ['Algorithms', 'Math', 'Iterative'],
        perceivedComplexity: 1,
        dateCreated: '2025-05-01',
        lastUpdated: '2025-05-05',
        explanation: {
            logic: 'Sử dụng một vòng lặp để nhân dồn các số từ 2 đến `n`. Trường hợp cơ sở là `0! = 1` và `1! = 1`. Xử lý đầu vào âm và đầu vào quá lớn (gây tràn số `long long`) bằng cách ném ngoại lệ.',
            useCases: 'Các bài toán tổ hợp, xác suất, và trong nhiều thuật toán khác.',
            complexity: 'Time: O(n) - vòng lặp chạy `n` lần. Space: O(1) - sử dụng một vài biến lưu trữ.'
        }
    },
    {
        id: '3', 
        title: 'Binary Search',
        filePath: '../public/data/code_files/binary_search.cpp', 
        language: 'cpp',
        description: 'Hàm tìm kiếm một phần tử `target` trong một mảng `arr` đã được sắp xếp. Trả về chỉ số của phần tử nếu tìm thấy, ngược lại trả về -1.',
        tags: ['Algorithms', 'Searching', 'Divide and Conquer'],
        perceivedComplexity: 3,
        dateCreated: '2025-05-08', 
        lastUpdated: '2025-05-08', 
        explanation: {
            logic: 'Thuật toán tìm kiếm nhị phân hoạt động trên một mảng đã sắp xếp. Nó liên tục chia đôi khoảng tìm kiếm. So sánh phần tử ở giữa với `target`. Nếu bằng nhau, tìm thấy. Nếu `target` nhỏ hơn, tìm kiếm ở nửa bên trái. Nếu `target` lớn hơn, tìm kiếm ở nửa bên phải. Lặp lại cho đến khi tìm thấy hoặc khoảng tìm kiếm rỗng.',
            useCases: 'Hiệu quả để tìm kiếm trong các tập dữ liệu lớn đã được sắp xếp, ví dụ: tìm một từ trong từ điển, kiểm tra sự tồn tại của một giá trị trong cơ sở dữ liệu đã được đánh chỉ mục theo giá trị đó.',
            complexity: 'Time: O(log n) - vì mỗi bước chia đôi không gian tìm kiếm. Space: O(1) - đối với phiên bản lặp (iterative), O(log n) cho phiên bản đệ quy (do call stack).'
        }
    },
    {
        id: '4', 
        title: 'Depth First Search (DFS) with Examples',
        filePath: '../public/data/code_files/dfs_examples.cpp', 
        language: 'cpp',
        description: 'Thực hiện thuật toán Tìm kiếm theo chiều sâu (DFS) trên đồ thị. Bao gồm một template cơ bản, một ví dụ đơn giản về kiểm tra tính liên thông, và một ví dụ phức tạp hơn về tìm chu trình trong đồ thị vô hướng.',
        tags: ['Algorithms', 'Graph Theory', 'DFS', 'Recursion', 'Connectivity', 'Cycle Detection'],
        perceivedComplexity: 6,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'DFS khám phá đồ thị bằng cách đi sâu nhất có thể dọc theo mỗi nhánh trước khi quay lui. Nó sử dụng một stack (ngầm định qua đệ quy hoặc tường minh) để theo dõi các đỉnh cần thăm. Một mảng `visited` được dùng để tránh thăm lại các đỉnh đã thăm và tránh vòng lặp vô hạn.\n\nTemplate DFS:\nCung cấp một hàm `dfs_template` nhận vào đỉnh hiện tại `u`, danh sách kề `adj`, mảng `visited`, và một hàm `process_node` để xử lý mỗi đỉnh khi nó được thăm. Đánh dấu đỉnh `u` là đã thăm, xử lý nó, sau đó đệ quy gọi DFS cho tất cả các hàng xóm `v` chưa được thăm của `u`.\n\nVí dụ Đơn giản (Kiểm tra liên thông):\nSử dụng template DFS để tìm tất cả các đỉnh có thể đến được từ một đỉnh bắt đầu. Hàm `process_node` chỉ đơn giản là thêm đỉnh vào danh sách các đỉnh có thể đến.\n\nVí dụ Phức tạp (Tìm chu trình trong đồ thị vô hướng):\nMột hàm `hasCycle_dfs_util` được định nghĩa. Ngoài việc theo dõi các đỉnh đã thăm, nó còn theo dõi đỉnh cha `parent` của đỉnh hiện tại trong cây DFS. Nếu DFS gặp một đỉnh `v` đã được thăm nhưng `v` không phải là cha của đỉnh hiện tại `u`, điều đó có nghĩa là đã tìm thấy một cạnh ngược (back edge), và do đó có một chu trình.\n',
            useCases: 'DFS được sử dụng rộng rãi trong nhiều bài toán đồ thị như: tìm các thành phần liên thông, kiểm tra tính liên thông mạnh, sắp xếp topo, phát hiện chu trình, giải mê cung, các bài toán duyệt cây (pre-order, in-order, post-order là các dạng của DFS).',
            complexity: 'Time: O(V + E) - trong đó V là số đỉnh và E là số cạnh, vì mỗi đỉnh và mỗi cạnh được thăm một lần. Space: O(V) - cho mảng `visited` và trong trường hợp xấu nhất (đồ thị dạng cây hoặc đường thẳng), stack đệ quy có thể sâu bằng V.'
        }
    },
    {
        id: '5', 
        title: 'Breadth-First Search (BFS) with Examples',
        filePath: '../public/data/code_files/bfs_examples.cpp', 
        language: 'cpp',
        description: 'Thực hiện thuật toán Tìm kiếm theo chiều rộng (BFS) trên đồ thị. Bao gồm một template cơ bản, ví dụ tìm đường đi ngắn nhất trong đồ thị không trọng số, và ví dụ kiểm tra tính hai phía của đồ thị.',
        tags: ['Algorithms', 'Graph Theory', 'BFS', 'Queue', 'Shortest Path', 'Bipartite Check'],
        perceivedComplexity: 6,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'BFS khám phá đồ thị theo từng lớp. Nó bắt đầu từ một đỉnh nguồn, thăm tất cả các hàng xóm của nó, sau đó thăm tất cả các hàng xóm chưa được thăm của các đỉnh đó, và cứ thế tiếp tục. BFS sử dụng một hàng đợi (queue) để theo dõi các đỉnh cần thăm. Một mảng `visited` (hoặc mảng `distance`/`color` trong các biến thể) được dùng để tránh thăm lại các đỉnh.\n\nTemplate BFS:\nMột hàm `bfs_template` nhận đỉnh bắt đầu, số đỉnh, danh sách kề, và một hàm `process_node` để xử lý mỗi đỉnh. Nó dùng hàng đợi để quản lý thứ tự thăm và mảng `visited`.\n\nVí dụ Đơn giản (Đường đi ngắn nhất không trọng số):\nHàm `bfs_shortest_path_unweighted` sử dụng BFS để tìm khoảng cách ngắn nhất từ đỉnh nguồn đến tất cả các đỉnh khác trong đồ thị không có trọng số. Khoảng cách được lưu trong mảng `dist`. BFS đảm bảo rằng khi một đỉnh được thăm, đường đi đến nó là ngắn nhất vì nó khám phá theo lớp.\n\nVí dụ Phức tạp (Kiểm tra đồ thị hai phía):\nHàm `isBipartite` sử dụng BFS để cố gắng tô màu đồ thị bằng hai màu. Nếu có thể tô màu các đỉnh sao cho không có hai đỉnh kề nhau nào có cùng màu, đồ thị là hai phía. BFS duyệt qua đồ thị, gán màu xen kẽ cho các đỉnh. Nếu gặp một cạnh nối hai đỉnh cùng màu, đồ thị không phải là hai phía.',
            useCases: 'Tìm đường đi ngắn nhất trong đồ thị không trọng số, duyệt web (web crawler), tìm các thành phần liên thông, kiểm tra tính hai phía của đồ thị, thuật toán của Cheney trong garbage collection, giải các câu đố tìm đường đi ngắn nhất.',
            complexity: 'Time: O(V + E) - V là số đỉnh, E là số cạnh, vì mỗi đỉnh và mỗi cạnh được thăm một lần. Space: O(V) - cho hàng đợi và mảng `visited`/`color`/`dist`.'
        }
    },
    {
        id: '6', 
        title: 'Sàng Eratosthenes (Sieve of Eratosthenes)',
        filePath: '../public/data/code_files/sieve_eratosthenes.cpp',
        language: 'cpp',
        description: 'Thuật toán Sàng Eratosthenes để tìm tất cả các số nguyên tố nhỏ hơn hoặc bằng một số nguyên `n` cho trước. Bao gồm ví dụ đếm số nguyên tố và sàng lưu trữ ước số nguyên tố nhỏ nhất (SPF) để phân tích thừa số nguyên tố nhanh.',
        tags: ['Algorithms', 'Math', 'Number Theory', 'Prime Numbers', 'Sieve'],
        perceivedComplexity: 4,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Sàng Eratosthenes hoạt động bằng cách loại bỏ dần các bội số của các số nguyên tố. Ban đầu, tất cả các số từ 2 đến `n` được coi là nguyên tố. Bắt đầu từ `p=2` (số nguyên tố đầu tiên), tất cả các bội số của `p` (2p, 3p, 4p,...) nhỏ hơn hoặc bằng `n` được đánh dấu là không phải nguyên tố. Sau đó, tìm số tiếp theo chưa được đánh dấu (đó sẽ là số nguyên tố tiếp theo, ví dụ `p=3`), và lặp lại quá trình đánh dấu bội số. Quá trình này tiếp tục cho đến khi `p*p > n`.\n\nVí dụ Đơn giản (Đếm số nguyên tố):\nSử dụng sàng cơ bản để tạo mảng boolean `is_prime`. Sau đó, duyệt qua mảng này để đếm số lượng `true` (số nguyên tố).\n\nVí dụ Phức tạp (Sàng SPF):\nBiến thể này của sàng không chỉ đánh dấu số nguyên tố mà còn lưu trữ ước số nguyên tố nhỏ nhất (Smallest Prime Factor - SPF) cho mỗi số từ 1 đến `n`. Tức là, `spf[i]` sẽ là ước số nguyên tố nhỏ nhất của `i`. Điều này rất hữu ích để phân tích một số `x` (trong khoảng `1` đến `n`) thành các thừa số nguyên tố một cách hiệu quả bằng cách liên tục chia `x` cho `spf[x]` cho đến khi `x` bằng 1.',
            useCases: 'Tìm số nguyên tố trong một khoảng nhất định, kiểm tra tính nguyên tố nhanh (sau khi sàng đã chạy), làm tiền xử lý cho các bài toán lý thuyết số yêu cầu phân tích thừa số nguyên tố thường xuyên.',
            complexity: 'Time: O(n log log n) cho sàng Eratosthenes cơ bản và sàng SPF. Space: O(n) để lưu trữ mảng `is_prime` hoặc `spf`.'
        }
    },
    {
        id: '7', 
        title: 'Dãy con tăng dài nhất (Longest Increasing Subsequence - LIS)',
        filePath: '../public/data/code_files/lis.cpp',
        language: 'cpp',
        description: 'Tìm độ dài của dãy con tăng dài nhất trong một mảng các số. Bao gồm hai cách tiếp cận: một giải pháp O(n log n) hiệu quả và một giải pháp quy hoạch động O(n^2) dễ hiểu hơn.',
        tags: ['Algorithms', 'Dynamic Programming', 'Binary Search', 'LIS'],
        perceivedComplexity: 4,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Một dãy con tăng là một dãy con mà các phần tử của nó được sắp xếp theo thứ tự tăng dần. Mục tiêu là tìm dãy con tăng có độ dài lớn nhất.\n\nCách tiếp cận O(n^2) (Quy hoạch động):\nSử dụng một mảng `dp` trong đó `dp[i]` lưu trữ độ dài của LIS kết thúc tại phần tử `nums[i]`. Để tính `dp[i]`, ta xét tất cả các phần tử `nums[j]` đứng trước `nums[i]` (với `j < i`). Nếu `nums[i] > nums[j]`, ta có thể mở rộng LIS kết thúc tại `nums[j]` bằng cách thêm `nums[i]` vào. Do đó, `dp[i] = max(dp[i], dp[j] + 1)`. Giá trị `dp[i]` ban đầu là 1 (dãy con chỉ chứa `nums[i]`). Kết quả cuối cùng là giá trị lớn nhất trong mảng `dp`.\n\nCách tiếp cận O(n log n) (Tối ưu với tìm kiếm nhị phân):\nSử dụng một mảng `tails` (hoặc `piles` trong một số giải thích). `tails[k]` lưu trữ phần tử cuối cùng nhỏ nhất của một dãy con tăng có độ dài `k+1`. Mảng `tails` này luôn được duy trì ở trạng thái sắp xếp tăng dần.\nKhi duyệt qua từng phần tử `num` trong mảng đầu vào:\n1. Nếu `num` lớn hơn tất cả các phần tử trong `tails` (tức là `num > tails.back()`), thì `num` có thể mở rộng LIS dài nhất hiện tại. Ta thêm `num` vào cuối `tails`.\n2. Nếu `num` không lớn hơn `tails.back()`, ta tìm vị trí `k` trong `tails` sao cho `tails[k]` là phần tử nhỏ nhất mà lớn hơn hoặc bằng `num` (sử dụng `lower_bound`). Ta thay thế `tails[k]` bằng `num`. Điều này có nghĩa là ta đã tìm thấy một dãy con tăng có cùng độ dài nhưng kết thúc bằng một phần tử nhỏ hơn (`num`), điều này tạo điều kiện tốt hơn để xây dựng LIS dài hơn sau này.\nĐộ dài của LIS chính là kích thước của mảng `tails` sau khi duyệt qua tất cả các phần tử.',
            useCases: 'Phân tích xu hướng dữ liệu (ví dụ: tìm chuỗi ngày tăng giá cổ phiếu dài nhất), các bài toán tối ưu hóa trong khoa học máy tính, tin sinh học (ví dụ: tìm sự tương đồng giữa các chuỗi DNA).',
            complexity: 'O(n log n) Approach: Time: O(n log n) - vòng lặp chính chạy `n` lần, mỗi lần có thể thực hiện `lower_bound` mất O(log n). Space: O(n) - cho mảng `tails`.'
        }
    },
    {
        id: '8', 
        title: 'Dãy con chung dài nhất (Longest Common Subsequence - LCS)',
        filePath: '../public/data/code_files/lcs.cpp',
        language: 'cpp',
        description: 'Tính độ dài của dãy con chung dài nhất giữa hai chuỗi (hoặc mảng). Bao gồm hàm tính độ dài và hàm tái tạo một trong các chuỗi LCS.',
        tags: ['Algorithms', 'Dynamic Programming', 'LCS', 'String Manipulation'],
        perceivedComplexity: 4,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Một dãy con chung của hai chuỗi là một dãy con có mặt trong cả hai chuỗi theo cùng thứ tự tương đối, nhưng không nhất thiết phải liên tục. LCS là dãy con chung có độ dài lớn nhất.\nThuật toán sử dụng quy hoạch động. Gọi `dp[i][j]` là độ dài của LCS giữa tiền tố `s1[0...i-1]` (độ dài `i`) của chuỗi thứ nhất và tiền tố `s2[0...j-1]` (độ dài `j`) của chuỗi thứ hai.\nCông thức truy hồi:\n1. Nếu `s1[i-1] == s2[j-1]` (ký tự cuối cùng của hai tiền tố giống nhau): `dp[i][j] = 1 + dp[i-1][j-1]`. Ký tự này thuộc LCS, nên ta cộng 1 vào LCS của các tiền tố ngắn hơn.\n2. Nếu `s1[i-1] != s2[j-1]` (ký tự cuối cùng khác nhau): `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`. Ký tự này không thể cùng lúc thuộc LCS, nên LCS sẽ là LCS của (`s1` bỏ ký tự cuối, `s2` giữ nguyên) hoặc (`s1` giữ nguyên, `s2` bỏ ký tự cuối).\nTrường hợp cơ sở: `dp[0][j] = 0` và `dp[i][0] = 0` vì LCS với một chuỗi rỗng là rỗng.\n\nĐể tái tạo chuỗi LCS, ta回溯 (trace back) từ `dp[m][n]` dựa trên cách bảng `dp` được xây dựng. Nếu `s1[i-1] == s2[j-1]`, ký tự đó là một phần của LCS. Nếu không, di chuyển theo hướng của giá trị lớn hơn trong `dp[i-1][j]` hoặc `dp[i][j-1]`.',
            useCases: 'So sánh sự tương đồng giữa các file (ví dụ: lệnh `diff` trong Unix), tin sinh học (so sánh chuỗi DNA, protein), kiểm soát phiên bản (ví dụ: Git, SVN để tìm sự khác biệt giữa các phiên bản file), kiểm tra đạo văn.',
            complexity: 'Time: O(m*n) - với `m` và `n` là độ dài của hai chuỗi, do cần điền vào bảng `dp` kích thước `(m+1)x(n+1)`. Space: O(m*n) - cho bảng `dp`. Có thể tối ưu không gian xuống O(min(m,n)) nếu chỉ cần tính độ dài LCS, nhưng để tái tạo chuỗi LCS thì thường cần O(m*n).'
        }
    },
    {
        id: '9', 
        title: 'Thuật toán Tham lam (Greedy Algorithms) với Ví dụ',
        filePath: '../public/data/code_files/greedy_examples.cpp',
        language: 'cpp',
        description: 'Minh họa khái niệm thuật toán tham lam. Bao gồm một template ý tưởng chung, ví dụ đơn giản về bài toán Sắp xếp hoạt động (Activity Selection), và ví dụ phức tạp hơn về xây dựng cây Huffman cho Mã hóa Huffman.',
        tags: ['Algorithms', 'Greedy', 'Optimization', 'Activity Selection', 'Huffman Coding', 'Priority Queue'],
        perceivedComplexity: 5,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Thuật toán tham lam đưa ra lựa chọn tối ưu cục bộ ở mỗi bước với hy vọng tìm được giải pháp tối ưu toàn cục. Điều này có nghĩa là tại mỗi bước, nó chọn phương án có vẻ tốt nhất tại thời điểm đó mà không xem xét các hậu quả trong tương lai.\n\nTemplate chung:\n1. Khởi tạo cấu trúc giải pháp.\n2. Lặp đi lặp lại: Thực hiện một "lựa chọn tham lam" dựa trên một tiêu chí nào đó (thường là sắp xếp đầu vào hoặc sử dụng hàng đợi ưu tiên).\n3. Kiểm tra xem lựa chọn có hợp lệ và có thể thêm vào giải pháp hiện tại không.\n4. Nếu hợp lệ, thêm vào giải pháp và cập nhật trạng thái bài toán.\n5. Trả về giải pháp.\nLưu ý: Thuật toán tham lam không phải lúc nào cũng cho ra giải pháp tối ưu toàn cục cho mọi bài toán. Tính đúng đắn của nó cần được chứng minh cho từng bài toán cụ thể.\n\nVí dụ Đơn giản (Sắp xếp hoạt động - Activity Selection):\nĐể chọn số lượng hoạt động không chồng chéo tối đa, chiến lược tham lam là: Sắp xếp các hoạt động theo thời gian kết thúc tăng dần. Chọn hoạt động đầu tiên (có thời gian kết thúc sớm nhất). Sau đó, duyệt qua các hoạt động còn lại và chọn hoạt động tiếp theo có thời gian bắt đầu sau hoặc bằng thời gian kết thúc của hoạt động đã chọn trước đó. Lựa chọn này (kết thúc sớm nhất) để lại nhiều thời gian nhất cho các hoạt động khác.\n\nVí dụ Phức tạp (Xây dựng cây Huffman - Huffman Coding):\nĐể tạo mã tiền tố tối ưu (không có mã nào là tiền tố của mã khác) nhằm nén dữ liệu, Huffman coding sử dụng chiến lược tham lam. Nó xây dựng một cây nhị phân (cây Huffman) từ dưới lên. Ban đầu, mỗi ký tự là một nút lá với trọng số là tần suất xuất hiện của nó. Ở mỗi bước, hai nút có tần suất nhỏ nhất được chọn và kết hợp thành một nút nội bộ mới có tần suất bằng tổng tần suất của hai nút con. Quá trình này được lặp lại cho đến khi chỉ còn một nút (nút gốc). Hàng đợi ưu tiên (min-heap) thường được sử dụng để chọn hiệu quả hai nút có tần suất nhỏ nhất.',
            useCases: 'Activity Selection: Lập lịch tài nguyên, quản lý thời gian.\nHuffman Coding: Nén dữ liệu không mất mát (ví dụ: trong các định dạng file như JPEG, MP3, ZIP).\nCác bài toán khác: Thuật toán Dijkstra (tìm đường đi ngắn nhất), thuật toán Prim/Kruskal (tìm cây khung nhỏ nhất), bài toán cái túi phân số (Fractional Knapsack).',
            complexity: 'Activity Selection: Time: O(n log n) - chủ yếu do bước sắp xếp, nếu đã sắp xếp thì O(n). Space: O(n) hoặc O(1) nếu sửa trực tiếp mảng đầu vào và không lưu trữ tất cả hoạt động.\nHuffman Coding (Xây dựng cây): Time: O(n log n) - với `n` là số ký tự. Xây dựng min-heap mất O(n), sau đó mỗi lần trích xuất và chèn vào heap (thực hiện `n-1` lần) mất O(log n). Space: O(n) - để lưu trữ cây và min-heap.'
        }
    },
    {
        id: '10', 
        title: 'Chia để trị (Divide and Conquer) với Ví dụ',
        filePath: '../public/data/code_files/divide_and_conquer_examples.cpp',
        language: 'cpp',
        description: 'Minh họa mô hình Chia để trị. Bao gồm một template ý tưởng chung, ví dụ đơn giản về Sắp xếp trộn (Merge Sort), và ví dụ phức tạp hơn về thuật toán Quick Select (tìm phần tử nhỏ thứ k).',
        tags: ['Algorithms', 'Divide and Conquer', 'Merge Sort', 'Quick Select', 'Recursion', 'Sorting', 'Selection'],
        perceivedComplexity: 5,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Chia để trị là một mô hình thiết kế thuật toán mạnh mẽ, bao gồm ba bước chính:\n1. Chia (Divide): Phân chia bài toán lớn thành các bài toán con nhỏ hơn, độc lập với nhau. Các bài toán con này thường có cùng dạng với bài toán gốc.\n2. Trị (Conquer): Giải các bài toán con một cách đệ quy. Nếu bài toán con đủ nhỏ (trường hợp cơ sở), giải trực tiếp.\n3. Kết hợp (Combine): Tổng hợp kết quả của các bài toán con để tạo thành giải pháp cho bài toán gốc.\n\nTemplate chung:\nàm `solveDivideAndConquer` kiểm tra trường hợp cơ sở. Nếu không, nó chia vấn đề, gọi đệ quy để giải các vấn đề con, sau đó kết hợp các kết quả.\n\nVí dụ Đơn giản (Merge Sort - Sắp xếp trộn):\n- Chia: Chia mảng cần sắp xếp thành hai nửa gần bằng nhau.\n- Trị: Sắp xếp hai nửa này một cách đệ quy bằng Merge Sort.\n- Kết hợp: Trộn (merge) hai nửa đã sắp xếp lại thành một mảng duy nhất đã sắp xếp. Bước trộn so sánh các phần tử từ hai nửa và đặt chúng vào đúng vị trí trong mảng kết quả.\n\nVí dụ Phức tạp (Quick Select - Tìm phần tử nhỏ thứ k):\nThuật toán này tìm phần tử nhỏ thứ k trong một mảng chưa được sắp xếp. Nó dựa trên ý tưởng của QuickSort.\n- Chia: Chọn một phần tử làm pivot và phân hoạch (partition) mảng thành hai phần: các phần tử nhỏ hơn hoặc bằng pivot và các phần tử lớn hơn pivot. Pivot sẽ nằm ở vị trí đúng của nó trong mảng đã sắp xếp.\n- Trị: Gọi `p` là chỉ số của pivot sau khi phân hoạch. \n    - Nếu `p == k`, pivot chính là phần tử cần tìm.\n    - Nếu `k < p`, phần tử nhỏ thứ `k` nằm trong phần bên trái của pivot. Đệ quy tìm kiếm trong phần bên trái.\n    - Nếu `k > p`, phần tử nhỏ thứ `k` nằm trong phần bên phải của pivot. Đệ quy tìm kiếm trong phần bên phải (điều chỉnh `k` cho phù hợp với mảng con mới).\n- Kết hợp: Bước kết hợp là ẩn, vì lời gọi đệ quy trực tiếp trả về kết quả, hoặc tìm thấy phần tử.',
            useCases: 'Merge Sort: Sắp xếp dữ liệu hiệu quả, ổn định (stable sort). Thường được dùng trong các thư viện chuẩn.\nQuick Select: Tìm phần tử trung vị (median), các phần tử phân vị (percentiles) một cách hiệu quả mà không cần sắp xếp toàn bộ mảng.\nCác bài toán khác: QuickSort, tìm cặp điểm gần nhất, nhân ma trận (Strassen), biến đổi Fourier nhanh (FFT).',
            complexity: 'Merge Sort: Time: O(n log n) - trong mọi trường hợp. Space: O(n) - do cần mảng tạm để trộn (hoặc O(log n) cho linked list in-place merge).\nQuick Select: Time: O(n) - trung bình, O(n^2) - trường hợp xấu nhất (nhưng có thể tránh bằng chọn pivot ngẫu nhiên hoặc median-of-medians). Space: O(log n) - trung bình cho call stack đệ quy (do tail recursion optimization có thể giảm), O(n) - trường hợp xấu nhất.'
        }
    },
    {
        id: '11', 
        title: 'Quy hoạch động (Dynamic Programming - DP) với Ví dụ',
        filePath: '../public/data/code_files/dynamic_programming_examples.cpp',
        language: 'cpp',
        description: 'Giới thiệu kỹ thuật Quy hoạch động (DP). Bao gồm template ý tưởng cho cả bottom-up (tabulation) và top-down (memoization), ví dụ đơn giản về bài toán Cái túi 0/1 (0/1 Knapsack), và ví dụ phức tạp hơn về bài toán Đổi tiền (Coin Change - tìm số đồng xu ít nhất).',
        tags: ['Algorithms', 'Dynamic Programming', 'DP', 'Optimization', 'Knapsack', 'Coin Change', 'Memoization', 'Tabulation'],
        perceivedComplexity: 6,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Quy hoạch động là một kỹ thuật tối ưu hóa bằng cách giải các bài toán con chồng chéo (overlapping subproblems) và lưu trữ kết quả của chúng để tránh tính toán lại. Nó dựa trên thuộc tính cấu trúc con tối ưu (optimal substructure), nghĩa là giải pháp tối ưu cho bài toán lớn có thể được xây dựng từ các giải pháp tối ưu của các bài toán con.\n\nCó hai cách tiếp cận chính:\n1. Bottom-Up (Tabulation - Lập bảng):\n   - Giải quyết các bài toán con nhỏ nhất trước, sau đó sử dụng kết quả của chúng để giải các bài toán con lớn hơn dần, cho đến khi giải được bài toán gốc.\n   - Thường được thực hiện bằng cách điền vào một bảng (mảng hoặc ma trận) theo một thứ tự cụ thể.\n   - Template: Xác định trạng thái DP, bảng DP, công thức truy hồi, thứ tự lặp.\n\n2. Top-Down (Memoization - Ghi nhớ):\n   - Giải bài toán gốc bằng cách chia nó thành các bài toán con. Nếu một bài toán con đã được giải trước đó (kết quả đã được lưu), sử dụng kết quả đó. Nếu chưa, giải bài toán con đó, lưu kết quả, và sau đó sử dụng nó.\n   - Thường được thực hiện bằng đệ quy với một bảng (memo) để lưu trữ kết quả.\n   - Template: Xác định hàm đệ quy với trạng thái làm tham số, trường hợp cơ sở, kiểm tra memo, tính toán (gọi đệ quy cho bài toán con), lưu vào memo.\n\nVí dụ Đơn giản (0/1 Knapsack):\n   - Trạng thái DP: `dp[i][w]` là giá trị tối đa có thể đạt được khi xem xét `i` vật phẩm đầu tiên với giới hạn trọng lượng `w`.\n   - Công thức: Khi xem xét vật phẩm thứ `i` (có trọng lượng `wt[i-1]` và giá trị `val[i-1]`):\n     - Nếu `wt[i-1] <= w`: `dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w])` (chọn hoặc không chọn vật phẩm `i`).\n     - Nếu `wt[i-1] > w`: `dp[i][w] = dp[i-1][w]` (không thể chọn vật phẩm `i`).\n\nVí dụ Phức tạp (Coin Change - Số đồng xu ít nhất):\n   - Trạng thái DP: `dp[i]` là số đồng xu ít nhất để tạo thành tổng `i`.\n   - Công thức: `dp[i] = min(dp[i], 1 + dp[i - coin_value])` với mọi `coin_value <= i`. Tức là, để tạo tổng `i`, ta thử dùng một đồng xu `coin_value`, và số xu còn lại là `1 +` số xu ít nhất để tạo tổng `i - coin_value`. Lấy min qua tất cả các loại xu có thể.',
            useCases: '0/1 Knapsack: Phân bổ tài nguyên, lựa chọn dự án với ngân sách hạn chế.\nCoin Change: Tối ưu hóa việc trả tiền thừa, các bài toán liên quan đến tổ hợp giá trị.\nNhiều bài toán tối ưu hóa khác: Dãy con chung dài nhất (LCS), Chỉnh sửa khoảng cách (Edit Distance), Sắp xếp chuỗi (Matrix Chain Multiplication), các bài toán trên đồ thị (ví dụ: đường đi ngắn nhất All-Pairs Floyd-Warshall).',
            complexity: '0/1 Knapsack: Time: O(N*W) - với N là số vật phẩm, W là sức chứa tối đa. Space: O(N*W) - có thể tối ưu thành O(W) nếu chỉ cần giá trị cuối cùng.\nCoin Change (Min Coins): Time: O(Amount * NumCoins) - với Amount là tổng tiền, NumCoins là số loại đồng xu. Space: O(Amount) - cho bảng dp.'
        }
    },
    {
        id: '12', 
        title: 'Xử lý Bit (Bit Handling / Bit Manipulation)',
        filePath: '../public/data/code_files/bit_handling_examples.cpp',
        language: 'cpp',
        description: 'Trình bày các kỹ thuật và thao tác cơ bản trên bit của số nguyên. Bao gồm các hàm lấy/đặt/xóa/đảo bit, đếm số bit 1, kiểm tra lũy thừa của 2. Ví dụ minh họa cách kiểm tra tính chẵn lẻ, tạo tất cả tập con, và tìm số duy nhất trong mảng.',
        tags: ['Algorithms', 'Bit Manipulation', 'Bitwise Operations', 'Optimization', 'Subsets'],
        perceivedComplexity: 5,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Xử lý bit liên quan đến việc thao tác trực tiếp trên các bit riêng lẻ của biểu diễn nhị phân của số. Các toán tử bitwise (AND `&`, OR `|`, XOR `^`, NOT `~`, Left Shift `<<`, Right Shift `>>`) là nền tảng.\n\nCác thao tác cơ bản:\n- `getKthBit(n, k)`: `(n >> k) & 1`. Dịch phải `n` đi `k` vị trí để bit thứ `k` về vị trí 0, sau đó AND với 1 để lấy giá trị bit đó.\n- `setKthBit(n, k)`: `n | (1 << k)`. Tạo một mặt nạ có bit thứ `k` là 1 (`1 << k`), sau đó OR với `n`.\n- `clearKthBit(n, k)`: `n & (~(1 << k))`. Tạo mặt nạ có bit thứ `k` là 0 và các bit khác là 1 (`~(1 << k)`), sau đó AND với `n`.\n- `toggleKthBit(n, k)`: `n ^ (1 << k)`. XOR với mặt nạ có bit thứ `k` là 1.\n- `countSetBits(n)` (Brian Kernighan): Lặp lại `n = n & (n - 1)` cho đến khi `n` bằng 0. Mỗi lần thao tác này xóa bit 1 ở vị trí thấp nhất.\n- `isPowerOfTwo(n)`: Một số là lũy thừa của 2 nếu `n > 0` và `(n & (n-1)) == 0` (biểu diễn nhị phân của nó chỉ có một bit 1).\n\nVí dụ Đơn giản (Kiểm tra Chẵn/Lẻ):\nSố lẻ có bit cuối cùng (LSB) là 1, số chẵn có LSB là 0. Kiểm tra bằng `(n & 1)`.\n\nVí dụ Phức tạp (Tạo tập con):\nCó `2^N` tập con của một tập `N` phần tử. Mỗi số nguyên từ `0` đến `2^N - 1` có thể đại diện cho một tập con. Nếu bit thứ `j` trong biểu diễn nhị phân của số `i` được bật, thì phần tử thứ `j` của tập hợp gốc có mặt trong tập con đó.\nVí dụ (Tìm số duy nhất):\nNếu mọi số xuất hiện hai lần ngoại trừ một số xuất hiện một lần, XOR tất cả các số lại với nhau sẽ cho ra số duy nhất. Điều này là do `X ^ X = 0` và `X ^ 0 = X`. Các cặp số giống nhau sẽ tự triệt tiêu khi XOR.',
            useCases: 'Tối ưu hóa hiệu suất (các phép toán bit thường nhanh hơn), làm việc với cờ (flags), nén dữ liệu, mã hóa, thuật toán đồ thị trên tập con (ví dụ: DP với bitmask), các bài toán lập trình thi đấu yêu cầu thao tác hiệu quả trên tập hợp nhỏ.',
            complexity: 'Hầu hết các thao tác bit cơ bản (get, set, clear, toggle, isPowerOfTwo, isOdd/Even) là O(1).\n`countSetBits` (Brian Kernighan): O(số bit 1 trong n), trường hợp xấu nhất là O(log n) hoặc O(số bit của kiểu dữ liệu).\n`generateAllSubsets(N)`: O(N * 2^N) vì có 2^N tập con và việc xây dựng mỗi tập con có thể mất đến O(N).\n`findUniqueNumber`: O(N) với N là số phần tử trong mảng, vì duyệt qua mảng một lần.'
        }
    },
    {
        id: '13', 
        title: 'Xử lý Tập con (Subset Handling) - Đệ quy',
        filePath: '../public/data/code_files/subset_handling_recursive.cpp',
        language: 'cpp',
        description: 'Minh họa cách tạo và xử lý các tập con của một tập hợp cho trước bằng phương pháp đệ quy (quay lui/backtracking). Bao gồm template chung, ví dụ in tất cả tập con, và ví dụ tìm tất cả tập con có tổng bằng một giá trị K cho trước.',
        tags: ['Algorithms', 'Recursion', 'Backtracking', 'Subsets', 'Combinatorics', 'Subset Sum'],
        perceivedComplexity: 6,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Phương pháp đệ quy (cụ thể là quay lui) để tạo tập con hoạt động bằng cách đưa ra quyết định cho mỗi phần tử trong tập hợp gốc: hoặc bao gồm nó trong tập con hiện tại, hoặc không bao gồm.\n\nTemplate chung (`generateSubsetsRecursive_template`):\n- Hàm đệ quy nhận vào tập hợp gốc, chỉ số của phần tử đang xét (`index`), tập con đang được xây dựng (`current_subset`), và một cấu trúc để lưu trữ tất cả các tập con (hoặc một hàm callback để xử lý từng tập con).\n- Trường hợp cơ sở: Khi `index` duyệt qua tất cả các phần tử của tập hợp gốc, `current_subset` là một tập con hoàn chỉnh. Lưu trữ hoặc xử lý nó.\n- Bước đệ quy: Đối với phần tử tại `original_set[index]`:\n    1. Quyết định "Bao gồm": Thêm `original_set[index]` vào `current_subset`. Gọi đệ quy cho phần tử tiếp theo (`index + 1`). Sau khi lời gọi đệ quy trở về (đã khám phá xong nhánh đó), loại bỏ `original_set[index]` khỏi `current_subset` (đây là bước quay lui - backtracking) để chuẩn bị cho quyết định tiếp theo.\n    2. Quyết định "Không bao gồm": Không thêm `original_set[index]` vào `current_subset`. Gọi đệ quy cho phần tử tiếp theo (`index + 1`).\n\nVí dụ Đơn giản (In tất cả tập con):\nTriển khai trực tiếp logic trên. Tại trường hợp cơ sở, tập con hiện tại được in ra (hoặc lưu lại).\n\nVí dụ Phức tạp (Tìm tập con có tổng K - Subset Sum Problem):\nBiến thể của logic trên. Ngoài `index` và `current_subset`, hàm đệ quy còn theo dõi `current_sum`.\n- Trong trường hợp cơ sở, nếu `current_sum == target_sum`, thì `current_subset` là một giải pháp.\n- Có thể thêm các điều kiện cắt tỉa (pruning): ví dụ, nếu `current_sum > target_sum` (và các số đều dương), thì không cần tiếp tục khám phá nhánh đó.\n- Quyết định "Bao gồm" chỉ được thực hiện nếu việc thêm phần tử không làm `current_sum` vượt quá `target_sum` (đối với số dương).',
            useCases: 'Liệt kê tất cả các tổ hợp có thể (ví dụ: các tính năng có thể chọn cho một sản phẩm), giải các bài toán tối ưu hóa hoặc tìm kiếm yêu cầu duyệt qua không gian các tập con (ví dụ: bài toán cái túi, subset sum), các bài toán trong lĩnh vực trí tuệ nhân tạo và học máy liên quan đến lựa chọn đặc trưng.',
            complexity: 'Time: O(2^N * N) - Có 2^N tập con. Đối với mỗi tập con, có thể mất O(N) để sao chép nó vào danh sách kết quả hoặc xử lý nó. Nếu chỉ xử lý (ví dụ, in) mà không sao chép sâu, có thể gần O(2^N) cho các thao tác cơ bản trên mỗi tập con. Chiều sâu của cây đệ quy là N.\nSpace: O(N) - Cho `current_subset` và cho call stack đệ quy trong trường hợp xấu nhất (chiều sâu N). Nếu lưu trữ tất cả 2^N tập con, không gian lưu trữ sẽ là O(2^N * N).'
        }
    },
    {
        id: '14', 
        title: 'Gặp ở giữa (Meet in the Middle)',
        filePath: '../public/data/code_files/meet_in_the_middle.cpp',
        language: 'cpp',
        description: 'Minh họa kỹ thuật Gặp ở giữa (Meet in the Middle) để giải quyết các bài toán (thường là liên quan đến tập con) có độ phức tạp hàm mũ. Kỹ thuật này chia bài toán thành hai nửa, giải từng nửa, sau đó kết hợp kết quả. Ví dụ cụ thể là đếm số tập con có tổng bằng K.',
        tags: ['Algorithms', 'Optimization', 'Meet in the Middle', 'Subsets', 'Subset Sum', 'Combinatorics'],
        perceivedComplexity: 8,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Meet in the Middle là một kỹ thuật tối ưu hóa thường được áp dụng cho các bài toán mà giải pháp duyệt toàn bộ (brute-force) có độ phức tạp dạng O(c^N) (ví dụ: O(2^N) cho các bài toán tập con), nhưng N không quá lớn (ví dụ, N <= 40-50) để O(c^(N/2)) là khả thi.\n\nÝ tưởng cơ bản:\n1. Chia (Divide): Chia tập hợp đầu vào (hoặc không gian tìm kiếm) thành hai nửa gần bằng nhau. Gọi là nửa trái và nửa phải.\n2. Tính toán độc lập (Conquer independently): Tạo tất cả các trạng thái/kết quả có thể có cho nửa trái (ví dụ: tất cả các tổng tập con có thể của nửa trái). Lưu chúng vào một danh sách `results_left`.\n3. Tương tự, tạo tất cả các trạng thái/kết quả có thể có cho nửa phải. Lưu vào `results_right`.\n4. Kết hợp (Combine/Meet): Duyệt qua một trong hai danh sách (ví dụ `results_left`). Đối với mỗi phần tử `res_L` trong `results_left`, tìm kiếm trong `results_right` một phần tử `res_R` sao cho `res_L` và `res_R` kết hợp lại tạo thành giải pháp cho bài toán gốc (ví dụ: `res_L + res_R == target_sum`).\n   - Để bước kết hợp hiệu quả, danh sách được tìm kiếm (ví dụ `results_right`) thường được sắp xếp để cho phép tìm kiếm nhị phân (O(log M)) hoặc được lưu trữ trong một hash map để tìm kiếm trung bình O(1). Hoặc cả hai danh sách được sắp xếp và sử dụng kỹ thuật hai con trỏ.\n\nVí dụ (Đếm tập con có tổng K):\n1. Chia mảng `nums` (kích thước N) thành hai nửa: `nums[0...N/2-1]` và `nums[N/2...N-1]`.\n2. Tạo tất cả các tổng tập con có thể có cho nửa đầu, lưu vào `sums1`. Kích thước `sums1` là O(2^(N/2)).\n3. Tạo tất cả các tổng tập con cho nửa sau, lưu vào `sums2`. Kích thước `sums2` là O(2^(N/2)).\n4. Sắp xếp `sums2`. Duyệt qua từng `s1` trong `sums1`. Đối với mỗi `s1`, tìm số lần xuất hiện của `K - s1` trong `sums2` (sử dụng `lower_bound` và `upper_bound` hoặc tìm kiếm nhị phân lặp lại). Cộng số lần này vào tổng số tập con.\n\nƯu điểm: Giảm độ phức tạp từ O(2^N) xuống khoảng O(2^(N/2) * log(2^(N/2))) hoặc O(2^(N/2) * (N/2)) nếu sắp xếp là chính, hoặc O(2^(N/2)) nếu dùng hash map và bỏ qua chi phí xây dựng map. Cụ thể hơn là O(2^(N/2) * (N/2)) cho việc tạo và sắp xếp, và O(2^(N/2) * log(2^(N/2))) cho bước kết hợp nếu tìm kiếm nhị phân, hoặc O(2^(N/2)) cho tìm kiếm nếu dùng map. Nhìn chung, nó là một cải tiến đáng kể so với O(2^N).',
            useCases: 'Bài toán tổng tập con (Subset Sum Problem) với N lớn hơn một chút (ví dụ 30-45).\nBài toán cái túi (Knapsack) với số lượng vật phẩm tương đối lớn.\nCác bài toán tìm kiếm tổ hợp mà không gian tìm kiếm có thể được chia đôi và kết quả từ hai nửa có thể được kết hợp một cách hiệu quả.\nTìm số cách để đạt được một giá trị mục tiêu bằng cách kết hợp các lựa chọn từ hai bộ độc lập.',
            complexity: 'Time: Khoảng O(2^(N/2) * (N/2)) hoặc O(2^(N/2) * log(2^(N/2))). Chi tiết hơn:\n   - Tạo các tổng con cho mỗi nửa: O(2^(N/2) * (N/2)) (vì có 2^(N/2) tổng và mỗi tổng có thể liên quan đến N/2 phép cộng trong quá trình tạo, hoặc đơn giản là O(2^(N/2)) để tạo).\n   - Sắp xếp một danh sách tổng: O(2^(N/2) * log(2^(N/2))) = O(2^(N/2) * N).\n   - Bước kết hợp: Nếu duyệt qua danh sách thứ nhất (kích thước O(2^(N/2))) và tìm kiếm nhị phân trong danh sách thứ hai: O(2^(N/2) * log(2^(N/2))) = O(2^(N/2) * N).\n   - Tổng thể thường bị chi phối bởi O(N * 2^(N/2)).\nSpace: O(2^(N/2)) - để lưu trữ các danh sách tổng.'
        }
    },
    {
        id: '15', 
        title: "Thuật toán Dijkstra (Dijkstra's Algorithm)",
        filePath: '../public/data/code_files/dijkstra.cpp',
        language: 'cpp',
        description: 'Tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác trong đồ thị có trọng số cạnh không âm. Sử dụng hàng đợi ưu tiên (priority queue) để tối ưu hóa việc chọn đỉnh tiếp theo.',
        tags: ['Algorithms', 'Graph Theory', 'Shortest Path', 'Dijkstra', 'Priority Queue', 'Weighted Graph'],
        perceivedComplexity: 7,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: "Thuật toán Dijkstra hoạt động bằng cách duy trì một tập hợp các đỉnh đã được tìm thấy đường đi ngắn nhất từ nguồn (ban đầu chỉ có đỉnh nguồn với khoảng cách 0). Ở mỗi bước, nó chọn đỉnh `u` chưa được xử lý mà có khoảng cách ước lượng ngắn nhất từ nguồn (được lưu trong mảng `dist`). Sau đó, nó \"nới lỏng\" (relax) tất cả các cạnh đi ra từ `u`: đối với mỗi hàng xóm `v` của `u`, nếu đường đi đến `v` qua `u` ngắn hơn đường đi hiện tại đã biết đến `v`, thì cập nhật khoảng cách đến `v`.\n\nCác bước chính:\n1. Khởi tạo: Đặt khoảng cách đến đỉnh nguồn là 0 và tất cả các đỉnh khác là vô cùng. Thêm `{0, source_node}` vào hàng đợi ưu tiên (min-priority queue).\n2. Lặp: Chừng nào hàng đợi ưu tiên không rỗng:\n   a. Lấy đỉnh `u` với khoảng cách `d` nhỏ nhất từ hàng đợi ưu tiên.\n   b. Nếu `d` lớn hơn khoảng cách đã ghi nhận trước đó cho `u` (nghĩa là đã tìm thấy đường đi ngắn hơn đến `u` rồi), bỏ qua.\n   c. Đối với mỗi đỉnh kề `v` của `u` với trọng số cạnh `w_uv`:\n      i. Nếu `dist[u] + w_uv < dist[v]`:\n         - Cập nhật `dist[v] = dist[u] + w_uv`.\n         - Thêm `{dist[v], v}` vào hàng đợi ưu tiên.\n3. Kết quả: Mảng `dist` chứa đường đi ngắn nhất từ đỉnh nguồn đến tất cả các đỉnh khác.\n\nThuật toán này là một thuật toán tham lam, vì ở mỗi bước nó chọn đỉnh có vẻ tốt nhất (khoảng cách ngắn nhất hiện tại). Hàng đợi ưu tiên giúp chọn đỉnh này một cách hiệu quả.",
            useCases: 'Định tuyến mạng (ví dụ: tìm đường đi ngắn nhất cho gói tin dữ liệu), hệ thống GPS (tìm đường đi nhanh nhất), lập lịch tác vụ, phân tích mạng xã hội (tìm đường đi ngắn nhất giữa người dùng), các bài toán tối ưu hóa đường đi trong logistics và vận tải.',
            complexity: "Time: O((V + E) log V) với hàng đợi ưu tiên dựa trên heap nhị phân, hoặc O(E + V log V) với Fibonacci heap (thường thì heap nhị phân được sử dụng trong thực tế). V là số đỉnh, E là số cạnh. Nếu dùng mảng để tìm min thay vì PQ (ít hiệu quả hơn): O(V^2).\nSpace: O(V + E) - để lưu trữ đồ thị (danh sách kề) và O(V) cho mảng khoảng cách và hàng đợi ưu tiên."
        }
    },
    {
        id: '16', 
        title: 'Cấu trúc dữ liệu Tập hợp rời rạc (Disjoint Set Union - DSU)',
        filePath: '../public/data/code_files/dsu.cpp',
        language: 'cpp',
        description: 'Triển khai cấu trúc dữ liệu Disjoint Set Union (còn gọi là Union-Find) với tối ưu hóa nén đường (path compression) và hợp theo kích thước (union by size/rank). Dùng để quản lý các tập hợp không giao nhau một cách hiệu quả.',
        tags: ['Data Structures', 'Algorithms', 'DSU', 'Union-Find', 'Graph Theory', 'Connectivity'],
        perceivedComplexity: 6,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'DSU quản lý một tập hợp các phần tử được chia thành nhiều tập con rời rạc. Nó hỗ trợ hai thao tác chính:\n1. `find(i)`: Xác định tập con mà phần tử `i` thuộc về. Thường trả về một "đại diện" hoặc "gốc" của tập con đó. Để tối ưu, kỹ thuật "nén đường" (path compression) được sử dụng: trong quá trình tìm gốc, tất cả các nút trên đường đi từ `i` đến gốc được nối trực tiếp vào gốc. Điều này làm phẳng cây, giúp các thao tác `find` sau này nhanh hơn.\n2. `unite(i, j)`: Hợp nhất hai tập con chứa phần tử `i` và `j` thành một tập con duy nhất. Để tối ưu, "hợp theo kích thước" (union by size) hoặc "hợp theo hạng" (union by rank) được sử dụng. Khi hợp nhất, cây nhỏ hơn (ít nút hơn hoặc chiều cao thấp hơn) được gắn vào gốc của cây lớn hơn. Điều này giúp giữ cho cây nông, làm cho thao tác `find` hiệu quả.\n\nCấu trúc dữ liệu thường bao gồm:\n- `parent`: Một mảng trong đó `parent[i]` lưu trữ cha của phần tử `i`. Nếu `parent[i] == i`, thì `i` là gốc (đại diện) của tập con của nó.\n- `set_size` (hoặc `rank`): Một mảng để hỗ trợ tối ưu hóa union by size/rank. `set_size[i]` lưu trữ kích thước của tập con nếu `i` là gốc.\n\nKhởi tạo: Ban đầu, mỗi phần tử là một tập con riêng biệt, tức là `parent[i] = i` và `set_size[i] = 1`.',
            useCases: 'Thuật toán Kruskal để tìm Cây bao trùm nhỏ nhất (Minimum Spanning Tree - MST).\nPhát hiện chu trình trong đồ thị vô hướng.\nCác bài toán liên quan đến thành phần liên thông trong đồ thị (ví dụ: đếm số thành phần liên thông, kiểm tra hai đỉnh có thuộc cùng thành phần liên thông không).\nMạng lưới (ví dụ: xác định xem hai máy tính có được kết nối trong mạng không).\nXử lý ảnh (ví dụ: phân vùng ảnh).',
            complexity: 'Với cả hai tối ưu hóa (path compression và union by size/rank), độ phức tạp khấu trừ (amortized complexity) cho mỗi thao tác `find` hoặc `unite` gần như là hằng số, cụ thể là O(α(N)), trong đó α(N) là hàm Ackermann ngược, một hàm tăng rất chậm (α(N) < 5 đối với tất cả các giá trị N thực tế). Vì vậy, M thao tác trên N phần tử có tổng độ phức tạp khoảng O(M α(N)).\nSpace: O(N) - để lưu trữ mảng `parent` và `set_size`/`rank`.'
        }
    },
    {
        id: '17', 
        title: 'Thuật toán Knuth-Morris-Pratt (KMP)',
        filePath: '../public/data/code_files/kmp.cpp',
        language: 'cpp',
        description: 'Thuật toán tìm kiếm chuỗi KMP hiệu quả để tìm tất cả các lần xuất hiện của một chuỗi "mẫu" (pattern) trong một chuỗi "văn bản" (text). Nó sử dụng một mảng tiền xử lý gọi là LPS (Longest Proper Prefix Suffix) để tránh so sánh lại các ký tự không cần thiết khi xảy ra không khớp.',
        tags: ['Algorithms', 'String Matching', 'KMP', 'Pattern Searching', 'LPS Array'],
        perceivedComplexity: 7,
        dateCreated: '2025-05-08',
        lastUpdated: '2025-05-08',
        explanation: {
            logic: 'Thuật toán KMP tối ưu hóa việc tìm kiếm chuỗi bằng cách tiền xử lý chuỗi mẫu (pattern) để tạo ra một mảng phụ trợ `lps` (Longest Proper Prefix which is also Suffix).\n\n1. Tiền xử lý Mẫu (Hàm `computeLPSArray`):\n   - Mảng `lps` có độ dài bằng mẫu. `lps[i]` lưu trữ độ dài của tiền tố riêng dài nhất của `pattern[0...i]` mà cũng đồng thời là hậu tố riêng của `pattern[0...i]`.\n   - (Tiền tố riêng là tiền tố không phải toàn bộ chuỗi; tương tự cho hậu tố riêng).\n   - Mảng này giúp xác định số ký tự có thể bỏ qua (không cần so sánh lại) trong văn bản khi có sự không khớp, bằng cách "trượt" mẫu một cách thông minh.\n   - Ví dụ: `pattern = "AAACAAAA"`. `lps` sẽ là `{0,1,2,0,1,2,3,3}`.\n     `lps[6] = 3` vì `pattern[0...6]` là `"AAACAAA"`. Tiền tố riêng dài nhất cũng là hậu tố riêng là `"AAA"` (độ dài 3).\n\n2. Tìm kiếm trong Văn bản (Hàm `kmpSearch`):\n   - Duyệt qua văn bản (`text`) bằng con trỏ `i` và mẫu (`pattern`) bằng con trỏ `j`.\n   - Nếu `text[i] == pattern[j]`: Tăng cả `i` và `j`.\n   - Nếu `j` đạt đến cuối mẫu (`j == m`): Tìm thấy một lần xuất hiện của mẫu tại `text[i-j]`. Để tiếp tục tìm kiếm, ta không reset `j` về 0 hoàn toàn, mà sử dụng `lps[j-1]` để biết mẫu nên được dịch chuyển bao nhiêu. `j = lps[j-1]`.\n   - Nếu `text[i] != pattern[j]` (không khớp):\n     - Nếu `j != 0`: Điều này có nghĩa là đã có một số ký tự khớp trước đó. Ta không cần quay lại `i`. Thay vào đó, ta "lùi" con trỏ `j` trong mẫu về `lps[j-1]`. Giá trị này cho biết độ dài của tiền tố tiếp theo trong mẫu mà chúng ta biết chắc chắn sẽ khớp với một phần của văn bản ngay trước vị trí `i` (do tính chất của mảng `lps`).\n     - Nếu `j == 0`: Không có ký tự nào của mẫu khớp tại vị trí này. Đơn giản tăng `i` trong văn bản lên để thử khớp mẫu từ đầu tại vị trí tiếp theo.\n\nƯu điểm chính của KMP là con trỏ `i` (cho văn bản) không bao giờ bị lùi lại, dẫn đến hiệu quả thời gian tuyến tính.',
            useCases: 'Tìm kiếm văn bản trong các trình soạn thảo, xử lý văn bản, tin sinh học (tìm kiếm chuỗi gen), phát hiện xâm nhập mạng (tìm kiếm các mẫu độc hại trong luồng dữ liệu), phân tích mã nguồn.',
            complexity: "Time: O(N + M) - trong đó N là độ dài của văn bản và M là độ dài của mẫu. Bước tiền xử lý (tạo mảng LPS) mất O(M). Bước tìm kiếm mất O(N).\nSpace: O(M) - để lưu trữ mảng LPS."
        }
    },  
];