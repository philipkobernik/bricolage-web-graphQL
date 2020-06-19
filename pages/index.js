import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroProject from '../components/hero-project'
import Intro from '../components/intro'
import Footer from '../components/footer'
import Layout from '../components/layout'
import { getAllProjectsForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'



export default function Index({ allProjects }) {
  return (
    <>
      <Layout>
        <Head>
          <title>bricolage</title>
        </Head>
        <Container>
          <Intro projects = {allProjects}/>
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
