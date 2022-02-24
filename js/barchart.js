/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Add svg1 within #hard-coded-bar div and adding dimensions and formatting
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// define the max score 
let maxY1 = d3.max(data1, function(d) { return d.score; });

// line 1: scales the y-axis (or the scores), setting data values to pixel values, 
// line 2: domain sets the input values from data values, 
// line 3: range sets the output values to pixel values
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// line 1: scales the x-axis (or the letter grades), setting data values to pixel values,
// line 2: domain sets the input values from data values, 
// line 3: range sets the output values to pixel values, 
// line 4: padding adds a blank space between bars so they don't overlap
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// line 1: adds a generic svg to be able to add y-axis 
// line 2: defines the placement of y-axis in svg1 on y-axis
// line 3: calls the yScale1 to be applied to the y-axis in the svg1
// line 4: defines the font size of the y-axis
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// line 1: adds a generic svg to be able to add x-axis 
// line 2: defines the placement of x-axis in svg1 on x-axis
// line 3: calls the xScale1 to be applied to the x-axis in the svg1 
//       and defines the ticks on the x-axis 
//  line 4: defines the font size of the x-axis
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// line 1: selects the id #hard-coded-bar
// line 2: appends the div 
// line 3: style() sets the opacity of the tooltip to 0
// line 4: attr() sets the attribute "class" to tooltip
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// line 1: defines the function mouseover1 with its parameters
// line 2: sets what text should be included in the tooltip 
// line 3: third line sets the opacity of the tooltip to 1, so tooltip can be seen once moused over
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// line 1: defines the function mousemove1 with its parameters
// line 2: sets the tooltip position to the left based on values 
// line 3: sets the tooltip position to the top based on values and offset
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// line 1: defines the function mouseleave1 with its parameters
// line 2: sets opacity to 0 when mouse leaves visual 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// line 1: selects all divs with .bar
// line 2: sets data to data1
// line 3: makes place holder 
// line 4: appends rectangle for each placeholder
// line 5: add attribute class and make it bar
// line 6: setting x-position for rectangles
// line 7: setting y-position for rectangles
// line 8: defines height of rectangles
// line 9: defines width of rectangles
// line 10-12: linking eventlistener to event handler 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);








