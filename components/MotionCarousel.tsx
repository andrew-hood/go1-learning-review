import React, { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Spinner, View } from '@go1d/go1d';
import clamp from 'lodash/clamp';
import { Introduction, Completed, InProgress, Assigned, Summary } from './slides';
import { useFetchData } from '../hooks/useFetchData';

const pages = [
  Introduction,
  Completed,
  InProgress,
  Assigned,
  Summary,
];

interface UserResponse {
  first_name: string;
  last_name: string;
  last_login: string;
}

interface EnrolmentResponse {
  hits: any[];
  total: number;
}

const MotionCarousel = ({ width }: { width: number}) => {
  const { data: user } = useFetchData<UserResponse>('/me');
  const { data } = useFetchData<EnrolmentResponse>('/enrollments?limit=50');
  const [summary, setSummary] = useState<any>();

  useEffect(() => {
    const completed = data?.hits?.filter(i => i.status === 'completed').length || 0;
    const inProgress = data?.hits?.filter(i => i.status === 'in-progress').length || 0;
    const assigned = data?.hits?.filter(i => i.status === 'assigned').length || 0;
    setSummary({ completed, inProgress, assigned });
  }, [data])

  const [ activeIndex, setActiveIndex ] = useState(0);
  const index = useRef(0);
  const [props, api] = useSprings(pages.length, i => ({
    x: i * width,
    scale: 1,
    display: 'block',
    borderRadius: '0px',
  }))
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    if (active && Math.abs(mx) > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)
      cancel()
      setActiveIndex(index.current);
    }
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * width + (active ? mx : 0);
      const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
      const borderRadius = active ? `${Math.abs(mx) / 4}px` : '0px';
      return { x, scale, display: 'block', borderRadius }
    })
  });

  return (
    <View
      width={width}
      height="100%"
      overflow="hidden"
      css={{
        '& > div': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
        },
        '& > div > div': {
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          width: '100%',
          height: '100%',
          willChange: 'transform',
          boxShadow: '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }
      }}
    >
      {props.map(({ x, display, scale, borderRadius }, i) => (
        <animated.div {...bind()} key={i} style={{ display, x }}>
          <animated.div style={{ scale, borderRadius }}>
            {pages[i]({ isActive: activeIndex === i, summary, user })}
          </animated.div>
        </animated.div>
      ))}
    </View>
  )
}
export default MotionCarousel;