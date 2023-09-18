import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";


function DebtChart() {
  useEffect(() => {
        // Data for the pie chart
        const data = [
          { label: "Category A", value: 30 },
          { label: "Category B", value: 45 },
          { label: "Category C", value: 25 },
      ];

      // Set up the dimensions and radius for the pie chart
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      // Create a color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Create a pie chart layout
      const pie = d3.pie().value((d) => d.value);

      // Select the container div
      const svg = d3
          .select("#pie-chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

      // Generate the pie chart
      const arcs = svg.selectAll("arc").data(pie(data)).enter();

      // Append paths for chart segments
      arcs
          .append("path")
          .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
          .attr("fill", (d) => color(d.data.label));



  }, [])
  const pieChartRef = useRef();
  return (
    <div ref={pieChartRef} id="pie-chart"></div>
  )
}

export default DebtChart

//ref={pieChartRef}

/*


  
  function createPieChart(data) {
    const container = pieChartRef.current;
    const width = container.clientWidth - 2 * 209;
    const height = container.clientHeight - 2 * 200;

    const svg = d3.select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const radius = Math.min(width, height) / 2;
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);
  
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
    const colors = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);
  
    svg.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => colors(d.data.label))
      .attr('stroke', 'black')
      .attr('transform', `translate(${container.clientWidth / 2}, ${container.clientHeight / 2})`);

  }
  useEffect(() => {
    const data = [
      { label: 'Category A', value: 30 },
      { label: 'Category B', value: 40 },
      { label: 'Category C', value: 20 },
    ];
  
    createPieChart(data);
  }, []);
  const pieChartRef = useRef();
  return(
    <div className="pie-container" id="container" ref={pieChartRef}></div>
  )

















export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}*/