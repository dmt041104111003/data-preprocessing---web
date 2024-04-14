document.addEventListener("DOMContentLoaded", function() {
    const opinionTableBody = document.querySelector("#dataTableBody");
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const overlay = document.getElementById("overlay");
    const detailTableContainer = document.getElementById("detailTableContainer");

    history.forEach((opinion, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${opinion.message}</td>
                <td>${opinion.label}</td>
                <td>${opinion.time}</td>                
                <td><a class="detail-opinion">Detail</a></td>
                <td><button class="delete-opinion"><i class="bi bi-trash"></i></button></td>
            </tr>
        `;
        opinionTableBody.insertAdjacentHTML("beforeend", row);
    });

    opinionTableBody.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-opinion")) {
            const row = e.target.closest("tr");
            const opinionMessage = row.querySelector("td:nth-child(2)").textContent;
            deleteOpinionFromTable(opinionMessage);
            row.remove();
        } else if (e.target.classList.contains("detail-opinion")) {
            const row = e.target.closest("tr");
            const opinionMessage = row.querySelector("td:nth-child(2)").textContent;
            const opinionLabel = row.querySelector("td:nth-child(3)").textContent;
            const opinionTime = row.querySelector("td:nth-child(4)").textContent;
            // const containerId = "container-" + opinionMessage.replace(/\s+/g, "-").toLowerCase();

            detailTableContainer.innerHTML = `
                <h2>Detail</h2>
                <p><strong>Opinion:</strong> ${opinionMessage}</p>
                <p><strong>Label:</strong> ${opinionLabel}</p>
                <p><strong>Time:</strong> ${opinionTime}</p>

            `;
            // <div id="${containerId}" class="highchart-container"></div> 

            // Hiển thị overlay và bảng chi tiết
            overlay.style.display = "block";
            detailTableContainer.style.display = "block";
            // overlay.addEventListener("click", function() {

            //     overlay.style.display = "none";
            //     detailTableContainer.style.display = "none";
            // });


            // vẽ biểu đồ
            // drawChart(containerId, opinionChartData);

        }
    });

    overlay.addEventListener("click", function() {

        overlay.style.display = "none";
        detailTableContainer.style.display = "none";
    });

    // function drawChart(containerId, chartData) {
    //     Highcharts.chart(containerId, {
    //         chart: {
    //             type: 'pie',
    //             options3d: {
    //                 enabled: true,
    //                 alpha: 45,
    //                 beta: 0
    //             }
    //         },
    //         title: {
    //             text: 'Chart Title',
    //             align: 'left'
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         accessibility: {
    //             point: {
    //                 valueSuffix: '%'
    //             }
    //         },
    //         tooltip: {
    //             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //         },
    //         plotOptions: {
    //             pie: {
    //                 allowPointSelect: true,
    //                 cursor: 'pointer',
    //                 depth: 35,
    //                 dataLabels: {
    //                     enabled: true,
    //                     format: '{point.name}'
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: 'Share',
    //             data: chartData
    //         }]
    //     });
    // }


    function deleteOpinionFromTable(opinionMessage) {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history = history.filter(opinion => opinion.message !== opinionMessage);
        localStorage.setItem("history", JSON.stringify(history));
    }

    function showMoreOpinions() {
        const rows = opinionTableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            row.style.display = "table-row";
        });
        document.getElementById("showMoreOpinionsBtn").style.display = "none";
        document.getElementById("showLessOpinionsBtn").style.display = "inline";
    }

    function showLessOpinions() {
        const rows = opinionTableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            if (index > 2) {
                row.style.display = "none";
            }
        });
        document.getElementById("showMoreOpinionsBtn").style.display = "inline";
        document.getElementById("showLessOpinionsBtn").style.display = "none";
    }

    document.getElementById("showMoreOpinionsBtn").addEventListener("click", showMoreOpinions);

    document.getElementById("showLessOpinionsBtn").addEventListener("click", showLessOpinions);

    showLessOpinions();


});