<List subheader={<ListSubheader>Service</ListSubheader>}>
  <ListItem>
    <ListItemText primary="Startup notification" />
    <Switch scope="nodejs" id="notify" defaultState={true} />
  </ListItem>
  <ListItem>
    <ListItemText primary="Logging" />
    <Switch scope="nodejs" id="logging" defaultState={false} />
  </ListItem>
</List>

<Divider/>

<List subheader={<ListSubheader>Project</ListSubheader>}>
  <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/node/issues")}>
    <ListItemButton>
      <ListItemText primary="Report a issue" />
    </ListItemButton>
  </OnClick>
  <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/node")}>
    <ListItemButton>
      <ListItemText primary="Source code" />
    </ListItemButton>
  </OnClick>
</List>