//making var for the svg
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// loading the csv data and setting the charset for the footer
d3.text('data.csv').mimeType('text/plain;charset=iso88591').get(onload);
function onload(error, text) {

  // cutting unusable text from the data
  if (error) throw error;
  var header = text.indexOf('"Subjects_1";"Periods";"Citizenship";"Total nationality";"Afghan ";"Albanian ";"Azerbaijani ";"Ethiopian ";"Iranian ";"Ivorian ";"Nepalese ";"North Korean ";"Russian "') // MAKE HEADER VARIABLE WITH THE STRING I WANT TO CUT TO
  var end = text.indexOf('\n', header)

	text = text.slice(end).trim()
  text = text.replace(/number/g, '')
  text = text.replace(/;/g, ',')

  // parsing the data and saving it in a variable
  var data = d3.csvParseRows(text, map)
  var footer = data.indexOf('� Statistics Netherlands, Den Haag/Heerlen 31-1-2018');
  var remove = data.splice(footer);
  data.pop()

  // map function where I declare asylum to the second object from the data and the number string to numbers
  function map(d) {
      return {
          asylum: d[1],
          number: Number(d[3])
      }
  }

  // The following code is from Titus Wormer
  // It searches for the input and if its been selected, if so it must do the fuction onchange
  d3.select('input').on('change', onchange);

  // Calling the function
  function onchange() {

    // checking if sorterennumber has been clicked on, if no, it will get sorterenasylum
    var sort = this.checked ? sorterennumber : sorterenasylum;
    var x0 = x.domain(data.sort(sort).map(asylum)).copy();
    var transition = svg.transition();

    // Sorting the bars
    svg.selectAll('.bar').sort(sortBar);

    // Hier wordt een transitie toegevoegd, zodat de barren geleidelijk bewegen
    transition.selectAll('.bar')
        .delay(delay)
        .attr('x', barX0);

    // transitions
    transition.select('.axis--x')
        .call(d3.axisBottom(x))
        .selectAll('g')
        .delay(delay);

    // calculating how the bars must be sorted and how they must move
    function sortBar(a, b) {
        return x0(asylum(a)) - x0(asylum(b));
    }

    function barX0(d) {
        return x0(asylum(d));
    }

    function delay(d, i) {
        return i * 50;
    }
  }
  // ordering the number variable
  function sorterennumber(a, b) {
      return number(b) - number(a);
  }

  // ordering the asylum variable
  function sorterenasylum(a, b) {
      return d3.ascending(asylum(a), asylum(b));
  }

  // calling the number
  function number(d) {
      return d.number;
  }

  // calling the asylum
  function asylum(d) {
      return d.asylum;
  }

  // making the graph with the x and y as
  x.domain(data.map(function(d) { return d.asylum; }));
  y.domain([0, d3.max(data, function(d) { return d.number; })]);

  // placing everything on the graph
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "d"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  // placing de data on the graph
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.asylum); })
      .attr("y", function(d) { return y(d.number); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.number); })
      // simple tooltip when mouseover
      .on("mouseover", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .text(d.number);
        d3.select("#tooltip").classed("hidden", false);
       })
       .on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true);
       })
};

// Bronnen: ordering the bars - Titus Wormer (https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/sort)
// Bronnen: cleaning the code - Slides from the assignments
// Bronnen: main graph - Mike Bostock (https://bl.ocks.org/mbostock/3885304)
// Bronnen: Tooltip (https://bl.ocks.org/sarubenfeld/56dc691df199b4055d90e66b9d5fc0d2)
// Bronnen: dataset - CBS  (http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLEN&PA=81478ENG&D1=a&D2=0&D3=0&D4=0-2,4,11,16-17,26,28,31&D5=105,109,113,117,122,126,130,134,139,143,147&HD=160118-1449&LA=EN&HDR=G1,G2,G3&STB=T,G4)
