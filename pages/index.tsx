import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  // @ts-ignore
  () => import('components/App').then((module) => module.App),
  {
    ssr: false
  }
)

const AppNoSSR = () => <DynamicComponentWithNoSSR />

export default AppNoSSR
