import { Inbox } from "@mui/icons-material";
import { Box, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import React from "react";

const DescWidget = ({ title, titleSize = 18, desc, children }) => {
  return (
    <div>
      <Typography variant="subtitle1" fontSize={titleSize} fontWeight="500" gutterBottom>
        {title}
      </Typography>

      {desc?.map((item, index) => (
        <Typography key={index} variant="subtitle1" fontSize={13} fontWeight="normal" color="text.disabled">
          {item}
        </Typography>
      ))}

      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "outside",
          pl: 4,
          "& ::marker": { color: "text.disabled" },
        }}
      >
        {children?.map((item, index) => (
          <ListItem key={index} sx={{ display: "list-item", pl: "2px" }}>
            <Typography component={"span"} variant="subtitle1" fontSize={13} fontWeight="normal" color="text.disabled">
              {item.desc.map((e, i) => (
                <React.Fragment key={i}>
                  {item.underline > i ? <u>{e}</u> : e}
                  {i < item.desc.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DescWidget;
