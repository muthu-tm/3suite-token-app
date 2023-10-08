import React from 'react'
import HomePage from '../../container/Home'
import Product from '../../container/Products/Product'
import Features from '../../container/Features'
import NewsletterSubscribe from '../../container/Newsletter/Subscribe'

export default function HomeScreen() {
  return (
    <div>
      <HomePage />
      <Product />
      <Features />
      <NewsletterSubscribe/>
    </div>
  )
}
