import React from "react";
import { Page, Toolbar } from "@mmrl/ui";
import {
  useNativeProperties,
  useActivity,
  useStrings
} from "@mmrl/hooks";
import { StringsProvider } from "@mmrl/providers";
import { BugReport } from "@mui/icons-material";
import { ListItem, ListItemIcon } from "@mui/material";

const strs = {
  en: {
    title: "Configure Node.js",
    service: "Service",
    report_issue: "Report a issue",
    project: "Project",
    logging: "Logging",
    s_up_notify: "Start up notification",
    desc_notice: "Description notice",
    desc_notice_sub: "Shows a text in the module description and shows how many service scripts are running"
  },
  de: {
    report_issue: "Ein Problem melden",
    project: "Projekt",
    logging: "Protokollierung",
    s_up_notify: "Startbenachrichtigung",
    desc_notice: "Beschreibungshinweis",
    desc_notice_sub: "Zeigt einen Text in der Modulbeschreibung an und zeigt an, wie viele Service-Skripte ausgeführt werden"
  },
}

function NodeConfig() {
  const [notify, setNotify] = useNativeProperties("persist.nodejs.notify", true);
  const [logging, setLogging] = useNativeProperties("persist.nodejs.logging", false);
  const [desc, setDesc] = useNativeProperties("persist.nodejs.desc", true);

  const { context } = useActivity()
  const { strings } = useStrings()

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>
          {strings("title")}
        </Toolbar.Center>
      </Toolbar>
    )
  }

  return (
    <Page sx={{ p: 0 }} renderToolbar={renderToolbar}>
      <List subheader={<ListSubheader>{strings("service")}</ListSubheader>}>
        <ListItem>
          <ListItemText primary={strings("s_up_notify")} />
          <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary={strings("logging")} />
          <Switch checked={logging} onChange={(e) => setLogging(e.target.checked)} />
        </ListItem>
        <ListItem>
          <ListItemText primary={strings("desc_notice")} secondary={strings("desc_notice_sub")} />
          <Switch checked={desc} onChange={(e) => setDesc(e.target.checked)} />
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

const NodeConfigMain = () => {
  return (
    <StringsProvider data={strs}>
      <NodeConfig />
    </StringsProvider>
  )
}

export default NodeConfigMain;