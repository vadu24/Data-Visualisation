function App(){

    const [yearData, setYearData] = React.useState([]);
React.useEffect(() => {
    async function fetchdata(){
        const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
        const data = await response.json();
        console.log(data);
        setYearData(data);
    }   
    fetchdata();
}, [dataType])


    return (<div><h1>Federal Reserve Economic Data</h1>
    <BarChart 
      data={yearData}
      height={500}
      widthOfBar={5}
      width={yearData.length * 5}
      dataType={dataType}
      />
      </div>
      );
}

function BarChart({data, height, width, widthOfBar, dataType}){
    React.useEffect(() => {
        createBarChart();

    }, [data]);
    const createBarChart = () =>{
        const yearData = data.map((year) => year[dataType]);
        const values = data.map(function (value) {
            return value.value;
        });

        const dataMax = d3.max(yearData);
        const yScale = d3.scaleLinear().domain([0, dataMax]).range([0, height]);
        d3.select("svg").selectAll("rect").data(yearData).enter().append("rect")
        d3.select("svg")
          .selectAll("rect")
          .data(yearData)
          .style("fill", (_d, i) => (i % 2 == 0 ? "9595ff" : "44ff44"))
          .attr("x", (_d, i) => i * widthOfBar)
          .attr("y", (d) => height - yScale(d + dataMax * 0.1))
          .attr("height", (d, _i) => yScale(d + dataMax * 0.1))
          .attr("width", widthOfBar)

    } 
    return (
        <>
        <svg width={width} height={height}></svg>
        </>
    );

}
ReactDOM.render(<App/>, document.getElementById('root'));