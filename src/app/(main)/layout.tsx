// import { LayoutProps } from '@lib-types/layout'
import Header from './layout/header/header'
import { ReactNode } from 'react'


export default async function MainLayout({ children }: { children: ReactNode }) {

  return (
      <div className='grid min-h-dvh grid-rows-[1fr_auto]'>
        <div className='bg-background grid grid-rows-[auto_1fr]'>
          <Header />
          <div className='container mx-auto py-6'>{children}</div>
        </div>
      </div>
  )
}
