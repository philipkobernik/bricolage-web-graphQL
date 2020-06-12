import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroProject from '../components/hero-project'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllProjectsForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'



export default function Index({ allProjects }) {
  const heroProject = allProjects[0]
  const moreProjects = allProjects.slice(1)
  console.log("allprojects", allProjects)
  return (
    <>
      <Layout>
        <Head>
          <title>bricolage</title>
        </Head>
        <Container>
          <Intro projects = {allProjects}/>
          {/* {heroProject && (
            <HeroProject
              title={heroProject.title}
              coverImage={heroProject.coverImage}
              date={heroProject.date}
              author={heroProject.author}
              slug={heroProject.slug}
              excerpt={heroProject.excerpt}
              hashtags={heroProject.hashtags}
            />
          )}
          {moreProjects.length > 0 && <MoreStories projects={moreProjects} />} */}
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


