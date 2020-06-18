export default function AuthorPicture({ name, picture }) {
  return (
    <div className="flex items-left">
      <img
        src={picture.url}
        className="w-full h-auto squared-full"
        alt={name}
      />
    </div>
  )
}
