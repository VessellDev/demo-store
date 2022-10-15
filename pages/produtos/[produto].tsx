import { GraphQLTypes } from '@vessell/sdk/lib/zeus'
import classnames from 'classnames'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart/cart'
import Logo from 'components/logo'
import Properties from 'components/productPage/properties'
import Slideshow from 'components/productPage/slideshow'
import { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSidePropsWithSDK } from 'props-with-sdk'
import { useEffect, useState } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import styles from './produto.module.css'

interface ProductProps {
  product: GraphQLTypes['Product']
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0
  const [category] = product.categories
  const [child, setChild] = useState<GraphQLTypes['Product']>()

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id="container" className={styles.wrapper}>
      <header
        data-scroll
        data-scroll-sticky
        data-scroll-target="#container"
        className={styles.header}
      >
        <div
          className={classnames(styles.container, {
            [styles.scrolling]: scrolling,
          })}
        >
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs
              crumbs={
                category
                  ? [
                      { href: `/${category.slug}`, label: category.name },
                      { href: product.slug, label: product.name },
                    ]
                  : [{ href: product.slug, label: product.name }]
              }
            />
          </div>
          <div className={styles.right}>
            <Cart />
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.left}>
          <Slideshow
            image={
              child ? child.mainImage?.asset.url : product.mainImage?.asset.url
            }
          />
        </div>
        <div className={styles.right}>
          <Properties
            {...product}
            onMatchChild={setChild}
            {...(child && {
              name: child.name,
              price: child.price,
            })}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = getServerSidePropsWithSDK<ProductProps>(
  (SDK) => async (context) => {
    const product = await SDK.product([
      {
        id: context.query.produto as string,
      },
      {
        id: true,
        slug: true,
        name: true,
        mainImage: {
          asset: {
            url: true,
          },
        },
        price: {
          minPrice: true,
        },
        shortDescription: true,
        categories: [
          {},
          {
            id: true,
            slug: true,
          },
        ],
        variantAttributes: [
          {},
          {
            id: true,
            productId: true,
            attributeId: true,
            attribute: {
              id: true,
              type: true,
              name: true,
            },
            variantOptions: [
              {},
              {
                id: true,
                isActive: true,
                optionId: true,
                option: {
                  '...on ProductAttributeOptionText': {
                    id: true,
                    name: true,
                  },
                  '...on ProductAttributeOptionColor': {
                    id: true,
                    name: true,
                    color: true,
                  },
                  '...on ProductAttributeOptionImage': {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            ],
          },
        ],
        children: [
          {},
          {
            id: true,
            name: true,
            price: {
              minPrice: true,
              maxPrice: true,
            },
            mainImage: {
              asset: {
                url: true,
              },
            },
            attributeValues: [
              {},
              {
                id: true,
                attributeId: true,
                optionId: true,
              },
            ],
          },
        ],
      },
    ])

    if (!product) {
      return { notFound: true }
    }

    return {
      props: {
        product,
      },
    }
  },
)

export default Product
