import markdownStyles from './markdown-styles.module.css'
import ProjectTitle from '../components/project-title'
import Avatar from '../components/avatar'
import Date from '../components/date'

export default function ProjectBody({ title, coverImage, date, author, tags, content }) {

  return (
    <>
    <ProjectTitle>{title}</ProjectTitle>
    <div className="grid grid-cols-1 md:grid-cols-4">

      <div className="md:col-start-1 md:col-end-2 z-10 m-6">
        <div className="max-w-2xl mx-auto mb-40">
          <div className="hidden md:block md:mb-12">
            <Avatar name={author.name} picture={author.picture} />
          </div>

          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={date} />
            <br/>
            { tags.map(t => (<span className="text-orange">{t.name}<br/></span>))}
          </div>
        </div>
      </div>

    <div className="md:col-start-2 md:col-end-5 z-10 shadow-xl mb-40">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      </div>
    </div>
    </>
  )
}
