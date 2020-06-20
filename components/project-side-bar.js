
export default function ProjectSideBar({ title, children }) {
  if (children === undefined || children === null) {
    return null // don't render if undefined or null
  }

  if(typeof(children) === "string" && children.trim().length === 0) {
    return null // don't render if empty string (or just spaces)
  }

  return (
    <div className="text-lg my-6">
      <span className="font-mono font-bold text-yellow">{title}</span>
      <br/>
      { children }
    </div>
  )
}
