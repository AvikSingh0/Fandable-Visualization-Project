
import { Bar } from "react-chartjs-2";
import React from "react";
const BarChart = ({ chartData }) => {
  // Collect labels and count occurrences for each label for each source
  const redditCounts = {};
  const youtubeCounts = {};
  const keywords = ["Affordable", "Childcare", "Housing", "Daycare", "Nutrition", "Health", "Struggle", "Labour", "Budget"];

  if (Array.isArray(chartData.tasks) && chartData.tasks.length > 0) {
    chartData.tasks.forEach((post) => {
      const sourceCounts = post.source === "reddit" ? redditCounts : youtubeCounts;
      const words = post.text.split(" ");
      words.forEach((word) => {
        const keywordIndex = keywords.findIndex(k => k.toLowerCase() === word.toLowerCase());
        if (keywordIndex >= 0) {
          const keyword = keywords[keywordIndex];
          if (!sourceCounts[keyword]) {
            sourceCounts[keyword] = 0;
          }
          sourceCounts[keyword]++;
        }
      });
    });
  }

  // Format data for chart
  const labels = keywords;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Reddit Posts",
        backgroundColor: 'rgba(0,0,255, 0.7)',
        data: labels.map((label) => redditCounts[label] || 0),
        stack: 'stack 0'
      },
      {
        label: "YouTube Posts",
        backgroundColor: 'rgba(255,0,0, 0.7)',
        data: labels.map((label) => youtubeCounts[label] || 0),
        stack: 'stack 0'
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Relevant Posts</h2>

      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
              text: "To display data here",
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                font: {
                  size: 20
                }
              }
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                font: { size: 18 }
              },
              aria: {
                label: "X-Axis, Keywords"
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              aria: {
                label: "Y-Axis, Number of Posts"
              }
            },
          },
        }
        }
        role="img"
        aria-label="Stacked bar graph showing the number of posts on topics relevant to Affordable Childcare from Reddit and YouTube"
        tabIndex = "0"
      />
    </div>
  );
};

export default BarChart;
