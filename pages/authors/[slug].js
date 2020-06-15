import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ProjectBody from '../../components/project-body'
import MoreStories from '../../components/more-stories'
import ImageGallery from '../../components/image-gallery'
import Header from '../../components/header'
import ProjectHeader from '../../components/project-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getallAuthorsWithSlug, getAuthors } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import Intro from '../../components/intro'
import VideoPlayer from '../../components/video-player'

import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { ParallaxProvider } from 'react-scroll-parallax';



export default function Project({ project, moreProjects, preview }) {

  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  console.log(project)

  return (
    <ParallaxProvider>
    <Layout preview={preview}>
      <Container>
        {/*<Header />*/}
        {router.isFallback ? (
          <ProjectTitle>loading…</ProjectTitle>
        ) : (
          <>
          <Intro />
            <article>
              <Head>
                <title>
                  yoooo
                </title>
              </Head>


            </article>
          </>
        )}
      </Container>
    </Layout>
    </ParallaxProvider>
  )
}

export async function getStaticProps({ params, preview }) {
  const data = await getAuthors(params.slug, preview)
  const content = await markdownToHtml(data?.author?.content || '')

  return {
    props: {
      preview: preview || null,
      author: {
        ...data?.author,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allAuthors = await getallAuthorsWithSlug()
  return {
    paths: allAuthors?.map(author => `/authors/${author.slug}`) || [],
    fallback: true,
  }
}
