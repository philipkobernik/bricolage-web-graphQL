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
import { getallProjectsWithSlug, getProjectAndMoreProjects } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Loading from '../../components/loading'
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

  return (
    <ParallaxProvider>
    {router.isFallback ? (
      <Loading>loading…</Loading>
    ) : (
      <Layout
        preview={preview}
        ogImageUrl={project.coverImage?.responsiveImage}
        ogTitle={project.title}
        ogDescription={project.excerpt}
        ogPageUrl={router.pathname}
      >
        <Container>
          {/*<Header />*/}

            <>
            <Intro />
              <article>
                <Head>
                  <title>
                    {project.title} | bricolage
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

                <ProjectBody
                title={project.title}
                coverImage={project.coverImage}
                date={project.date}
                author={project.author}
                tags={project.tags}
                content={project.content}
                />
              </article>
              {project.videoLink.length > 0 && <VideoPlayer videoLink={project.videoLink}/>}
              {project.imageGallery.length > 0 && <ImageGallery images={project.imageGallery} />}
              {moreProjects.length > 0 && false && <MoreStories projects={moreProjects} />}
            </>

        </Container>
      </Layout>
    )}
    </ParallaxProvider>
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
