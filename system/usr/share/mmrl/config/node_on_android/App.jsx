import React from "react";
import { Page, Toolbar } from "@mmrl/ui";
import { useConfig, useActivity, useStrings } from "@mmrl/hooks";
import { BugReport } from "@mui/icons-material";
import { List, Divider, ListItemText, Switch, ListItemButton, ListSubheader, ListItem, ListItemIcon } from "@mui/material";

function App() {
  const { context } = useActivity();
  const { strings } = useStrings();

  const [config, setConfig] = useConfig();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("title")}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page sx={{ p: 0 }} renderToolbar={renderToolbar}>
      <List subheader={<ListSubheader>{strings("service")}</ListSubheader>}>
        <ListItem>
          <ListItemText primary={strings("s_up_notify")} />
          <Switch checked={config.notify} onChange={(e) => setConfig("notify", e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary={strings("logging")} />
          <Switch checked={config.logging} onChange={(e) => setConfig("logging", e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary={strings("desc_notice")} secondary={strings("desc_notice_sub")} />
          <Switch checked={config.desc} onChange={(e) => setConfig("desc", e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary={strings("service_title")} secondary={strings("service_desc")} />
          <Switch checked={config.service} onChange={(e) => setConfig("service", e.target.checked)} />
        </ListItem>
      </List>

      <Divider />

      <List subheader={<ListSubheader>{strings("project")}</ListSubheader>}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/Magisk-Modules-Alt-Repo/node/issues")}>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary={strings("report_issue")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Page>
  );
}

export { App };
