import markdownStyles from './markdown-styles.module.css'
import ProjectTitle from '../components/project-title'
import Avatar from '../components/avatar'
import Date from '../components/date'
import Link from 'next/link'
import Collaborator from '../components/collaborator'
import Lab from '../components/lab'
import { Parallax } from 'react-scroll-parallax';



export default function ProjectBody({ title, coverImage, date, author, collaborators, lab, tags, content, externalurl }) {
  return (
    <>
    <ProjectTitle>{title}</ProjectTitle>
    <div className="grid grid-cols-1 md:grid-cols-4">


      <div className="md:col-start-1 md:col-end-2 z-10 m-6">
        <div className="max-w-2xl mx-auto mb-40">
          <div className="hidden md:block">
            <Avatar name={author.name} picture={author.picture} slug={author.slug}/>
            {collaborators != "" && <Collaborator collaborators = {collaborators}/>}
            {lab != "" && <Lab labs = {lab}/>}

          </div>

          <div className="block md:hidden">
            <Avatar name={author.name} picture={author.picture} slug={author.slug}/>
            {collaborators != "" && <Collaborator collaborators = {collaborators}/>}
            {lab != "" && <Lab labs = {lab}/>}
          </div>

          <div className="my-6 text-lg">
            { tags.map(t => (<Link as={`/tags/${t.slug}`} href="/tags/[slug]"><a className="text-orange hover:underline">{t.name}<br/></a></Link>))}
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
      <div className="m-6 text-purple text-md"> <a className="hover:underline" href={externalurl}> {externalurl} </a></div>
      </div>
    </div>
    </>
  )
}
