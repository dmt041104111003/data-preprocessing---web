document.addEventListener("DOMContentLoaded", function() {
    // const opinionForm = document.getElementById("opinionForm");
    const subb = document.getElementById("sub");

    const opinionMessageInput = document.getElementById("opinionMessage");
    const resultParagraph = document.getElementById("resultText");
    // trực tiếp index
    subb.addEventListener("click", function(e) {
        e.preventDefault();
        const opinionMessage = opinionMessageInput.value.trim();
        if (opinionMessage !== "") {
            const label = predictLabelByKeywordCount(opinionMessage);
            resultParagraph.textContent = `Result: ${label}`;
            saveOpinionToHistory(opinionMessage, label);
            alert("Opinion sent successfully!");
        } else {
            alert("Please enter a message before sending.");
        }
    });
    // lấy ở opinion
    const opinionMessage = localStorage.getItem("opinionMessage");
    if (opinionMessage) {
        const resultParagraph = document.getElementById("resultText");
        const label = predictLabelByKeywordCount(opinionMessage);
        saveOpinionToHistory(opinionMessage, label);

        resultParagraph.textContent = `Result: ${label}`;
        localStorage.removeItem("opinionMessage");
    }
    // lưu trữ local
    function saveOpinionToHistory(message, label) {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        const currentTime = new Date().toLocaleString();
        history.push({ message, label, time: currentTime });
        localStorage.setItem("history", JSON.stringify(history));
    }

    function loadHistoryFromLocalStorage() {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        populateTable(history);
    }
    loadHistoryFromLocalStorage();

    function predictLabelByKeywordCount(opinion) {
        opinion = opinion.toLowerCase();
        const keywordLabels = {
            "Vấn đề khác": [],
            "Học tập và thi cử": ["học tập", "học kỳ", "bài tập", "giảng đường", "thi cử", "kỳ thi", "điểm số", "bảng điểm"],
            "Ký túc xá": ["ký túc xá", "phòng ở", "khu ký túc", "chỗ ở"],
            "Học phí, bảo hiểm y tế": ["học phí", "bảo hiểm y tế", "chi phí"],
            "Cơ sở vật chất và hạ tầng": ["cơ sở vật chất", "hạ tầng", "phòng học", "thiết bị"],
            "Chất lượng đào tạo": ["chất lượng đào tạo", "giáo viên", "chương trình học", "giảng dạy"],
            "Hoạt động ngoại khóa": ["hoạt động ngoại khóa", "câu lạc bộ", "hoạt động nghệ thuật", "đoàn thể"],
            "Nghiên cứu khoa học và hợp tác ứng dụng": ["nghiên cứu khoa học", "hợp tác ứng dụng", "dự án nghiên cứu", "NCKH"],
            "Thư viện": ["thư viện", "sách", "tài liệu", "mượn sách"],
            "An ninh": ["an ninh", "an toàn", "bảo vệ", "camera"],
            "Học bổng và chính sách hỗ trợ": ["học bổng", "chính sách hỗ trợ", "kinh tế", "miễn giảm"]
        };

        const keywordCounts = Object.entries(keywordLabels).reduce((acc, [label, keywords]) => {
            acc[label] = keywords.reduce((count, keyword) => {
                const regex = new RegExp(keyword, 'gi');
                const matches = opinion.match(regex);
                return count + (matches ? matches.length : 0);
            }, 0);
            return acc;
        }, {});

        const maxCount = Math.max(...Object.values(keywordCounts));
        let predictedLabel = Object.keys(keywordCounts).find(key => keywordCounts[key] === maxCount) || "Vấn đề khác";

        return predictedLabel;
    }


});