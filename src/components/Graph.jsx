import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Tooltip } from './Tooltip'
import { useDataStore } from '../store/dataStore'
import jsonData from '../mocks/data.json'

export const Graph = ({ radiusCircle, radiusForce, fontSize }) => {
  const svgRef = useRef(null)
  const { data, setData, circles, setCircles, listTooltips, setListTooltips } = useDataStore()

  useEffect(() => {
    const divElement = svgRef.current.parentElement
    const width = divElement.clientWidth
    const height = divElement.clientHeight

    setData(d3.range(jsonData.length).map((dt, index) => ({
      ... jsonData[index],
      radius: jsonData[index].credits * 5 * radiusCircle,
      x: width / 2,
      y: height / 2,
    })))
  }, [])

  useEffect(() => {
    const divElement = svgRef.current.parentElement
    const width = divElement.clientWidth
    const height = divElement.clientHeight

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const handleMouseEnter = (e, svgData) => {
      const provisional = []
      provisional.push({ name: svgData.name, x: svgData.x, y: svgData.y, id: svgData.id })

      const filteredCicles = data.filter(o => o.cicle === svgData.cicle)
      circles
        .filter((svgData, i) => filteredCicles.includes(data[i]))
        .attr('fill', '#754E1A')

      const prerequisites = svgData.prerequisites ? svgData.prerequisites.map(prerequisite => prerequisite.id) : []
      const filteredPrerequisites = data.filter(o => prerequisites.includes(o.id))
      circles
        .filter((svgData, i) => filteredPrerequisites.includes(data[i]))
        .attr('fill', '#578E7E')

      const open = svgData.open ? svgData.open.map(open => open.id) : []
      const filteredOpen = data.filter(o => open.includes(o.id))
      circles
        .filter((svgData, i) => filteredOpen.includes(data[i]))
        .attr('fill', '#973131')

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
        .attr('fill', '#8D77AB')
        .attr('stroke', '#F9F6E6')
    }

    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', '#8D77AB')
      .attr('stroke', '#F9F6E6')
      .attr('stroke-width', 2)
      .on('mouseenter', handleMouseEnter)
      .on('mouseout', handleMouseOut)

    setCircles(circles)
  }, [data])

  useEffect(() => {
    // Obtain the size of the div that contains the svg
    const divElement = svgRef.current.parentElement
    const width = divElement.clientWidth - 30
    const height = divElement.clientHeight - 30

    const simulation = d3.forceSimulation(data)
      .force('radial', d3.forceRadial(130 * radiusForce, width / 2, height / 2).strength(2))
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
  }, [circles])

  return (
    <>
      <svg ref={svgRef}></svg>
      {
        listTooltips.length > 0 && listTooltips.map(({ name, x, y, id }, index) => (
          <Tooltip key={id} text={name} x={x} y={y} fontSize={fontSize} />
        ))
      }
    </>
  )
}
