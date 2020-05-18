import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ProjectBody from '../../components/project-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import ProjectHeader from '../../components/project-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getallProjectsWithSlug, getProjectAndMoreProjects } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Project({ project, moreProjects, preview }) {
  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <ProjectTitle>Loading…</ProjectTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {project.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={project.ogImage.url} />
              </Head>
              <ProjectHeader
                title={project.title}
                coverImage={project.coverImage}
                date={project.date}
                author={project.author}
                tags={project.tags}
              />
              <ProjectBody content={project.content} />
            </article>
            <SectionSeparator />
            {moreProjects.length > 0 && <MoreStories projects={moreProjects} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview }) {
  const data = await getProjectAndMoreProjects(params.slug, preview)
  const content = await markdownToHtml(data?.project?.content || '')

  return {
    props: {
      preview: preview || null,
      project: {
        ...data?.project,
        content,
      },
      moreProjects: data?.moreProjects,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getallProjectsWithSlug()
  return {
    paths: allProjects?.map(project => `/projects/${project.slug}`) || [],
    fallback: true,
  }
}
