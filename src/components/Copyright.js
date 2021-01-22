import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

export const Copyright = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="body1" align="center">
        {"Powered by "}
        <Link href="http://linkedin.com/in/dang-vu-minh-3b4017196">
          {"Dang Vu"}
        </Link>
      </Typography>
    </Container>
  );
};
