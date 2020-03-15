import React from 'react';
import { Dialog, DialogProps } from "@mashreq-digital/ui";

interface MDialogProps extends DialogProps {};

const MDialog = (props: MDialogProps) => {

  // const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  return (
    <Dialog {...props} />
  )
}

export default MDialog;
