import matter from 'gray-matter'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {GetStaticPaths, GetStaticProps} from 'next'
import {CodeBlock} from '../components/CodeBlock'
// import gfm from 'remark-gfm'

interface BlogProps {
  data: any
  content: any
}

const renderers = {
  code: CodeBlock,
}

const Blog = ({data, content}: BlogProps) => {
  const frontmatter = data

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.description}</h3>
      <div className="markdown-body">
        <ReactMarkdown
          // plugins={[gfm]}
          source={content}
          renderers={renderers}
          escapeHtml={false}
        />
      </div>
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async ({params}) => {
  const blog = params?.blog
  // const blog = 'blog-one'

  const content = await import(`../content/${blog}.md`)
  const data = matter(content.default)

  return {
    props: {
      data: data.data,
      content: data.content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs')

  // Get array of filenames in content dir
  const files: string[] = fs.readdirSync(`${process.cwd()}/src/content`, 'utf-8')

  console.log('FILES', files)

  // Filter filenames for only markdown files
  const blogNames = files.filter(filename => filename.endsWith('.md'))

  const paths = blogNames.map(blogFilename => ({
    params: {blog: blogFilename.replace('.md', '')},
  }))

  return {
    paths,
    fallback: false,
  }
}
