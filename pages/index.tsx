import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  // @ts-ignore
  () => import('pages/components/App').then((module) => module.App),
  {
    ssr: false
  }
)

export default () => <DynamicComponentWithNoSSR />
