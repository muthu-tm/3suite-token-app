import React from 'react'
import HomePage from '../../container/Home'
import Product from '../../container/Products/Product'
import Features from '../../container/Features'
import NewsletterSubscribe from '../../container/Newsletter/Subscribe'
import dynamic from "next/dynamic";
const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);

import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
export default function HomeScreen() {

  return (
    <div>
      <ScrollContainer>
      <ScrollPage>
      <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))} style={{width:"100%"}}>
      <HomePage />
  
      </Animator>
      </ScrollPage>

      <Product />




      <Features />


  
  <NewsletterSubscribe/>
     
      </ScrollContainer>
    </div>
  )
}
