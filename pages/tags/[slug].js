import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllTagsWithSlug, getTags, getAllProjectsByTag } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import Intro from '../../components/intro'
import Loading from '../../components/loading'
import MoreStories from '../../components/more-stories'
import markdownToHtml from '../../lib/markdownToHtml'
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Tag({ tag, projects, preview}) {
  const router = useRouter()
  if (!router.isFallback && !tag?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ParallaxProvider>
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <Loading>loading…</Loading>
        ) : (
          <>
          <Intro />
            <article>
          <Head>
            <title>
              {tag.name} | bricolage
            </title>
          </Head>
          <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-start-1 md:col-end-2 z-10 my-6 mr-6">
            <div className="max-w-2xl mx-auto">
                <div className="hidden md:block">
                  <ProjectTitle>{tag.name}</ProjectTitle>
                </div>


                <div className="block md:hidden mb-6 text-blue">
                  <ProjectTitle>{tag.name}</ProjectTitle>
                </div>

              </div>
            </div>
          </div>
          </article>

          { projects.length > 0 && <MoreStories projects={projects} /> }
          </>
        )}
      </Container>
    </Layout>
    </ParallaxProvider>
  )
}

export async function getStaticProps({ params, preview }) {
  const data = await getTags(params.slug, preview)
  const tagProjects = await getAllProjectsByTag(data?.tag?.id)

  return {
    props: {
      tag: data?.tag,
      projects: tagProjects?.allProjects,
      preview: preview || null
    },
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTagsWithSlug()
  return {
    paths: allTags?.map(tag => `/tags/${tag.slug}`) || [],
    fallback: true,
  }
}
