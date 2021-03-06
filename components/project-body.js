import markdownStyles from './markdown-styles.module.css'
import ProjectTitle from '../components/project-title'
import Avatar from '../components/avatar'
import Date from '../components/date'
import Link from 'next/link'
import ProjectSideBar from '../components/project-side-bar'
import TagsList from '../components/tags-list'


export default function ProjectBody({
    title, coverImage, date, author,
    collaborators, labs, tags, content,
    externalUrl, sourceCodeUrl, medium
  }) {

  return (
    <>
      <ProjectTitle>{title}</ProjectTitle>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-start-1 md:col-end-2 z-10 my-6 mr-6">
          <div className="max-w-2xl mx-auto mb-10">
            <div className="block">
              <Avatar name={author.name} picture={author.picture} slug={author.slug}/>

              <ProjectSideBar title="collab.s">
                {collaborators}
              </ProjectSideBar>

              <ProjectSideBar title="lab.s">
                {
                  labs.map(lab => (
                    <>
                      {lab.name}
                      <br />
                    </>
                  ))
                }
              </ProjectSideBar>

              <ProjectSideBar title="media">
                {medium}
              </ProjectSideBar>

              <ProjectSideBar title="source" thing={sourceCodeUrl} >
                <a className="hover:underline" href={sourceCodeUrl} target="_blank">
                  Visit external repository
                </a>
              </ProjectSideBar>

              <ProjectSideBar title="link" thing={externalUrl} >
                <a className="hover:underline" href={externalUrl} target="_blank">
                  Visit external project
                </a>
              </ProjectSideBar>
            </div>

            <div className="my-6 text-lg">
              <TagsList tags={tags} />
            </div>
            <div className="my-6 text-lg">
              <Date dateString={date} />
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
