import React from 'react';
import { View } from "@go1d/go1d";

const PhoneTemplate: React.FC = ({ children }) => {
  return (
    <View
      width={400} 
      height="100%" 
      backgroundColor="contrast" 
      borderRadius={7} 
      border={3} 
      padding={4} 
      alignItems="center" 
      justifyContent="center"
    >
      <View width="100%" height="100%" backgroundColor="background" borderRadius={6} position="relative" alignItems="center" overflow="hidden">
        <View
          flexDirection="row-reverse"
          backgroundColor="contrast"
          paddingY={2}
          paddingX={5}
          width={140}
          height={20}
          css={{
            position: 'absolute',
            borderRadius: '0px 0px 20px 20px',
            zIndex: 10,
          }}
        >
          <View borderRadius={4} backgroundColor="background" width={6} height={6} />
          <View borderRadius={4} backgroundColor="background" width={35} height={6} marginRight={3} />
        </View>
        {children}
      </View>
    </View>
  )
}
export default PhoneTemplate;