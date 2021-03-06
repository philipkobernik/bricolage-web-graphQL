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
import { getallProjectsWithSlug, getProjectAndMoreProjects, getAllProjectsForHome } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Loading from '../../components/loading'
import Head from 'next/head'
import Intro from '../../components/intro'
import Footer from '../../components/footer'
import VideoPlayer from '../../components/video-player'

import { PRODUCTION_SITE_URL } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { ParallaxProvider } from 'react-scroll-parallax';



export default function Project({ project, moreProjects, preview }) {
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ParallaxProvider>
    <Layout preview={preview}>
      <Container>
        {/*<Header />*/}
        {router.isFallback ? (
          <Loading>loading…</Loading>
        ) : (
          <>
          <Intro showNodeNavi={false}/>
            <article>
              <Head>
                <title>
                  {project.title} | bricolage
                </title>
                <meta property="og:image" content={project.ogImage.url} />
                <meta property="og:title" content={project.title} />
                <meta property="og:description" content={project.excerpt} />
                <meta property="og:url" content={PRODUCTION_SITE_URL + router.asPath} />
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
                collaborators={project.collaborators}
                labs={project.labAffiliation}
                tags={project.tags}
                content={project.content}
                externalUrl={project.externalUrl}
                sourceCodeUrl={project.sourceCodeUrl}
                medium={project.medium}
              />
            </article>
            {project.videoLink.length > 0 && <VideoPlayer videoLink={project.videoLink}/>}
            {project.imageGallery.length > 0 && <ImageGallery images={project.imageGallery} />}
            {moreProjects.length > 0 && false && <MoreStories projects={moreProjects} />}
            <Footer/>
          </>
        )}
      </Container>
    </Layout>
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
      moreProjects: data?.moreProjects
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
