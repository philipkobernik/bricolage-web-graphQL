import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import ProjectHeader from '../../components/project-header'
import Layout from '../../components/layout'
import { getAllTagsWithSlug, getTags, getAllProjectsByTag } from '../../lib/api'
import AuthorName from '../../components/author-name'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import Intro from '../../components/intro'
import Loading from '../../components/loading'
import Avatar from '../../components/avatar'
import AuthorPicture from '../../components/author-picture'
import MoreStories from '../../components/more-stories'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import markdownStyles from '../../components/markdown-styles.module.css'
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Tag({ tag, projects, preview}) {
  console.log(tag);
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
