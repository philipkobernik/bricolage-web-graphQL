import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import ProjectHeader from '../../components/project-header'
import Layout from '../../components/layout'
import { getallAuthorsWithSlug, getAuthors, getAllProjectsByAuthor } from '../../lib/api'
import AuthorName from '../../components/author-name'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import Intro from '../../components/intro'
import Avatar from '../../components/avatar'
import AuthorPicture from '../../components/author-picture'
import MoreStories from '../../components/more-stories'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import markdownStyles from '../../components/markdown-styles.module.css'
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Author({ author, projects, preview}) {

  const router = useRouter()
  if (!router.isFallback && !author?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ParallaxProvider>
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <div>loading…</div>
        ) : (
          <>
          <Intro />
            <article>
          <Head>
            <title>
              {author.name} | bricolage
            </title>
          </Head>
          <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-start-1 md:col-end-2 z-10 my-6 mr-6">
            <div className="max-w-2xl mx-auto">
                <div className="hidden md:block">
                  <AuthorPicture name={author.name} picture={author.picture} />
                </div>


                <div className="block md:hidden mb-6 text-blue">
                  <Avatar name={author.name}  picture={author.picture} slug={author.slug}/>
                </div>

              </div>
          </div>

              <div className="md:col-start-2 md:col-end-5 z-10 shadow-xl py-6 mb-40">
                <div
                    className={markdownStyles['markdown']}
                    dangerouslySetInnerHTML={{ __html: author.artistStatement }}
                  />
                <div className="m-6 text-purple font-bold"> <a href={author.website}> {author.website} </a></div>
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
  const data = await getAuthors(params.slug, preview)
  const authorProjects = await getAllProjectsByAuthor(data?.author?.id)

  return {
    props: {
      author: data?.author,
      projects: authorProjects?.allProjects,
      preview: preview || null
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
