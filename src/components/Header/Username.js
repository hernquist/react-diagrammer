import React from 'react'
import { 
  UserNameLarge as Large,
  UserNameMedium as Medium,
  HideWrapper as Wrapper
} from 'styles';

const Username = ({ visible, userName }) => {
  if (!visible) return null;
  
  return (
    <Wrapper breakpoint={'800px'}>
      <Large>Welcome back, {userName}</Large>
      <Medium>{userName}</Medium>
    </Wrapper>
  )
}

export default Username;