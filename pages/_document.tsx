import { Html, Head, Main, NextScript } from 'next/document'

 function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script>
  AOS.init();
</script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document;