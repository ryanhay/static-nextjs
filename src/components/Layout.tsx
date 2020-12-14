import Head from 'next/head'
import React from 'react'

interface LayoutProps {
  title: string
  description: string
}

const Layout: React.FC<LayoutProps> = ({children, title, description}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}

export default Layout
