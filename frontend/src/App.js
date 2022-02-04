import React from "react";

import Avatar from "./core/UI/Avatar";
import Button from "./core/UI/Button";
import Card from "./core/UI/Card";
import CardActions from "./core/UI/CardActions";
import CardContent from "./core/UI/CardContent";
import CardHeader from "./core/UI/CardHeader";

const App = () => {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar>JT</Avatar>}
          title="Card Title goes Here"
          subtitle="Subtitle"
        />
        <CardContent>Content goes here....</CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            sx={{ [`margin-left`]: "auto" }}
          >
            Success
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default App;
