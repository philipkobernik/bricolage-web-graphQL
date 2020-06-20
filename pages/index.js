import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroProject from '../components/hero-project'
import Intro from '../components/intro'
import Footer from '../components/footer'
import Layout from '../components/layout'
import { getAllProjectsForHome } from '../lib/api'
import Head from 'next/head'
import { HOME_OG_IMAGE_URL, OG_SITE_DESCRIPTION, PRODUCTION_SITE_URL, OG_SITE_TITLE } from '../lib/constants'

export default function Index({ allProjects }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{OG_SITE_TITLE}</title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta property="og:title" content={OG_SITE_TITLE} />
          <meta property="og:description" content={OG_SITE_DESCRIPTION} />
          <meta property="og:url" content={PRODUCTION_SITE_URL} />
        </Head>
        <Container>
          <Intro projects={allProjects} showNodeNavi={true}/>
          {allProjects.length > 0 && <MoreStories projects={allProjects} />}
          <Footer/>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview }) {
  const allProjects = await getAllProjectsForHome(preview)
  return {
    props: { allProjects },
  }
}
