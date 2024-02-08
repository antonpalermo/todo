"use client";

import { Fragment, useEffect, useState } from "react";

export default function ModalProvider() {
  const [mounted, isMounted] = useState<boolean>(false);

  useEffect(() => {
    isMounted(true)
  }, []);

  if (!mounted) {
    return null
  }

  return <Fragment>
    
  </Fragment>
}
