import { Layout } from '@components/common'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid layout="normal">
        {products.map((product, i) => (
          <ProductCard
            //
            variant="simple"
            key={product.id}
            product={product}
          />
        ))}
      </Grid>

      <Hero
        headline="huesec"
        description="Ultra rare clothing designed on the Gold Coast, Australia."
      />
    </>
  )
}

Home.Layout = Layout
