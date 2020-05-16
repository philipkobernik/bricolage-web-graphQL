import { getPreviewProjectBySlug } from '../../lib/api'

export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be know to this API route and the CMS
  if (
    req.query.secret !== process.env.NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const project = await getPreviewProjectBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!project) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched project
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/projects/${project.slug}` })
  res.end()
}
