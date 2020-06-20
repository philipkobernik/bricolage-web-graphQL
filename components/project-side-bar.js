import React from 'react'

export default function ProjectSideBar({ title, thing, children }) {
  let toTest
  if(thing !== undefined && thing !== null){
    toTest = thing // option to pass in a thing to test
  } else {
    toTest = children
  }

  if (toTest === undefined || toTest === null) {
    return null // don't render if undefined or null
  }

  if(typeof(toTest) === "string" && toTest.trim().length === 0) {
    return null // don't render if empty string (or just spaces)
  }

  if(React.Children.count(children) === 0) {
    return null // don't render if empty array (like empty list of labs)
  }

  return (
    <div className="text-lg my-6">
      <span className="font-mono font-bold text-yellow">{title}</span>
      <br/>
      { children }
    </div>
  )
}
