//  đếm số lần xuất hiện của các từ khóa của mỗi nhãn trong câu
function countKeywordOccurrences(sentence, keywordData) {
    const keywordCounts = {};
    keywordData.forEach(([label, keywords]) => {
        const labelCount = keywords.reduce((count, keyword) => {
            const regex = new RegExp(keyword, 'gi');
            const matches = sentence.match(regex);
            return count + (matches ? matches.length : 0);
        }, 0);
        if (labelCount > 0) {
            keywordCounts[label] = labelCount;
        }
    });
    return keywordCounts;
}

// Biểu đồ ban đầu
const initialData = [
    ['Vấn đề khác', 0],
    ['Học tập', 0],
    ['Thi cử', 0],
    ['Ký túc xá', 0],
    ['Học phí, bảo hiểm y tế', 0],
    ['Cơ sở vật chất và hạ tầng', 0],
    ['Chất lượng đào tạo', 0],
    ['Hoạt động ngoại khoá', 0],
    ['Nghiên cứu khoa học và hợp tác ứng dụng', 0],
    ['Thư viện', 0],
    ['An ninh', 0],
    ['Học bổng và chính sách hỗ trợ', 0]
];

// Vẽ biểu đồ ban đầu
const chart = Highcharts.chart('container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Pie chart on data preprocessing',
        align: 'left'
    },
    credits: {
        enabled: false
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        name: 'Label',
        data: initialData
    }]
});

const labelColors = {
    'Vấn đề khác': '#FF6347', // Màu đỏ đậm
    'Học tập': '#4169E1', // Màu xanh dương đậm
    'Thi cử': '#32CD32', // Màu xanh lá cây đậm
    'Ký túc xá': '#FFD700', // Màu vàng đậm
    'Học phí, bảo hiểm y tế': '#9932CC', // Màu tím đậm
    'Cơ sở vật chất và hạ tầng': '#FF8C00', // Màu cam đậm
    'Chất lượng đào tạo': '#FF69B4', // Màu hồng đậm
    'Hoạt động ngoại khoá': '#8B4513', // Màu nâu đậm
    'Nghiên cứu khoa học và hợp tác ứng dụng': '#A9A9A9', // Màu xám đậm
    'Thư viện': '#2F4F4F', // Màu xanh đậm
    'An ninh': '#F5F5F5', // Màu xám nhạt
    'Học bổng và chính sách hỗ trợ': '#FFDEAD' // Màu màu da nhạt
};


chart.series[0].points.forEach(point => {
    const label = point.name;
    if (labelColors[label]) {
        point.update({
            color: labelColors[label]
        }, false);
    }
});

chart.redraw();

document.getElementById('sub').addEventListener('click', function(e) {
    e.preventDefault();
    const opinionMessage = document.getElementById('opinionMessage').value.trim();
    const keywordData = [
        ['Vấn đề khác', ['a']],
        ['Học tập', ['học tập', 'học kỳ', 'bài tập', 'giảng đường']],
        ['Thi cử', ['thi cử', 'kỳ thi', 'điểm số', 'bảng điểm']],
        ['Ký túc xá', ['ký túc xá', 'phòng ở', 'khu ký túc', 'chỗ ở']],
        ['Học phí, bảo hiểm y tế', ['học phí', 'bảo hiểm y tế', 'chi phí']],
        ['Cơ sở vật chất và hạ tầng', ['cơ sở vật chất', 'hạ tầng', 'phòng học', 'thiết bị']],
        ['Chất lượng đào tạo', ['chất lượng đào tạo', 'giáo viên', 'chương trình học', 'giảng dạy']],
        ['Hoạt động ngoại khoá', ['hoạt động ngoại khoá', 'câu lạc bộ', 'hoạt động nghệ thuật', 'đoàn thể']],
        ['Nghiên cứu khoa học và hợp tác ứng dụng', ['nghiên cứu khoa học', 'hợp tác ứng dụng', 'dự án nghiên cứu', 'NCKH']],
        ['Thư viện', ['thư viện', 'sách', 'tài liệu', 'mượn sách']],
        ['An ninh', ['an ninh', 'an toàn', 'bảo vệ', 'camera']],
        ['Học bổng và chính sách hỗ trợ', ['học bổng', 'chính sách hỗ trợ', 'kinh tế', 'miễn giảm']]
    ];
    if (opinionMessage) {
        // Đếm số lần xuất hiện của các từ khóa của mỗi nhãn trong câu nhập
        const keywordCounts = countKeywordOccurrences(opinionMessage, keywordData);
        // Cập nhật dữ liệu cho biểu đồ với các nhãn có số lần xuất hiện khác 0
        const data = Object.entries(keywordCounts).map(([label, count]) => [label, count]);
        // saveOpinionToHistory(opinionMessage, 'Your opinion label here', data);

        chart.series[0].setData(data);
        const labelColors = {
            'Vấn đề khác': '#FF6347', // Màu đỏ đậm
            'Học tập': '#4169E1', // Màu xanh dương đậm
            'Thi cử': '#32CD32', // Màu xanh lá cây đậm
            'Ký túc xá': '#FFD700', // Màu vàng đậm
            'Học phí, bảo hiểm y tế': '#9932CC', // Màu tím đậm
            'Cơ sở vật chất và hạ tầng': '#FF8C00', // Màu cam đậm
            'Chất lượng đào tạo': '#FF69B4', // Màu hồng đậm
            'Hoạt động ngoại khoá': '#8B4513', // Màu nâu đậm
            'Nghiên cứu khoa học và hợp tác ứng dụng': '#A9A9A9', // Màu xám đậm
            'Thư viện': '#2F4F4F', // Màu xanh đậm
            'An ninh': '#F5F5F5', // Màu xám nhạt
            'Học bổng và chính sách hỗ trợ': '#FFDEAD' // Màu màu da nhạt
        };

        chart.series[0].points.forEach(point => {
            const label = point.name;
            if (labelColors[label]) {
                point.update({
                    color: labelColors[label]
                }, false);
            }
        });
        chart.redraw();
    } else {
        alert("Please enter a message before sending.");
    }

    // function saveOpinionToHistory(opinionMessage, opinionLabel, chartData) {
    //     // Save the opinion to localStorage and history
    //     const newOpinion = {
    //         message: opinionMessage,
    //         label: opinionLabel,
    //         chartData: chartData, // Include chart data
    //         time: new Date().toLocaleString() // Include timestamp
    //     };
    //     history.push(newOpinion);
    //     localStorage.setItem("history", JSON.stringify(history));
    // }
});