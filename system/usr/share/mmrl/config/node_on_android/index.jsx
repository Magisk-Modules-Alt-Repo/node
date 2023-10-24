import React from "react";
import { Page } from "@mmrl/ui";
import { useNativeProperties } from "@mmrl/hooks";
import { BugReport } from "@mui/icons-material";
import { ListItem, ListItemIcon } from "@mui/material";

function NodeConfig() {
  const [notify, setNotify] = useNativeProperties("persist.nodejs.notify", true);
  const [logging, setLogging] = useNativeProperties("persist.nodejs.logging", false);
  const [desc, setDesc] = useNativeProperties("persist.nodejs.desc", true);

  return (
    <Page sx={{ p: 0 }}>
      <List subheader={<ListSubheader>Service</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Startup notification" />
          <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Logging" />
          <Switch checked={logging} onChange={(e) => setLogging(e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Description notice" secondary="Show a text in the description how many service scripts are in the selected folder" />
          <Switch checked={desc} onChange={(e) => setDesc(e.target.checked)} />
        </ListItem>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>

        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/Magisk-Modules-Alt-Repo/node/issues")}>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="Report a issue" />
          </ListItemButton>
        </ListItem>
      </List>
    </Page>
  );
}

export default NodeConfig;
