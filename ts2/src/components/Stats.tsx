import * as React from 'react'
import * as d3 from "d3";
import {getStats, IStat} from './GetStats'


function handleMouseOver(data: IStat, i: number) {
	let rect = d3.select(`[id="${i}"]`)

	rect.attr('fill', "red")

	let info = d3.select(`[id="info"]`)
	info
	.append('text')
	.text(function(d, i) { return data.Active });
}

function handleMouseOut(d: IStat, i: number) {
	d3.select(`[id="${i}"]`).attr('fill', "orange");
	let info = d3.select(`[id="info"]`).selectAll('text').remove()
}

async function generateCharts(svg: d3.Selection<d3.BaseType, any, d3.BaseType, any>, 
	dimensions: any, country: string)
{
	let data = await getStats(country)
	console.log('data', data)

	let title = d3.select(`[id="country"]`)
	title.append('text')
	.text(function(d, i) { return data[0].Country });

	const maxUnits = d3.max(data, data => data.Active)

	const y = d3.scaleLinear()
		.domain([0, dimensions.height])
		.range([dimensions.height, 0])
		
	const x = d3.scaleBand()
        .domain(data.map(d => d.Date))
        .range([0, dimensions.width])
		.padding(0.05)
		
	const xAxis = d3.axisBottom(x)
		.ticks(10)
		.tickFormat(d => `${d.slice(0, 10)}`)

	const yAxis = d3.axisLeft(y)
		.ticks(0)
	
	svg.attr('width', dimensions.width + dimensions.marginLeft + dimensions.marginRight)
		.attr('height', dimensions.height + dimensions.marginTop + dimensions.marginBottom)
		.append('g')
		.attr("transform", 
          "translate(" + dimensions.marginLeft + "," + dimensions.marginTop + ")");
	const xAxisGroup = svg
		.append('g')
		.attr(
			'transform',
			`translate(${dimensions.marginLeft}, ${
				dimensions.height
			})`
		)
		.call(xAxis)
		.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
		
	const yAxisGroup = svg
		.append('g')
		.attr('transform', `translate(${dimensions.marginLeft}, 0)`)
		.call(yAxis)
		.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

	const charts = svg
		.append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('id', (_, i) => `${i}`)
		.attr('value', d => d.Active)
		.on('mouseover', handleMouseOver)
		.on('mouseout', handleMouseOut)
		.attr('width', x.bandwidth)
		.attr('height', 0)
		.attr('fill', 'orange')
		.attr('x', d => x(d.Date)!)
		.attr('height', 0)
		.attr('y', dimensions.height)
		.transition()
		.duration(500)
		.delay((_, i) => i * 100)
        .attr('height', d => dimensions.height - y((d.Active)*dimensions.height/Math.sqrt(Math.pow(d.Active, 2)+Math.pow(dimensions.height, 2))))
		.attr('y', d => y((d.Active)*dimensions.height/Math.sqrt(Math.pow(d.Active, 2)+Math.pow(dimensions.height, 2))))
	}

interface PropsStats {
	country: string;
}

const Stats: React.FC<PropsStats> = (props: PropsStats) => {
	const dimensions = { width: 800, height: 500, marginLeft: 40, marginRight: 20, marginTop: 20, marginBottom: 70 }
	let svgRef: any = React.createRef<SVGAElement>()

	React.useEffect(() => {
		generateCharts(d3.select(svgRef.current), dimensions, props.country)
	})

	return (
		<div>
			<div id='country'/>
			<svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
			<div id='info' />
		</div>
		);
  }
  
  export default Stats;
  