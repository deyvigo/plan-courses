import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import './App.css'
import { Tooltip } from './components/Tooltip'
import jsonData from './data.json'

export const Graph = () => {
  const svgRef = useRef(null)
  const [listTooltips, setListTooltips] = useState([])

  useEffect(() => {
    // Obtain the size of the div that contains the svg
    const divElement = svgRef.current.parentElement
    const width = divElement.clientWidth - 30
    const height = divElement.clientHeight - 30

    const handleMouseEnter = (e, d) => {
      const provisional = []
      provisional.push({ name: d.name, x: d.x, y: d.y, id: d.id })

      const filteredCicles = data.filter(o => o.cicle === d.cicle)
      circles
        .filter((d, i) => filteredCicles.includes(data[i]))
        .attr('stroke', 'red')

      const prerequisites = d.prerequisites ? d.prerequisites.map(prerequisite => prerequisite.id) : []
      const filteredPrerequisites = data.filter(o => prerequisites.includes(o.id))
      circles
        .filter((d, i) => filteredPrerequisites.includes(data[i]))
        .attr('fill', 'green')

      const open = d.open ? d.open.map(open => open.id) : []
      const filteredOpen = data.filter(o => open.includes(o.id))
      circles
        .filter((d, i) => filteredOpen.includes(data[i]))
        .attr('fill', 'blue')

      // Add tooltip for open and prerequisites

      filteredPrerequisites.forEach((pr) => {
        provisional.push({ name: pr.name, x: pr.x, y: pr.y, id: pr.id })
      })
      filteredOpen.forEach((op) => {
        provisional.push({ name: op.name, x: op.x, y: op.y, id: op.id })
      })

      setListTooltips([...provisional])
    }

    const handleMouseOut = () => {
      setListTooltips([])

      circles
        .attr('fill', 'rgb(75, 74, 199)')
        .attr('stroke', 'white')
    }

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const data = d3.range(jsonData.length).map((dt, index) => ({
      ... jsonData[index],
      radius: jsonData[index].credits * 10,
      x: width / 2,
      y: height / 2,
    }))

    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', 'rgb(75, 74, 199)')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .on('mouseenter', handleMouseEnter)
      .on('mouseout', handleMouseOut)

    const simulation = d3.forceSimulation(data)
      .force('radial', d3.forceRadial(300, width / 2, height / 2).strength(2))
      .force('collide', d3.forceCollide().radius(d => d.radius + 2))
        .on('tick', () => {
          circles
            // .transition() // This function animates the graph from the left corner to the center
            // .duration(100)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.radius)
        })

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg ref={svgRef}></svg>
      {
        listTooltips.length > 0 && listTooltips.map(({ name, x, y, id }, index) => (
          <Tooltip key={id} text={name} x={x} y={y} />
        ))
      }
    </div>

  )
}
