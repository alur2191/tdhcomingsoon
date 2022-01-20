// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
        <Html>
            <Head>
                <link  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet"
                />
                <meta name="description" content="TruckDriver.help предоставляем эффективный сервис по поиску работы, а также размещению вакансий на работу. "></meta>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
        )
    }
}

export default MyDocument