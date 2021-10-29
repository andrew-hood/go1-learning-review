import Head from 'next/head'
import Image from 'next/image'
import { View, Container, Heading, ButtonFilled } from '@go1d/go1d'
import PhoneTemplate from '../components/PhoneTemplate'
import MotionCarousel from '../components/MotionCarousel'
import { isBrowser } from 'react-device-detect'
import { useEffect, useState } from 'react'
import useAccessToken from '../hooks/useLogin'

export default function Home() {
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>();
  const { token, refreshToken } = useAccessToken();

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const Login = () => {
    return (
      <View width="100%" height="100%" justifyContent="center" alignItems="center">
        <ButtonFilled onClick={refreshToken}>Login</ButtonFilled>
      </View>
    )
  }

  return isBrowser ? (
    <View width="100%" height="100vh" alignItems="center" justifyContent="center" padding={[0, 8]} overflow="hidden">
      <Head>
        <title>Learning Review</title>
        <meta name="description" content="A fun experiment to see your go1 activity" />
      </Head>

      <View 
        width="100%" 
        height="100%" 
        backgroundColor="dangerHigh"
        padding={[0, 8]}
        css={{
          borderRadius: '20px'
        }}
      >
        <Container
          contain="normal"
          flexDirection={['column', 'column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          height="100%" 
        >
          <View alignItems="center" width={400} css={{ textAlign: 'center' }}>
            <Heading
              color="accent"
              semanticElement="h1"
              visualHeadingLevel="Heading 1"
              marginBottom={8}
            >
              Try it out on your phone
            </Heading>
            <View padding={4} borderRadius={4} backgroundColor="background">
              <Image src="/qr_code.png" width={200} height={200} unoptimized={true} loader={({src}) => src} />
            </View>
          </View>

          <PhoneTemplate>
            {!token ? <Login /> : <MotionCarousel width={400} /> }
          </PhoneTemplate>
        </Container>
      </View>
      
    </View>
  ) : dimensions ? (
    <View width={dimensions.width} height={dimensions.height} overflow="hidden">
      <View position="relative" width="100%" height="100%" overflow="hidden">
        {!token ? <Login /> : <MotionCarousel width={dimensions.width} /> }
      </View>
    </View>
  ) : null;
}
