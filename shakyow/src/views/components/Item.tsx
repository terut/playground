import React from 'react';

interface Props {
  msg: string,
}

export const Item: React.FC<Props> = (props: Props) => {
  return (
    <li>
      <p>{props.msg}</p>
    </li>
  )
}