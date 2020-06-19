
export default function Collaborator({ collaborators }) {

  function collaboratorsSpread(){
    return (collaborators)
  }

  return (
      <div className="text-lg my-6">
        <span className="font-mono font-bold text-yellow">collab.s</span>
        <br/>
        <div>{collaboratorsSpread()}</div>
      </div>
  )
}
