import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import ProjectHeader from '../../components/project-header'
import Layout from '../../components/layout'
import { getallAuthorsWithSlug, getAuthors } from '../../lib/api'
import ProjectTitle from '../../components/project-title'
import Head from 'next/head'
import Intro from '../../components/intro'


import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { ParallaxProvider } from 'react-scroll-parallax';



export default function Author({ author, preview }) {

  const router = useRouter()
  if (!router.isFallback && !author?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ParallaxProvider>
    <Layout preview={preview}>
      <Container>
        {/*<Header />*/}
        {router.isFallback ? (
          <div>loading…</div>
        ) : (
          <>
          <div>yo</div>
          </>
        )}
      </Container>
    </Layout>
    </ParallaxProvider>
  )
}

export async function getStaticProps({ params, preview }) {
  const data = await getAuthors(params.slug, preview)
  console.log("yo: " + data);
  {/*const content = await markdownToHtml(data?.author?.content || '')*/}
  return {
    props: {
      preview: preview || null,
      author: {
        ...data?.author,

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
