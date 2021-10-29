import { ButtonFilled, ButtonMinimal, Heading, SpotIcon, Text, View } from "@go1d/go1d";
import { useEffect, useRef } from "react";
import useAccessToken from "../../hooks/useLogin";

interface PageProp {
  isActive?: boolean;
  user?: any;
  portal?: any;
  summary?: {
    completed: number;
    inProgress: number;
    assigned: number;
  };
}

interface SlideProp {
  heading: string;
  content?: string;
  icon?: string;
  color: string;
  backgroundColor: string;
}

const Slide: React.FC<SlideProp> = ({ heading, content, icon, color, backgroundColor, children }) => {
  return (
    <View padding={6} justifyContent="center" alignItems="center" height="100%" backgroundColor={backgroundColor}>
      {icon && (
        <SpotIcon
          name={icon}
          size={10}
          color={color}
        />
      )}
      <Heading semanticElement="h3" visualHeadingLevel="Heading 3" marginTop={6} color={color} css={{ textAlign: 'center' }}>{heading}</Heading>
      {content && <Text marginTop={5} color={color} css={{ textAlign: 'center' }}>{content}</Text>}
      {children}
    </View>
  )
}

const Introduction = ({ user }: PageProp) => {
  return user && (
    <Slide
      heading={`Hey ${user?.first_name}! Let's check out your Go1 activity this week...`}
      content="Swipe to find out..."
      color="background"
      backgroundColor="noteMid"
    />
  )
}

const Completed = ({ isActive, summary }: PageProp) => {
  const canvasRef = useRef();
  const confetti = require('canvas-confetti');

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        var myConfetti = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: true
        });
        myConfetti({
          particleCount: 100,
          spread: 80,
        });
      }, 500);
    }
  }, [isActive])

  return (
    <Slide
      heading={`Awesome job, you completed ${summary?.completed} courses!`}
      icon="Award"
      color="dangerMid"
      backgroundColor="dangerHighest"
    >
      <canvas ref={canvasRef.current} />
    </Slide>
  )
}

const InProgress = ({ isActive, summary }: PageProp) => {
  return (
    <Slide
      heading={`Keep learning, you have ${summary?.inProgress} items in progress!`}
      icon="BusinessSkills"
      color="complementary"
      backgroundColor="accent"
    />
  )
}

const Assigned = ({ isActive, summary }: PageProp) => {
  return (
    <Slide
      heading={`There’s ${summary?.assigned} items assigned to you!`}
      icon="Event"
      color="successHighest"
      backgroundColor="successMid"
    />
  )
}

const Summary = ({ portal }: PageProp) => {
  const { resetToken } = useAccessToken();
  return (
    <Slide
      heading="Eyes on the climb!"
      content="Access your portal to continue your learning"
      color="accent"
      backgroundColor="background"
    >
      <View padding={5}>
        <ButtonFilled href={`https://${portal?.url}`} size="lg" color="accent">Let&apos;s go</ButtonFilled>
        <ButtonMinimal onClick={resetToken} marginTop={3}>Logout</ButtonMinimal>
      </View>
    </Slide>
  )
}

export { Introduction, Completed, InProgress, Assigned, Summary }