// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import date from "../assets/date.json";

// const Grafic = () => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null); // Adaugă o referință la instanța graficului

//   const chartData = date.map((item) => ({
//     label: item["Tipul de proprietate"],
//     total: item["Total"] || 0,
//     urban: item["Urban"] || 0,
//     rural: item["Rural"] || 0,
//   }));

//   const labels = chartData.map((item) => item.label);
//   const totalData = chartData.map((item) => item.total);
//   const urbanData = chartData.map((item) => item.urban);
//   const ruralData = chartData.map((item) => item.rural);

//   const chartConfig = {
//     type: "bar",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: "Total",
//           data: totalData,
//           backgroundColor: "rgba(75,192,192,0.4)",
//         },
//         {
//           label: "Urban",
//           data: urbanData,
//           backgroundColor: "rgba(255,99,132,0.4)",
//         },
//         {
//           label: "Rural",
//           data: ruralData,
//           backgroundColor: "rgba(54,162,235,0.4)",
//         },
//       ],
//     },
//   };

//   useEffect(() => {
//     // Distrugerea instanței graficului anterior, dacă există
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     // Crearea unei noi instanțe a graficului
//     if (chartRef.current) {
//       chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
//     }
//   }, []);

//   return (
//       <canvas className="mx-auto w-4/5 overflow-hidden" ref={chartRef} />
//   );
// };

// export default Grafic;

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import date from "../assets/date.json";

const Grafic = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const chartData = date.map((item) => ({
    label: item["Tipul de proprietate"],
    total: item["Total"] || 0,
    urban: item["Urban"] || 0,
    rural: item["Rural"] || 0,
  }));

  const labels = chartData.map((item) => item.label);
  const totalData = chartData.map((item) => item.total);
  const urbanData = chartData.map((item) => item.urban);
  const ruralData = chartData.map((item) => item.rural);

  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: totalData,
          backgroundColor: "rgba(75,192,192,0.4)",
        },
        {
          label: "Urban",
          data: urbanData,
          backgroundColor: "rgba(255,99,132,0.4)",
        },
        {
          label: "Rural",
          data: ruralData,
          backgroundColor: "rgba(54,162,235,0.4)",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true, // Ascunde legenda
        },
        labels: {
          render: "label",
          fontColor: "black",
          position: "center",
          fontStyle: "bold",
          fontSize: 12,
          textMargin: 4,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false, // Ascunde etichetele pe axa x
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            padding: 10,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
    }
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mt-10 text-lg">Graficul numărului de unități medicale din România</h1>
      <canvas className="mx-auto w-4/5 overflow-hidden" ref={chartRef} />;
    </>
  );
};

export default Grafic;
