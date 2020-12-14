import Layout from '../components/Layout'
import Link from 'next/link'
import matter from 'gray-matter'
import React from 'react'
import {ClickableTile} from 'carbon-components-react'

interface IndexProps {
  data: string[]
  title: string
  description: string
}

const Index: React.FC<IndexProps> = ({title, description, data}) => {
  const blogData = data.map(blog => matter(blog))
  const blogFrontMatter = blogData.map(listItem => listItem.data)

  console.log('blogFrontMatter', blogFrontMatter)

  return (
    <Layout title={title} description={description}>
      <h1 className="title bg-red-200">My First Blogsss ✍ </h1>
      <ClickableTile>Testinggg</ClickableTile>
      <div>
        <ul>
          {blogFrontMatter.map((blog, i) => (
            <li key={i}>
              <Link href={`/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
              <p>{blog.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const siteData = await import(`../../siteconfig.json`)
  const fs = require('fs')

  // Get array of filenames in content dir
  const files: string[] = fs.readdirSync(`${process.cwd()}/src/content`, 'utf-8')

  // Filter filenames for only markdown files
  const blogFilenames = files.filter(filename => filename.endsWith('.md'))

  const data = blogFilenames.map(blogFilename => {
    const path = `${process.cwd()}/src/content/${blogFilename}`
    // get the content of the blog post
    const rawContent: string = fs.readFileSync(path, {
      encoding: 'utf-8',
    })

    return rawContent
  })

  return {
    props: {
      data: data,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  }
}
